'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, useAuthListener } from '@/hooks/use-auth';
import MobilePreview from '@/components/mobile-preview';

interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
  badge?: string;
  children?: Omit<NavItem, 'children'>[];
  isExpandable?: boolean;
}

const mainNavItems: NavItem[] = [
  {
    id: 'my-linktree',
    label: 'My Linktree',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    isExpandable: true,
    children: [
      { id: 'links', label: 'Links', href: '/admin', icon: <span>🔗</span> },
      { id: 'shop', label: 'Shop', href: '/admin/shop', icon: <span>🛒</span> },
      { id: 'design', label: 'Design', href: '/admin/appearance', icon: <span>🎨</span> },
    ],
  },
  {
    id: 'earn',
    label: 'Earn',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    isExpandable: true,
    children: [
      { id: 'overview', label: 'Overview', href: '/admin/earn', icon: <span>📊</span> },
      { id: 'earnings', label: 'Earnings', href: '/admin/earnings', badge: '$0.00', icon: <span>💰</span> },
    ],
  },
  { id: 'audience', label: 'Audience', href: '/admin/audience', icon: <span>👥</span> },
  { id: 'insights', label: 'Insights', href: '/admin/analytics', icon: <span>📈</span> },
];

const toolsNavItems: NavItem[] = [
  { id: 'social-planner', label: 'Social planner', href: '/admin/social-planner', icon: <span>📅</span> },
  { id: 'auto-reply', label: 'Instagram auto-reply', href: '/admin/auto-reply', icon: <span>💬</span> },
  { id: 'link-shortener', label: 'Link shortener', href: '/admin/link-shortener', icon: <span>🔗</span> },
  { id: 'post-ideas', label: 'Post ideas', href: '/admin/post-ideas', icon: <span>💡</span> },
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
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg mb-0.5 transition-colors ${
              isChild ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-900 hover:bg-gray-100 font-medium'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={isChild ? '' : 'text-gray-500'}>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isExpanded && item.children && (
            <div className="ml-4 mt-1">
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
        className={`flex items-center justify-between px-3 py-2 rounded-lg mb-0.5 transition-colors ${
          isActive
            ? 'bg-gray-200 text-gray-900 font-medium'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={isActive ? 'text-gray-900' : 'text-gray-500'}>{item.icon}</span>
          <span className="text-sm">{item.label}</span>
        </div>
        {item.badge && (
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.badge}</span>
        )}
      </Link>
    );
  };

  return (
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
      <aside className="w-64 bg-[#F5F5F5] flex flex-col fixed h-full pt-14 border-r border-gray-200">
        {/* User Profile Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center justify-between w-full hover:bg-gray-100 rounded-lg p-2 -mx-2 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user?.displayName?.charAt(0) || 'U'}
              </div>
              <span className="font-medium text-sm text-gray-900">{username}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {mainNavItems.map((item) => renderNavItem(item))}
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Tools</p>
            <div className="space-y-1">
              {toolsNavItems.map((item) => renderNavItem(item))}
            </div>
          </div>
        </nav>

        {/* Setup Checklist */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full border-2 border-purple-500 flex items-center justify-center">
                <span className="text-purple-600 text-sm font-semibold">33%</span>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">Your setup checklist</p>
                <p className="text-xs text-gray-500">2 of 6 complete</p>
              </div>
            </div>
            <button className="w-full py-2.5 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition">
              Finish setup
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button 
            onClick={signOut}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 pt-14">
        <div className="flex">
          {/* Content Area */}
          <div className="flex-1 p-8">
            <div className="max-w-3xl">
              {children}
            </div>
          </div>

          {/* Right Sidebar - Mobile Preview & Actions */}
          <div className="w-96 p-8 hidden xl:block">
            <div className="sticky top-22">
              {/* Share URL Box */}
              <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-full">
                    <span className="text-sm text-gray-600">linktree/{username}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhance Button */}
              <div className="flex gap-2 mb-6">
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

              {/* Mobile Preview */}
              <MobilePreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
