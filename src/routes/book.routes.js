const bookController = require("../controllers/book.controller");
const router = require("express").Router();
const { createBookValidator } = require("../utils/validations");
const authJwt = require("../middlewares/authJWT");

module.exports = app => {
    router.get('/books', [authJwt.verifyToken], bookController.getAllBooks);

    router.post('/books', [authJwt.verifyToken], createBookValidator, bookController.createBook);

    router.delete('/books/:id', [authJwt.verifyToken], bookController.deleteBook);

    router.put('/books/:id', [authJwt.verifyToken], bookController.editBook)

    router.get('/admin/users', [authJwt.verifyToken, authJwt.isAdmin], bookController.getUsers);

    app.use('/api/v1', router);
}