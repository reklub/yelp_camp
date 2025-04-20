const express = require ('express');
const router = express.Router({mergeParams: true});
const catchAsync = require ('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const reviews = require('../controllers/reviewController');

router.post('/', isLoggedIn, validateReview, catchAsync (reviews.addReview))

router.delete('/:reviewId',isLoggedIn, isReviewAuthor, catchAsync (reviews.deleteReview))

module.exports = router;