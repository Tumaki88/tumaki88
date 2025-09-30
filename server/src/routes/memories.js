import { Router } from 'express';
import { listMemories } from '../store/memoryStore.js';

const router = Router();

router.get('/', (_req, res) => {
  try {
    res.json(listMemories());
  } catch (err) {
    console.error('Error fetching memories:', err);
    res.status(500).json({ error: 'Failed to fetch memories' });
  }
});

export default router;
