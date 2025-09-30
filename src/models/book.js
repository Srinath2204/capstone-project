const mongoose = require("mongoose");
// const Review = require("./review");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema(
    {
      title: String,
      author: String,
      genre: String,
      publishedDate: Number,
      description: String,
      createdBy: String
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Book;
