const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  weeks: {
    type: String,
    required: [true, 'Please add a number of weeks'],
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost'],
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scholarhipsAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //   To create a relation ship in bootcamp. meaning every course must be under the bootcamp
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
});

// Static method to get average of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
  console.log('calculating average cost'.blue);

  // Aggregate all tuition and get the average by using $avg by $match(bootcamp field) and assign it to averageCost
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: { _id: '$bootcamp', averageCost: { $avg: '$tuition' } },
    },
  ]);
};

// Call getAverage cost after save
CourseSchema.post('save', function (next) {
  this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverage cost before remove
CourseSchema.pre('remove', function (next) {
  this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model('Course', CourseSchema);
