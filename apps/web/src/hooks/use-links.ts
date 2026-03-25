'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
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
      const data = await api.getLinks(userId);
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
      const newLink = await api.createLink({ ...input, userId });
      setLinks((prev) => [...prev, newLink].sort((a, b) => a.order - b.order));
      return newLink;
    } catch (err) {
      throw err;
    }
  };

  const updateLink = async (id: string, input: UpdateLinkInput) => {
    try {
      const updated = await api.updateLink(id, input);
      setLinks((prev) =>
        prev.map((link) => (link.id === id ? updated : link)).sort((a, b) => a.order - b.order)
      );
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteLink = async (id: string) => {
    try {
      await api.deleteLink(id);
      setLinks((prev) => prev.filter((link) => link.id !== id));
    } catch (err) {
      throw err;
    }
  };

  const reorderLinks = async (newOrder: Link[]) => {
    setLinks(newOrder);
    try {
      await api.reorderLinks(newOrder.map((l) => l.id));
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
