const bookController = require("../controllers/book.controller");
const router = require("express").Router();
const { createBookValidator, reviewValidator } = require("../utils/validations");
const authJwt = require("../middlewares/authJWT");

module.exports = app => {
    router.get('/books', [authJwt.verifyToken], bookController.getAllBooks);

    router.post('/books', [authJwt.verifyToken], createBookValidator, bookController.createBook);

    router.post('/:id/reviews', [authJwt.verifyToken], reviewValidator, bookController.addReview);

    app.use('/api/v1', router);
}