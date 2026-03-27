'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PlaceholderLink {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
  isStarred: boolean;
  clickCount: number;
}

interface AdminContextType {
  placeholderLinks: PlaceholderLink[];
  togglePlaceholderLink: (id: string) => void;
  updatePlaceholderLinkUrl: (id: string, url: string) => void;
  toggleStarLink: (id: string) => void;
  getActivePlaceholderLinks: () => PlaceholderLink[];
  copyShareLink: (title: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [placeholderLinks, setPlaceholderLinks] = useState<PlaceholderLink[]>([
    { id: '1', title: 'YouTube', url: '', isActive: true, isStarred: false, clickCount: 12 },
    { id: '2', title: 'Instagram', url: '', isActive: true, isStarred: false, clickCount: 8 },
    { id: '3', title: 'X', url: '', isActive: true, isStarred: false, clickCount: 3 },
    { id: '4', title: 'Spotify', url: '', isActive: true, isStarred: false, clickCount: 0 },
    { id: '5', title: 'Pinterest', url: '', isActive: true, isStarred: false, clickCount: 0 },
    { id: '6', title: 'TikTok', url: '', isActive: false, isStarred: false, clickCount: 0 },
    { id: '7', title: 'LinkedIn', url: '', isActive: false, isStarred: false, clickCount: 0 },
    { id: '8', title: 'Facebook', url: '', isActive: false, isStarred: false, clickCount: 0 },
    { id: '9', title: 'Snapchat', url: '', isActive: false, isStarred: false, clickCount: 0 },
    { id: '10', title: 'Twitch', url: '', isActive: false, isStarred: false, clickCount: 0 },
    { id: '11', title: 'Discord', url: '', isActive: false, isStarred: false, clickCount: 0 },
    { id: '12', title: 'WhatsApp', url: '', isActive: false, isStarred: false, clickCount: 0 },
    { id: '13', title: 'Telegram', url: '', isActive: false, isStarred: false, clickCount: 0 },
    { id: '14', title: 'Behance', url: '', isActive: false, isStarred: false, clickCount: 0 },
  ]);

  const togglePlaceholderLink = (id: string) => {
    setPlaceholderLinks(prev => prev.map(link => 
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ));
  };

  const updatePlaceholderLinkUrl = (id: string, url: string) => {
    setPlaceholderLinks(prev => prev.map(link => 
      link.id === id ? { ...link, url } : link
    ));
  };

  const toggleStarLink = (id: string) => {
    setPlaceholderLinks(prev => prev.map(link => 
      link.id === id ? { ...link, isStarred: !link.isStarred } : link
    ));
  };

  const copyShareLink = async (title: string) => {
    const shareUrl = `${window.location.origin}/${title.toLowerCase()}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getActivePlaceholderLinks = () => {
    // Return active links, sorted by starred first
    return placeholderLinks
      .filter(link => link.isActive)
      .sort((a, b) => {
        // Only sort by star status, not by on/off
        if (a.isStarred === b.isStarred) return 0;
        return a.isStarred ? -1 : 1;
      });
  };

  return (
    <AdminContext.Provider value={{ 
      placeholderLinks, 
      togglePlaceholderLink,
      updatePlaceholderLinkUrl,
      toggleStarLink,
      getActivePlaceholderLinks,
      copyShareLink 
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
