const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  study: {
    hours: {
      type: Number,
      required: true,
      min: 0
    },
    subjects: [{
      name: String,
      duration: Number,
      notes: String
    }],
    productivity: {
      type: Number,
      min: 1,
      max: 10
    }
  },
  exercise: {
    completed: {
      type: Boolean,
      default: false
    },
    type: String,
    duration: Number,
    exercises: [{
      name: String,
      sets: Number,
      reps: Number,
      weight: Number
    }]
  },
  mood: {
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    },
    notes: String
  },
  reflection: {
    type: String
  }
}, {
  timestamps: true
});

// Create compound index for user and date to ensure one entry per day per user
JournalEntrySchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('JournalEntry', JournalEntrySchema);
