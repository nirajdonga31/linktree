'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getLinksByUsername, incrementClickCount } from '@/lib/firebase-links';
import type { Link, Theme } from '@linktree/shared';

interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  theme: Theme;
}

const defaultProfile: UserProfile = {
  username: '',
  displayName: 'Loading...',
  bio: '',
  theme: {
    preset: 'minimal',
    backgroundColor: '#f5f5f5',
    buttonColor: '#ffffff',
    buttonTextColor: '#1a1a1a',
    fontFamily: 'inter',
  },
};

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!username) return;
      
      try {
        setLoading(true);
        const userLinks = await getLinksByUsername(username);
        setLinks(userLinks);
        
        // Set profile info from first link's userId (we could also fetch user doc)
        // For now, use username as display name with capitalization
        setProfile({
          username,
          displayName: username.charAt(0).toUpperCase() + username.slice(1),
          bio: '',
          theme: defaultProfile.theme,
        });
        
        setError(null);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [username]);

  const handleLinkClick = async (link: Link) => {
    // Track click
    try {
      await incrementClickCount(link.userId, link.id);
    } catch (e) {
      // Ignore tracking errors
    }
    window.open(link.url, '_blank');
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

  if (error || activeLinks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">@{username}</h1>
          <p className="text-gray-600">{error || 'No links found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${getFontClass(profile.theme.fontFamily)}`}
      style={{ backgroundColor: profile.theme.backgroundColor }}
    >
      <div className="max-w-xl mx-auto px-6 py-10">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div
            className="w-28 h-28 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
            style={{
              background:
                profile.theme.preset === 'gradient'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            }}
          >
            {profile.displayName.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold mb-2 text-gray-900">{profile.displayName}</h1>
          {profile.bio && <p className="text-gray-600 max-w-sm mx-auto">{profile.bio}</p>}
        </div>

        {/* Links */}
        <div className="space-y-3">
          {activeLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link)}
              className="w-full py-4 px-6 rounded-2xl font-medium text-base transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] border border-gray-100"
              style={{
                backgroundColor: profile.theme.buttonColor,
                color: profile.theme.buttonTextColor,
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
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            Linktree
          </a>
        </div>
      </div>
    </div>
  );
}
