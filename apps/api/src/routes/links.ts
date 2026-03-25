import { Router } from 'express';
import type { Link, CreateLinkInput, UpdateLinkInput } from '@linktree/shared';

const router = Router();

// In-memory storage for now - replace with Firestore
const links: Link[] = [];

// Get all links for a user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const userLinks = links
    .filter((l) => l.userId === userId)
    .sort((a, b) => a.order - b.order);
  res.json({ data: userLinks });
});

// Create a new link
router.post('/', (req, res) => {
  const input: CreateLinkInput = req.body;
  
  const link: Link = {
    id: Date.now().toString(),
    userId: 'temp-user-id', // TODO: Get from auth
    title: input.title,
    url: input.url,
    isActive: true,
    order: links.length,
    clickCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  links.push(link);
  res.status(201).json({ data: link });
});

// Update a link
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const input: UpdateLinkInput = req.body;
  
  const index = links.findIndex((l) => l.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Link not found', code: 'NOT_FOUND' });
  }
  
  links[index] = { ...links[index], ...input, updatedAt: new Date().toISOString() };
  res.json({ data: links[index] });
});

// Delete a link
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = links.findIndex((l) => l.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Link not found', code: 'NOT_FOUND' });
  }
  
  links.splice(index, 1);
  res.status(204).send();
});

// Reorder links
router.patch('/reorder', (req, res) => {
  const { linkIds }: { linkIds: string[] } = req.body;
  
  linkIds.forEach((id, index) => {
    const link = links.find((l) => l.id === id);
    if (link) {
      link.order = index;
      link.updatedAt = new Date().toISOString();
    }
  });
  
  res.json({ data: { success: true } });
});

export default router;
