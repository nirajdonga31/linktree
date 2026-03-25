import { Router } from 'express';
import { LinksTable } from '../firebase';

const router = Router();

// Get all links for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const links = await LinksTable.getByUserId(userId);
    res.json({ data: links });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch links', code: 'FETCH_ERROR' });
  }
});

// Create a new link
router.post('/', async (req, res) => {
  try {
    const { userId, ...data } = req.body;
    const link = await LinksTable.create(userId, data);
    res.status(201).json({ data: link });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create link', code: 'CREATE_ERROR' });
  }
});

// Update a link
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, ...data } = req.body;
    const link = await LinksTable.update(userId, id, data);
    res.json({ data: link });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update link', code: 'UPDATE_ERROR' });
  }
});

// Delete a link
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    await LinksTable.delete(userId, id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete link', code: 'DELETE_ERROR' });
  }
});

// Reorder links
router.patch('/reorder', async (req, res) => {
  try {
    const { userId, linkIds } = req.body;
    await LinksTable.reorder(userId, linkIds);
    res.json({ data: { success: true } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder links', code: 'REORDER_ERROR' });
  }
});

export default router;
