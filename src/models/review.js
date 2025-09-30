const mongoose = require("mongoose");
const Book = require("./book");
const User = require("./user")

const Review = mongoose.model(
  "Review",
  new mongoose.Schema({
    comment: String,
    rating: {type: Number, min: 1, max: 5},
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book"},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
  },
  {
    timestamps: true,
  })
);

module.exports = Review;
