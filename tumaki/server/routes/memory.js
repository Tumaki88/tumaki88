const express = require('express');
const router = express.Router();
const Memory = require('../models/Memory');
const auth = require('../middleware/auth');

// Save a new memory
router.post('/', auth, async (req, res) => {
  try {
    const { content, category } = req.body;
    const newMemory = new Memory({
      userId: req.user.id,
      content,
      category
    });

    const savedMemory = await newMemory.save();
    res.json(savedMemory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all memories for a user
router.get('/', auth, async (req, res) => {
  try {
    const memories = await Memory.find({ userId: req.user.id })
      .sort({ timestamp: -1 });
    res.json(memories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
