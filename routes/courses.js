const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
} = require('../controllers/courses');

const router = express.Router({ mergeParams: true });

router.route('/:id').get(getCourse).put(updateCourse);
router.route('/').get(getCourses).post(addCourse);
module.exports = router;
