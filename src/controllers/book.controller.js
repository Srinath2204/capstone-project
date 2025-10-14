const bookService = require("../services/book.service");

exports.createBook =  (req, res) => {
  bookService.createBook(req, res);
};

exports.getAllBooks =  (req, res) => {
  bookService.getAllBooks(req, res);
};

exports.editBook =  (req, res) => {
  bookService.editBook(req, res);
};

exports.deleteBook =  (req, res) => {
  bookService.deleteBook(req, res);
};
