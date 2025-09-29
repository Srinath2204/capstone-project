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
    //   review: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Review",
    //     },
    //   ],
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Book;
