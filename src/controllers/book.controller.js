const { validationResult } = require("express-validator");
const db = require("../models");
const Book = db.book;
const Review = db.review;

exports.createBook = async (req, res) => {
  try {
    const bookData = req.body;

    const errors = validationResult(req);

    if (errors.errors.length > 0) {
      res.status(400).send({
        message: errors.errors[0].msg,
      });
    } else {
      const newBook = new Book({
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        genre: bookData.genre,
        publishedData: bookData.publishedData,
      });
      const data = await newBook.save();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error in creating book",
    });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const title = req?.query?.title;
    const condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};

    const books = await Book.find(condition);
    res.send(books);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error in fetching books",
    });
  }
};

exports.addReview = async (req, res) => {
  try {
    console.log("Requesttttt", req)
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
        userId: req.userId
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
