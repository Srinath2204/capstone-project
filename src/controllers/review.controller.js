const { validationResult } = require("express-validator");
const db = require("../models");
const Review = db.review;
const Role = db.role;

exports.addReview = async (req, res) => {
  try {
    const bookId = req?.params?.id;
    const reviewData = req.body;
    const errors = validationResult(req);
    if (errors?.errors?.length > 0) {
      res.status(400).send({ message: errors.errors[0].msg });
    } else {
      const newReview = new Review({
        comment: reviewData.comment,
        rating: reviewData.rating,
        bookId: bookId,
        userId: req.userId,
      });
      const data = await newReview.save();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error in posting review",
    });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    if (!reviews) {
      return res.status(404).send({message : "No reviews found"});
    }
    return res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error in fetching reviews",
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    if (!review) {
      return res
        .status(404)
        .send({ message: `Review with ID: ${reviewId} not found` });
    }
    const userRole = await Role.findById(req.role);

    if (userRole?.name === "Admin" || req.id === review.userId.toString()) {
      const isDeleted = await Review.findByIdAndDelete(reviewId);
      if (isDeleted) {
        res.status(200).send({
          message: `Review with ID : ${reviewId} deleted successfully`,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error in Deleting review",
    });
  }
};

exports.getBookReviews = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const bookReviews = await Review.find({ bookId: bookId });
    if (!bookReviews) {
      return res
        .status(200)
        .send({ message: `No reviews for book with Id : ${bookId}` });
    }
    res.status(200).send(bookReviews);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error in fetching Book Reviews",
    });
  }
};