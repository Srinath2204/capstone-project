const bookController = require("../controllers/book.controller");
const router = require("express").Router();
const { createBookValidator } = require("../utils/validations");

module.exports = app => {
    router.get('/', bookController.getAllBooks);

    router.post('/', createBookValidator, bookController.createBook);

    app.use('/api/v1', router);
}