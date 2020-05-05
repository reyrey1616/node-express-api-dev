const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxLength: 100,
    required: [true, 'Please add a title for the review'],
  },
  text: {
    type: String,
    required: [true, 'Please add a some text'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add a rating between 1-10'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //   To create a relationship in bootcamp. meaning every course must be under the bootcamp
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Review', ReviewSchema);