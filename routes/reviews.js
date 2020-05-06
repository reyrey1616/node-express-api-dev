const express = require('express');
const { getReviews, getReview, addReview } = require('../controllers/reviews');
const router = express.Router({ mergeParams: true });
const Review = require('../models/Review');
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');
// router.use(protect);
// router.use(authorize('admin'));

router
  .route('/')
  .get(
    advancedResults(Review, { path: 'bootcamp', select: 'name description' }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReview);

router.route('/:id').get(getReview);

module.exports = router;
