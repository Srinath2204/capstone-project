const bookController = require("../controllers/book.controller");
const router = require("express").Router();
const { reviewValidator } = require("../utils/validations");
const authJwt = require("../middlewares/authJWT");

module.exports = app => {
    
    router.post('/:id/reviews', [authJwt.verifyToken], reviewValidator, bookController.addReview);

    router.delete('/review/:id', [authJwt.verifyToken], bookController.deleteReview);

    router.get('/reviews', [authJwt.verifyToken, authJwt.isAdmin], bookController.getReviews);

    router.get('/books/:bookId/reviews', [authJwt.verifyToken], bookController.getBookReviews);

    app.use('/api/v1', router);
}