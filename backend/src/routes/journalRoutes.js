const express = require('express');
const router = express.Router();
const {
  createJournalEntry,
  getJournalEntries,
  getJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  getRecentEntries
} = require('../controllers/journalController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(protect, createJournalEntry)
  .get(protect, getJournalEntries);

router.get('/recent', protect, getRecentEntries);

router.route('/:id')
  .get(protect, getJournalEntry)
  .put(protect, updateJournalEntry)
  .delete(protect, deleteJournalEntry);

module.exports = router;
