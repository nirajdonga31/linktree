'use client';

import { useAuth } from '@/hooks/use-auth';
import { useLinks } from '@/hooks/use-links';

// Custom scrollbar styles for the mobile preview
const scrollbarStyles = `
  .scrollbar-thin::-webkit-scrollbar {
    width: 3px;
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 3px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

interface MobilePreviewProps {
  links?: { id: string; title: string; url: string; isActive: boolean }[];
}

export default function MobilePreview({ links: propLinks }: MobilePreviewProps) {
  const { user } = useAuth();
  const { links: userLinks } = useLinks(user?.uid);

  const displayLinks = propLinks && propLinks.length > 0
    ? propLinks.filter((l) => l.isActive)
    : userLinks.filter((l) => l.isActive).length > 0
    ? userLinks.filter((l) => l.isActive)
    : [
        { id: '1', title: 'YouTube', url: '#', isActive: true },
        { id: '2', title: 'Instagram', url: '#', isActive: true },
        { id: '3', title: 'X', url: '#', isActive: true },
        { id: '4', title: 'Spotify', url: '#', isActive: true },
        { id: '5', title: 'Pinterest', url: '#', isActive: true },
      ];

  const username = user?.displayName?.toLowerCase().replace(/\s+/g, '') || 'user';

  return (
    <>
      <style>{scrollbarStyles}</style>
      {/* Phone Frame - No extra wrappers */}
      <div className="bg-black rounded-[28px] p-2 shadow-2xl">
          {/* Screen */}
          <div className="bg-black rounded-[24px] overflow-hidden w-[260px] h-[520px] relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-black rounded-b-2xl z-20 flex items-center justify-center">
              <div className="w-12 h-4 rounded-full flex items-center justify-center gap-1">
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
              </div>
            </div>
            
            {/* Content - Custom scrollbar */}
            <div className="h-full overflow-y-auto bg-black pt-8 pb-6 px-4 scrollbar-thin">
              {/* Profile */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl font-semibold">
                  {user?.displayName?.charAt(0) || 'U'}
                </div>
                <p className="font-medium text-white text-sm">@{username}</p>
                
                {/* Social Icons */}
                <div className="flex items-center justify-center gap-3 mt-3">
                  <button className="text-white/80 hover:text-white transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </button>
                  <button className="text-white/80 hover:text-white transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Links */}
              <div className="space-y-2.5">
                {displayLinks.slice(0, 6).map((link) => (
                  <div
                    key={link.id}
                    className="w-full py-3 px-4 bg-white/10 backdrop-blur-sm rounded-xl text-sm text-white font-medium text-center relative group cursor-pointer hover:bg-white/20 transition"
                  >
                    <span>{link.title}</span>
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition">
                      <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Linktree Branding */}
              <div className="text-center mt-8">
                <div className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-white/40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L8 6h3v6h2V6h3L12 2zM7 9L3 13l4 4v-3h6v-2H7V9zm10 0v3h-6v2h6v3l4-4-4-4z"/>
                  </svg>
                  <span className="text-xs text-white/40 font-medium">Linktree</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
