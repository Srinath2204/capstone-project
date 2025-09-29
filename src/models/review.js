const mongoose = require("mongoose");
const Book = require("./book");
const User = require("./user")

const Review = mongoose.model(
  "Review",
  new mongoose.Schema({
    comment: String,
    rating: Number,
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book",},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
  })
);

module.exports = Review;
