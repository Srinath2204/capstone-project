const { body } = require("express-validator");
const { book } = require("../models");

const genreEnum = ["action", "thriller"];

const checkDuplicateTitle = async (title) => {
  const existingTitle = await book.findOne({
    title: { $regex: new RegExp(`^${title}$`, "i") },
  });
  if (existingTitle) {
    throw new Error("Title already exists.");
  }
  return true;
};

const dateValidation = (value) => {
  const [year, month, day] = value.split("/").map(Number);
  const inputDate = new Date(year, month - 1, day);
  const today = new Date();

  if (
    inputDate.getFullYear() !== year ||
    inputDate.getMonth() !== month - 1 ||
    inputDate.getDate() !== day
  ) {
    throw new Error("Published Date is not a valid calendar Date.");
  }

  if (inputDate > today) {
    throw new Error("Published Date cannot be greater than current Date.");
  }

  return true;
};

exports.createBookValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .custom(checkDuplicateTitle),
  body("author").trim().notEmpty().withMessage("Author cannot be empty"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("genre")
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isIn(genreEnum).withMessage("Genre is not availbale"),
  body("publishedDate")
    .notEmpty()
    .withMessage("Published Date cannot be empty")
    .matches(/^\d{4}\/\d{2}\/\d{2}$/)
    .withMessage("Published Date must be in yyyy/mm/dd format")
    .custom(dateValidation),
];
