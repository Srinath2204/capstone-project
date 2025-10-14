const reviewService = require("../services/review.service");

exports.addReview =  (req, res) => {
  reviewService.addReview(req, res);
};

exports.getReviews =  (req, res) => {
  reviewService.getReviews(req, res);
};

exports.deleteReview =  (req, res) => {
  reviewService.deleteReview(req, res);
};

exports.getBookReviews =  (req, res) => {
  reviewService.getBookReviews(req, res);
};
