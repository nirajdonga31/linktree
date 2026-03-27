'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, useAuthListener } from '@/hooks/use-auth';
import MobilePreview from '@/components/mobile-preview';
import { AdminProvider, useAdmin } from './admin-context';

// Global scrollbar styles for admin layout
const globalScrollbarStyles = `
  /* Thin scrollbar for webkit browsers */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.4);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.6);
  }
  /* Firefox scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.4) transparent;
  }
`;

interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
  badge?: string;
  children?: Omit<NavItem, 'children'>[];
  isExpandable?: boolean;
}

// Updated icons to match the screenshot
const mainNavItems: NavItem[] = [
  {
    id: 'my-linktree',
    label: 'My Linktree',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    isExpandable: true,
    children: [
      { id: 'links', label: 'Links', href: '/admin', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ) },
      { id: 'shop', label: 'Shop', href: '/admin/shop', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ) },
      { id: 'design', label: 'Design', href: '/admin/appearance', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ) },
    ],
  },
  {
    id: 'earn',
    label: 'Earn',
    badge: '$0.00',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    isExpandable: true,
    children: [
      { id: 'overview', label: 'Overview', href: '/admin/earn', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ) },
      { id: 'earnings', label: 'Earnings', href: '/admin/earnings', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) },
    ],
  },
  { 
    id: 'audience', 
    label: 'Audience', 
    href: '/admin/audience', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ) 
  },
  { 
    id: 'insights', 
    label: 'Insights', 
    href: '/admin/analytics', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ) 
  },
];

const toolsNavItems: NavItem[] = [
  { 
    id: 'social-planner', 
    label: 'Social planner', 
    href: '/admin/social-planner', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ) 
  },
  { 
    id: 'auto-reply', 
    label: 'Instagram auto-reply', 
    href: '/admin/auto-reply', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ) 
  },
  { 
    id: 'link-shortener', 
    label: 'Link shortener', 
    href: '/admin/link-shortener', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ) 
  },
  { 
    id: 'post-ideas', 
    label: 'Post ideas', 
    href: '/admin/post-ideas', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ) 
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const [expandedSections, setExpandedSections] = useState<string[]>(['my-linktree', 'earn']);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useAuthListener();

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const username = user?.displayName?.toLowerCase().replace(/\s+/g, '') || 'user';

  const renderNavItem = (item: NavItem, isChild = false) => {
    const isActive = item.href && pathname === item.href;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.includes(item.id);

    if (hasChildren) {
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleSection(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg mb-0.5 transition-all duration-200 ${
              isExpanded ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`transition-colors ${isExpanded ? 'text-gray-900' : 'text-gray-500'}`}>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{item.badge}</span>
              )}
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          {isExpanded && item.children && (
            <div className="ml-4 mt-1 space-y-0.5">
              {item.children.map((child) => renderNavItem(child, true))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        href={item.href || '#'}
        className={`flex items-center justify-between px-3 py-2 rounded-lg mb-0.5 transition-all duration-200 ${
          isActive
            ? 'bg-gray-200 text-gray-900 font-medium'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={`transition-colors ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{item.icon}</span>
          <span className="text-sm">{item.label}</span>
        </div>
        {item.badge && (
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{item.badge}</span>
        )}
      </Link>
    );
  };

  return (
    <AdminProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminProvider>
  );
}

function AdminLayoutInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const [expandedSections, setExpandedSections] = useState<string[]>(['my-linktree', 'earn']);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const { getActivePlaceholderLinks } = useAdmin();

  useAuthListener();

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const username = user?.displayName?.toLowerCase().replace(/\s+/g, '') || 'user';
  const activePlaceholderLinks = getActivePlaceholderLinks()
    .sort((a, b) => {
      // Starred links first
      if (a.isStarred === b.isStarred) return 0;
      return a.isStarred ? -1 : 1;
    })
    .map(l => ({ 
      id: l.id, 
      title: l.title, 
      url: l.url || '#', 
      isActive: l.isActive,
      isStarred: l.isStarred,
      clickCount: l.clickCount 
    }));

  const renderNavItem = (item: NavItem, isChild = false) => {
    const isActive = item.href && pathname === item.href;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.includes(item.id);

    if (hasChildren) {
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleSection(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg mb-0.5 transition-all duration-200 ${
              isExpanded ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`transition-colors ${isExpanded ? 'text-gray-900' : 'text-gray-500'}`}>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{item.badge}</span>
              )}
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          {isExpanded && item.children && (
            <div className="ml-4 mt-1 space-y-0.5">
              {item.children.map((child) => renderNavItem(child, true))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        href={item.href || '#'}
        className={`flex items-center justify-between px-3 py-2 rounded-lg mb-0.5 transition-all duration-200 ${
          isActive
            ? 'bg-gray-200 text-gray-900 font-medium'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={`transition-colors ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{item.icon}</span>
          <span className="text-sm">{item.label}</span>
        </div>
        {item.badge && (
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{item.badge}</span>
        )}
      </Link>
    );
  };

  return (
    <>
      <style>{globalScrollbarStyles}</style>
      <div className="min-h-screen flex bg-[#F5F5F5]">
      {/* Upgrade Banner */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-[#1a1a2e] flex items-center justify-center z-50">
        <div className="flex items-center gap-3">
          <span className="text-green-400 text-lg">⚡</span>
          <span className="text-white text-sm">Try Pro for free — our most popular plan for content creators and businesses.</span>
          <button className="px-4 py-1.5 bg-transparent border border-green-400 text-green-400 text-sm font-medium rounded-full hover:bg-green-400/10 transition">
            Upgrade
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-[280px] bg-[#F5F5F5] flex flex-col fixed h-full pt-14 border-r border-gray-200">
        {/* User Profile Header - Updated style */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1.5 -ml-2 transition-colors group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user?.displayName?.charAt(0) || 'U'}
              </div>
              <span className="font-medium text-sm text-gray-900">{username}</span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Notification Bell */}
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <div className="space-y-0.5">
            {mainNavItems.map((item) => renderNavItem(item))}
          </div>

          {/* Tools Section */}
          <div className="mt-6">
            <p className="text-xs font-medium text-gray-500 mb-2 px-3">Tools</p>
            <div className="space-y-0.5">
              {toolsNavItems.map((item) => renderNavItem(item))}
            </div>
          </div>
        </nav>

        {/* Setup Checklist Card */}
        <div className="p-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            {/* Circular Progress */}
            <div className="relative w-14 h-14 mb-4">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="#E5E7EB"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="#8B5CF6"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 24 * 0.33} ${2 * Math.PI * 24}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-purple-600">
                33%
              </span>
            </div>
            
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Your setup checklist</h3>
            <p className="text-xs text-gray-500 mb-4">2 of 6 complete</p>
            
            <button className="w-full py-2.5 bg-purple-600 text-white rounded-full text-sm font-semibold hover:bg-purple-700 transition shadow-sm hover:shadow-md">
              Finish setup
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-[280px] pt-14">
        <div className="flex justify-center">
          {/* Content Area - Centered */}
          <div className="w-full max-w-[680px] p-8">
            {children}
          </div>

          {/* Right Sidebar - Mobile Preview & Actions */}
          <div className="w-[400px] hidden xl:block flex-shrink-0">
            <div className="sticky top-24 min-h-[calc(100vh-120px)] flex flex-col pl-8">
              {/* Share URL Box */}
              <div className="w-full max-w-[320px] self-end mt-6 mb-4">
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-full">
                      <span className="text-sm text-gray-600">linktree/{username}</span>
                    </div>
                    <div className="flex items-center gap-2 relative">
                      <button 
                        onClick={async () => {
                          const url = `${window.location.origin}/${username}`;
                          try {
                            await navigator.clipboard.writeText(url);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          } catch (err) {
                            console.error('Failed to copy:', err);
                          }
                        }}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition relative"
                        title="Copy link"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {copied && (
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            Copied!
                          </span>
                        )}
                      </button>
                      <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition" title="Settings">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhance Button */}
              <div className="w-full max-w-[320px] self-end mb-6">
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-white px-4 py-2.5 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Enhance
                  </button>
                  <button className="flex items-center justify-center w-10 bg-white rounded-full shadow-sm text-gray-500 hover:bg-gray-50 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Mobile Preview - Right aligned */}
              <div className="flex-1 flex items-start justify-end pb-8 w-full">
                <div className="pr-4">
                  <MobilePreview links={activePlaceholderLinks} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  );
}
