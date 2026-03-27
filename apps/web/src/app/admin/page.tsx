'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAuth } from '@/hooks/use-auth';
import { useLinks } from '@/hooks/use-links';
import type { Link as LinkType } from '@linktree/shared';
import { useAdmin } from './admin-context';

// Sortable link item component
function SortableLinkItem({
  link,
  onToggle,
  onEdit,
  onDelete,
  isEditing,
  editValue,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
}: {
  link: LinkType;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isEditing: boolean;
  editValue: { title: string; url: string };
  onEditChange: (field: 'title' | 'url', value: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}) {
  const [activeButtons, setActiveButtons] = useState({
    thumbnail: false,
    animation: false,
    icon: false,
    lock: false,
    schedule: false,
    priority: false,
  });

  const toggleButton = (key: keyof typeof activeButtons) => {
    setActiveButtons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getButtonClass = (isActive: boolean) => 
    `p-2 rounded-lg transition ${
      isActive 
        ? 'text-purple-600 bg-purple-50' 
        : 'text-gray-400 hover:bg-gray-100'
    }`;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  if (isEditing) {
    return (
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-3">
        <div className="space-y-3">
          <input
            type="text"
            value={editValue.title}
            onChange={(e) => onEditChange('title', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Link title"
          />
          <input
            type="url"
            value={editValue.url}
            onChange={(e) => onEditChange('url', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="https://example.com"
          />
          <div className="flex gap-2">
            <button
              onClick={onSaveEdit}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
            >
              Save
            </button>
            <button
              onClick={onCancelEdit}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white p-4 rounded-2xl border transition-all duration-200 mb-3 group ${
        link.isActive ? 'border-gray-200' : 'border-gray-100 opacity-60'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing p-1 mt-0.5"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"/>
          </svg>
        </button>

        {/* Link Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{link.title}</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500 truncate mb-3">{link.url}</p>

          {/* Action Icons */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => toggleButton('thumbnail')}
              className={getButtonClass(activeButtons.thumbnail)} 
              title="Thumbnail"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button 
              onClick={() => toggleButton('animation')}
              className={getButtonClass(activeButtons.animation)} 
              title="Animation"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button 
              onClick={() => toggleButton('icon')}
              className={getButtonClass(activeButtons.icon)} 
              title="Icon"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </button>
            <button 
              onClick={() => toggleButton('lock')}
              className={getButtonClass(activeButtons.lock)} 
              title="Lock"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>
            <button 
              onClick={() => toggleButton('schedule')}
              className={getButtonClass(activeButtons.schedule)} 
              title="Schedule"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button 
              onClick={() => toggleButton('priority')}
              className={getButtonClass(activeButtons.priority)} 
              title="Priority"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
              </svg>
            </button>
            <span className="text-xs text-gray-400 ml-2 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {link.clickCount || 0} clicks
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex flex-col items-end gap-2">
          {/* Toggle Switch */}
          <button
            onClick={onToggle}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              link.isActive ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                link.isActive ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>

          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Placeholder link item for empty state
function PlaceholderLinkItem({ 
  title, 
  url,
  isActive, 
  isStarred,
  clickCount,
  onToggle,
  onUrlChange,
  onStar,
  onShare
}: { 
  title: string; 
  url: string;
  isActive: boolean;
  isStarred: boolean;
  clickCount: number;
  onToggle: () => void;
  onUrlChange: (url: string) => void;
  onStar: () => void;
  onShare: () => void;
}) {
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [editUrl, setEditUrl] = useState(url);
  const [showCopied, setShowCopied] = useState(false);
  
  // Active states for action buttons
  const [activeButtons, setActiveButtons] = useState({
    layout: false,
    link: false,
    image: false,
    lock: false,
    analytics: false,
  });

  const toggleButton = (key: keyof typeof activeButtons) => {
    setActiveButtons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveUrl = () => {
    onUrlChange(editUrl);
    setIsEditingUrl(false);
  };

  const handleCancelUrl = () => {
    setEditUrl(url);
    setIsEditingUrl(false);
  };

  const handleShare = () => {
    onShare();
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const getButtonClass = (isActive: boolean) => 
    `p-2 rounded-lg transition ${
      isActive 
        ? 'text-purple-600 bg-purple-50' 
        : 'text-gray-400 hover:bg-gray-100'
    }`;

  return (
    <div className={`bg-white rounded-2xl border p-4 mb-3 transition-all ${isActive ? 'border-gray-200' : 'border-gray-200 opacity-70'}`}>
      <div className="flex items-start gap-3">
        {/* Drag Handle - 6 dots */}
        <button className="text-gray-300 hover:text-gray-500 cursor-grab p-1 mt-1">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"/>
          </svg>
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title with edit icon */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>

          {/* URL input field */}
          {isEditingUrl ? (
            <div className="flex items-center gap-2 mb-3">
              <input
                type="url"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              <button 
                onClick={handleSaveUrl}
                className="text-green-600 hover:text-green-700 p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button 
                onClick={handleCancelUrl}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-400 truncate max-w-[200px]">
                {url || 'Add URL'}
              </span>
              <button 
                onClick={() => setIsEditingUrl(true)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          )}

          {/* Action Icons Row */}
          <div className="flex items-center gap-1">
            {/* Layout icon */}
            <button 
              onClick={() => toggleButton('layout')}
              className={getButtonClass(activeButtons.layout)} 
              title="Layout"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            {/* Link icon */}
            <button 
              onClick={() => toggleButton('link')}
              className={getButtonClass(activeButtons.link)} 
              title="Link"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
            {/* Image icon */}
            <button 
              onClick={() => toggleButton('image')}
              className={getButtonClass(activeButtons.image)} 
              title="Thumbnail"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            {/* Star icon */}
            <button 
              onClick={onStar}
              className={`p-2 rounded-lg transition ${isStarred ? 'text-purple-600 bg-purple-50' : 'text-gray-400 hover:bg-gray-100'}`}
              title={isStarred ? 'Unstar' : 'Star'}
            >
              <svg className="w-4 h-4" fill={isStarred ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
            {/* Lock icon */}
            <button 
              onClick={() => toggleButton('lock')}
              className={getButtonClass(activeButtons.lock)} 
              title="Lock"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>
            {/* Analytics icon */}
            <button 
              onClick={() => toggleButton('analytics')}
              className={getButtonClass(activeButtons.analytics)} 
              title="Analytics"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
            {/* Click count */}
            <span className="text-xs text-gray-400 ml-2">{clickCount} clicks</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex flex-col items-end justify-between h-full min-h-[80px]">
          {/* Share icon and Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button 
                onClick={handleShare}
                className={`p-2 rounded-lg transition ${
                  showCopied 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-400 hover:bg-gray-100'
                }`}
                title="Copy share link"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
              {/* Copied tooltip */}
              {showCopied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                  Copied!
                </span>
              )}
            </div>
            {/* Toggle Switch */}
            <button 
              onClick={onToggle}
              className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <div 
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-200 ${isActive ? 'left-[calc(100%-1.375rem)]' : 'left-0.5'}`} 
              />
            </button>
          </div>

          {/* Delete icon */}
          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user } = useAuth();
  const { links, loading, createLink, updateLink, deleteLink, reorderLinks } = useLinks(user?.uid);
  const { placeholderLinks, togglePlaceholderLink, updatePlaceholderLinkUrl, toggleStarLink, copyShareLink } = useAdmin();
  
  const [isAdding, setIsAdding] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState({ title: '', url: '' });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex((l) => l.id === active.id);
      const newIndex = links.findIndex((l) => l.id === over.id);
      const newLinks = arrayMove(links, oldIndex, newIndex);
      
      const reordered = newLinks.map((link, index) => ({
        ...link,
        order: index,
      }));
      
      reorderLinks(reordered);
    }
  };

  const handleAddLink = async () => {
    if (!newLink.title || !newLink.url) return;
    await createLink(newLink);
    setNewLink({ title: '', url: '' });
    setIsAdding(false);
  };

  const handleToggle = async (link: LinkType) => {
    await updateLink(link.id, { isActive: !link.isActive });
  };

  const startEditing = (link: LinkType) => {
    setEditingId(link.id);
    setEditValue({ title: link.title, url: link.url });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    await updateLink(editingId, editValue);
    setEditingId(null);
    setEditValue({ title: '', url: '' });
  };

  const username = user?.displayName?.toLowerCase().replace(/\s+/g, '') || 'user';

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Links</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Enhance
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0">
            {user?.displayName?.charAt(0) || 'U'}
          </div>
          
          {/* Info */}
          <div className="flex-1">
            <h2 className="font-bold text-lg text-gray-900">@{username}</h2>
            <button className="text-gray-400 text-sm hover:text-gray-600 transition">
              Add bio
            </button>
            
            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-3">
              <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                </svg>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.999 0C5.373 0 0 5.373 0 12c0 6.016 4.432 10.984 10.206 11.852V15.18H7.237v-3.154h2.969v-2.099c0-3.475 1.693-5 4.581-5 1.383 0 2.115.103 2.461.149v2.753h-1.97c-1.226 0-1.654 1.163-1.654 2.473v1.724h3.593l-.487 3.154h-3.106v8.696C19.481 23.083 24 18.075 24 12c0-6.627-5.373-12-12.001-12z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={() => setIsAdding(true)}
        className="w-full py-3.5 bg-purple-600 text-white rounded-full font-medium text-lg hover:bg-purple-700 transition shadow-sm hover:shadow-md mb-6 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add
      </button>

      {/* Add Link Form */}
      {isAdding && (
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Add New Link</h3>
          <input
            type="text"
            placeholder="Link title (e.g., My Portfolio)"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="url"
            placeholder="https://example.com"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex gap-3">
            <button
              onClick={handleAddLink}
              className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition"
            >
              Add Link
            </button>
            <button
              onClick={() => { setIsAdding(false); setNewLink({ title: '', url: '' }); }}
              className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add Collection / View Archive */}
      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          Add collection
        </button>
        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          View archive
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Links List */}
      <div className="space-y-1">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading links...</p>
          </div>
        ) : (
          <>
            {/* Default Example Links - shown when no links exist */}
            {links.length === 0 ? (
              <>
                {placeholderLinks
                  .sort((a, b) => {
                    // Sort only by star status, not by on/off toggle
                    if (a.isStarred === b.isStarred) return 0;
                    return a.isStarred ? -1 : 1;
                  })
                  .map((link) => (
                    <PlaceholderLinkItem 
                      key={link.id}
                      title={link.title}
                      url={link.url}
                      isActive={link.isActive}
                      isStarred={link.isStarred}
                      clickCount={link.clickCount}
                      onToggle={() => togglePlaceholderLink(link.id)}
                      onUrlChange={(url) => updatePlaceholderLinkUrl(link.id, url)}
                      onStar={() => toggleStarLink(link.id)}
                      onShare={() => copyShareLink(link.title)}
                    />
                  ))}
              </>
            ) : (
              <>
                {links.map((link) => (
                  <SortableLinkItem
                    key={link.id}
                    link={link}
                    onToggle={() => handleToggle(link)}
                    onEdit={() => startEditing(link)}
                    onDelete={() => deleteLink(link.id)}
                    isEditing={editingId === link.id}
                    editValue={editValue}
                    onEditChange={(field, value) => setEditValue((prev) => ({ ...prev, [field]: value }))}
                    onSaveEdit={saveEdit}
                    onCancelEdit={() => { setEditingId(null); setEditValue({ title: '', url: '' }); }}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
