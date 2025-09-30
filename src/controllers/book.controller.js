const { validationResult } = require("express-validator");
const db = require("../models");
const Book = db.book;
const Review = db.review;
const Role = db.role;
const User = db.user;

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
        createdBy: req.userId,
      });
      const data = await newBook.save();
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

    const books = await Book.find(condition);
    res.send(books);
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

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).send({ message: "No users found" });
    }
    return res.status(200).send(users);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Error in fetching users" });
  }
};
