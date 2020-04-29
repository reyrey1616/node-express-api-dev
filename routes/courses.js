const express = require('express');
const { getCourses, getCourse } = require('../controllers/courses');

const router = express.Router({ mergeParams: true });

router.route('/:id').get(getCourse);
router.route('/').get(getCourses);

module.exports = router;
