'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useLinks } from '@/hooks/use-links';
import type { Link } from '@linktree/shared';

// Extended link type with star functionality (UI-only, not persisted to DB)
interface ExtendedLink extends Link {
  isStarred?: boolean;
}

interface AdminContextType {
  // Links from Firebase
  links: ExtendedLink[];
  loading: boolean;
  error: string | null;
  // Actions
  toggleLink: (id: string) => Promise<void>;
  updateLinkUrl: (id: string, url: string) => Promise<void>;
  updateLinkTitle: (id: string, title: string) => Promise<void>;
  toggleStarLink: (id: string) => void;
  deleteLink: (id: string) => Promise<void>;
  createLink: (title: string, url: string) => Promise<void>;
  getActiveLinks: () => ExtendedLink[];
  copyShareLink: (title: string) => Promise<void>;
  refreshLinks: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children, userId }: { children: ReactNode; userId?: string }) {
  const {
    links: firebaseLinks,
    loading,
    error,
    createLink: createLinkFirebase,
    updateLink: updateLinkFirebase,
    deleteLink: deleteLinkFirebase,
    refresh,
  } = useLinks(userId);

  // Local state for starred status (UI-only)
  const [starredLinks, setStarredLinks] = useState<Set<string>>(new Set());

  // Combine Firebase links with local starred state
  const links: ExtendedLink[] = firebaseLinks.map((link) => ({
    ...link,
    isStarred: starredLinks.has(link.id),
  }));

  const toggleLink = async (id: string) => {
    const link = links.find((l) => l.id === id);
    if (!link) return;
    await updateLinkFirebase(id, { isActive: !link.isActive });
  };

  const updateLinkUrl = async (id: string, url: string) => {
    await updateLinkFirebase(id, { url });
  };

  const updateLinkTitle = async (id: string, title: string) => {
    await updateLinkFirebase(id, { title });
  };

  const toggleStarLink = useCallback((id: string) => {
    setStarredLinks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const deleteLink = async (id: string) => {
    await deleteLinkFirebase(id);
  };

  const createLink = async (title: string, url: string) => {
    await createLinkFirebase({ title, url });
  };

  const copyShareLink = async (title: string) => {
    const shareUrl = `${window.location.origin}/${title.toLowerCase().replace(/\s+/g, '-')}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getActiveLinks = useCallback(() => {
    return links
      .filter((link) => link.isActive && link.url)
      .sort((a, b) => {
        // Starred links first
        if (a.isStarred === b.isStarred) return 0;
        return a.isStarred ? -1 : 1;
      });
  }, [links]);

  return (
    <AdminContext.Provider
      value={{
        links,
        loading,
        error,
        toggleLink,
        updateLinkUrl,
        updateLinkTitle,
        toggleStarLink,
        deleteLink,
        createLink,
        getActiveLinks,
        copyShareLink,
        refreshLinks: refresh,
      }}
    >
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
