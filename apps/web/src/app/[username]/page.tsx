'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import type { Link, Theme, User } from '@linktree/shared';

const defaultUser: User = {
  uid: '',
  email: '',
  username: '',
  displayName: 'Loading...',
  bio: '',
  avatarUrl: '',
  theme: {
    preset: 'minimal',
    backgroundColor: '#f5f5f5',
    buttonColor: '#ffffff',
    buttonTextColor: '#1a1a1a',
    fontFamily: 'inter',
  },
  createdAt: '',
  updatedAt: '',
};

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  
  const [user, setUser] = useState<User>(defaultUser);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, using mock data
    // In production, fetch user by username from API
    setUser({
      ...defaultUser,
      username,
      displayName: 'John Doe',
      bio: 'Developer & Creator | Building cool things',
    });

    // Mock links - in production fetch from API
    setLinks([
      { id: '1', userId: '1', title: '🚀 My Portfolio', url: 'https://example.com', isActive: true, order: 0, clickCount: 42, createdAt: '', updatedAt: '' },
      { id: '2', userId: '1', title: '🐦 Twitter / X', url: 'https://twitter.com', isActive: true, order: 1, clickCount: 128, createdAt: '', updatedAt: '' },
      { id: '3', userId: '1', title: '💻 GitHub', url: 'https://github.com', isActive: true, order: 2, clickCount: 89, createdAt: '', updatedAt: '' },
      { id: '4', userId: '1', title: '📸 Instagram', url: 'https://instagram.com', isActive: true, order: 3, clickCount: 256, createdAt: '', updatedAt: '' },
      { id: '5', userId: '1', title: '💼 LinkedIn', url: 'https://linkedin.com', isActive: true, order: 4, clickCount: 67, createdAt: '', updatedAt: '' },
    ]);
    
    setLoading(false);
  }, [username]);

  const handleLinkClick = async (linkId: string, url: string) => {
    // Track click
    try {
      await api.trackClick(user.uid || 'demo', linkId);
    } catch (e) {
      // Ignore tracking errors
    }
    window.open(url, '_blank');
  };

  const getFontClass = (font: Theme['fontFamily']) => {
    const fonts = {
      inter: 'font-inter',
      roboto: 'font-roboto',
      poppins: 'font-poppins',
      playfair: 'font-playfair',
    };
    return fonts[font] || 'font-inter';
  };

  const activeLinks = links.filter((l) => l.isActive).sort((a, b) => a.order - b.order);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${getFontClass(user.theme.fontFamily)}`}
      style={{ backgroundColor: user.theme.backgroundColor }}
    >
      <div className="max-w-xl mx-auto px-6 py-10">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div 
            className="w-28 h-28 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
            style={{
              background: user.theme.preset === 'gradient' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
            }}
          >
            {user.displayName.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold mb-2 text-gray-900">{user.displayName}</h1>
          <p className="text-gray-600 max-w-sm mx-auto">{user.bio}</p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {activeLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id, link.url)}
              className="w-full py-4 px-6 rounded-2xl font-medium text-base transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] border border-gray-100"
              style={{
                backgroundColor: user.theme.buttonColor,
                color: user.theme.buttonTextColor,
              }}
            >
              {link.title}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <a 
            href="/" 
            className="text-sm text-gray-400 hover:text-gray-600 transition flex items-center justify-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            Linktree
          </a>
        </div>
      </div>
    </div>
  );
}
