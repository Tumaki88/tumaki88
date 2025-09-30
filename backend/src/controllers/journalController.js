const JournalEntry = require('../models/JournalEntry');

// @desc    Create new journal entry
// @route   POST /api/journal
// @access  Private
const createJournalEntry = async (req, res) => {
  try {
    const entryData = {
      ...req.body,
      user: req.user._id
    };

    const entry = new JournalEntry(entryData);
    await entry.save();

    res.status(201).json(entry);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Journal entry for this date already exists' });
    } else {
      res.status(500).json({ message: 'Error creating journal entry', error: error.message });
    }
  }
};

// @desc    Get user's journal entries
// @route   GET /api/journal
// @access  Private
const getJournalEntries = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const entries = await JournalEntry.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await JournalEntry.countDocuments({ user: req.user._id });

    res.json({
      entries,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching journal entries', error: error.message });
  }
};

// @desc    Get single journal entry
// @route   GET /api/journal/:id
// @access  Private
const getJournalEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching journal entry', error: error.message });
  }
};

// @desc    Update journal entry
// @route   PUT /api/journal/:id
// @access  Private
const updateJournalEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Error updating journal entry', error: error.message });
  }
};

// @desc    Delete journal entry
// @route   DELETE /api/journal/:id
// @access  Private
const deleteJournalEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting journal entry', error: error.message });
  }
};

// @desc    Get recent journal entries
// @route   GET /api/journal/recent
// @access  Private
const getRecentEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(5);

    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent entries', error: error.message });
  }
};

module.exports = {
  createJournalEntry,
  getJournalEntries,
  getJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  getRecentEntries
};
