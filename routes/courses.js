const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses');
const advancedResults = require('../middlewares/advancedResults');
const Courses = require('../models/Course');
const { protect, authorize } = require('../middlewares/auth');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Courses, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getCourses
  )
  .post(protect, authorize('publisher', 'admin'), addCourse);
router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admin'), updateCourse)
  .delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
