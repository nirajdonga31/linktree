'use client';

import { useState } from 'react';
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
import type { Link } from '@linktree/shared';

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
  link: Link;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isEditing: boolean;
  editValue: { title: string; url: string };
  onEditChange: (field: 'title' | 'url', value: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}) {
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
      <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-sm mb-3">
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
      className={`bg-white p-5 rounded-2xl border transition-all duration-200 mb-3 ${
        link.isActive ? 'border-gray-200 shadow-sm' : 'border-gray-100 opacity-60'
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          {...attributes}
          {...listeners}
          className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing p-1"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"/>
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">{link.title}</p>
          <p className="text-sm text-gray-500 truncate">{link.url}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
            {link.clickCount} clicks
          </span>
          <button
            onClick={onToggle}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              link.isActive ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                link.isActive ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
            title="Delete"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      
      // Update order property
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

  const handleToggle = async (link: Link) => {
    await updateLink(link.id, { isActive: !link.isActive });
  };

  const startEditing = (link: Link) => {
    setEditingId(link.id);
    setEditValue({ title: link.title, url: link.url });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    await updateLink(editingId, editValue);
    setEditingId(null);
    setEditValue({ title: '', url: '' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Links</h1>
          <p className="text-gray-500 mt-1">Manage and organize your links</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition shadow-sm hover:shadow-md"
        >
          + Add Link
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
          <h3 className="font-semibold text-lg mb-4">Add New Link</h3>
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

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading links...</p>
          </div>
        ) : links.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="text-5xl mb-4">🔗</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No links yet</h3>
            <p className="text-gray-500 mb-6">Add your first link to get started</p>
            <button
              onClick={() => setIsAdding(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition"
            >
              Add Your First Link
            </button>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
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
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
