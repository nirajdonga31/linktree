'use client';

import { useAuth } from '@/hooks/use-auth';

interface MobilePreviewProps {
  links?: { id: string; title: string; url: string; isActive: boolean }[];
}

export default function MobilePreview({ links = [] }: MobilePreviewProps) {
  const { user } = useAuth();

  const displayLinks = links.length > 0 
    ? links.filter((l) => l.isActive)
    : [
        { id: '1', title: '🚀 My Portfolio', url: '#', isActive: true },
        { id: '2', title: '🐦 Twitter / X', url: '#', isActive: true },
        { id: '3', title: '💻 GitHub', url: '#', isActive: true },
      ];

  return (
    <div className="sticky top-8">
      <div className="bg-gray-800 rounded-[3rem] p-3 shadow-2xl">
        <div className="bg-white rounded-[2.5rem] overflow-hidden w-[280px] h-[580px] relative">
          {/* Phone notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-b-2xl z-10"></div>
          
          {/* Profile content */}
          <div className="h-full overflow-y-auto bg-[#f5f5f5] pt-10 pb-6 px-4">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold shadow-md"
              >
                {user?.displayName?.charAt(0) || 'U'}
              </div>
              <p className="font-semibold text-gray-900 text-sm">{user?.displayName || 'Your Name'}</p>
              <p className="text-xs text-gray-500 mt-0.5">{user?.bio || 'Your bio here'}</p>
            </div>

            <div className="space-y-2">
              {displayLinks.map((link) => (
                <div
                  key={link.id}
                  className="w-full py-3 px-4 bg-white rounded-xl font-medium text-sm text-gray-800 shadow-sm border border-gray-100 text-center truncate"
                >
                  {link.title}
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <p className="text-[10px] text-gray-400">🔗 Linktree</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-4">Mobile Preview</p>
    </div>
  );
}
