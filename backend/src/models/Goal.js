const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['study', 'fitness', 'personal', 'other'],
    required: true
  },
  target: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  targetUnit: {
    type: String
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  milestones: [{
    title: String,
    description: String,
    targetValue: Number,
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date
  }],
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Goal', GoalSchema);
