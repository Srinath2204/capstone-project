const { validationResult } = require("express-validator");
const db = require("../models");
const Book = db.book;
const Review = db.review;
const Role = db.role;

const  { redisClient } = require("../utils/redisClient");

const bookService = require("../services/book.service");

exports.createBook = async (req, res) => {
  try {
    const bookData = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
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
        createdBy: req.userId,
      });
      const data = await newBook.save();
      await redisClient.del("allBooks");
      res.status(201).send(data);
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

    if(!title){
      const cachedBooks = await redisClient.get("allBooks");
      if(!cachedBooks){
        let books;
        books = await Book.find(condition);
        await redisClient.set("allBooks", JSON.stringify(books));
        return res.status(201).send(books);
      }
      const books = JSON.parse(cachedBooks);
      return res.status(201).send(books);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error in fetching books",
    });
  }
};

exports.editBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const userRole = await Role.findById(req.role);

    const book = await Book.findById(bookId);

    if (userRole.name === "Admin" || req.userId === book.createdBy) {
      const isBookUpdated = await Book.findByIdAndUpdate(bookId, req.body);

      if (!isBookUpdated) {
        return res
          .status(500)
          .send({ message: `Error in updating book with ID ${bookId}` });
      }
      return res
        .status(200)
        .send({ message: `Book with ID ${bookId} updated successfully` });
    } else {
      return res.status(403).send({ message: "Unauthenticated" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      return res
        .status(200)
        .send({ message: `Book with Id ${bookId} not found` });
    }
    const bookReviews = await Review.find({ bookId: bookId });

    const userRole = await Role.findById(req.role);

    if (userRole.name === "Admin" || req.userId === book.createdBy) {
      const isBookDeleted = await Book.findByIdAndDelete(bookId);
      if (isBookDeleted && bookReviews) {
        const isReviewsDetelted = await Review.deleteMany({ bookId: bookId });
      }
      return res.status(200).send({
        messaga: `Book with Id ${bookId} and it's reviews deleted successfully`,
      });
    } else {
      return res.status(403).send({
        message: `Unauthenticated, you are not authenticated to delete this book`,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
