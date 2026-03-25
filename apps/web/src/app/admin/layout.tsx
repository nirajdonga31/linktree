'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, useAuthListener } from '@/hooks/use-auth';
import MobilePreview from '@/components/mobile-preview';

const tabs = [
  { id: 'links', label: 'Links', href: '/admin', icon: '🔗' },
  { id: 'appearance', label: 'Appearance', href: '/admin/appearance', icon: '🎨' },
  { id: 'analytics', label: 'Analytics', href: '/admin/analytics', icon: '📊' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();

  // Initialize auth listener
  useAuthListener();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="text-2xl font-bold text-purple-600">Linktree</Link>
        </div>

        <nav className="flex-1 px-4 py-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">
            Manage
          </p>
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
                pathname === tab.href
                  ? 'bg-purple-50 text-purple-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4 p-2 rounded-xl bg-gray-50">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.displayName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user?.displayName || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full py-2.5 px-4 text-left text-gray-600 hover:bg-gray-100 rounded-xl transition text-sm font-medium"
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl">
          {children}
        </div>
      </main>

      {/* Mobile Preview - Only on links and appearance pages */}
      {(pathname === '/admin' || pathname === '/admin/appearance') && (
        <div className="fixed right-8 top-8 hidden xl:block">
          <MobilePreview />
        </div>
      )}
    </div>
  );
}
