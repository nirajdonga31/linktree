'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getLinks,
  createLink as createLinkFirebase,
  updateLink as updateLinkFirebase,
  deleteLink as deleteLinkFirebase,
  reorderLinks as reorderLinksFirebase,
} from '@/lib/firebase-links';
import type { Link, CreateLinkInput, UpdateLinkInput } from '@linktree/shared';

export function useLinks(userId: string | undefined) {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await getLinks(userId);
      setLinks(data.sort((a, b) => a.order - b.order));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch links');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const createLink = async (input: CreateLinkInput) => {
    if (!userId) return;
    try {
      const newLink = await createLinkFirebase(userId, input);
      setLinks((prev) => [...prev, newLink].sort((a, b) => a.order - b.order));
      return newLink;
    } catch (err) {
      throw err;
    }
  };

  const updateLink = async (id: string, input: UpdateLinkInput) => {
    if (!userId) throw new Error('User not authenticated');
    try {
      await updateLinkFirebase(userId, id, input);
      // Update local state
      setLinks((prev) =>
        prev
          .map((link) =>
            link.id === id ? { ...link, ...input, updatedAt: new Date().toISOString() } : link
          )
          .sort((a, b) => a.order - b.order)
      );
    } catch (err) {
      throw err;
    }
  };

  const deleteLink = async (id: string) => {
    if (!userId) throw new Error('User not authenticated');
    try {
      await deleteLinkFirebase(userId, id);
      setLinks((prev) => prev.filter((link) => link.id !== id));
    } catch (err: any) {
      console.error('[useLinks] Delete error:', err);
      if (err.code === 'permission-denied') {
        throw new Error('Permission denied. Check Firebase security rules.');
      }
      throw err;
    }
  };

  const reorderLinks = async (newOrder: Link[]) => {
    setLinks(newOrder);
    if (!userId) return;
    try {
      await reorderLinksFirebase(
        userId,
        newOrder.map((l) => l.id)
      );
    } catch (err) {
      // Revert on error
      fetchLinks();
      throw err;
    }
  };

  return {
    links,
    loading,
    error,
    createLink,
    updateLink,
    deleteLink,
    reorderLinks,
    refresh: fetchLinks,
  };
}
