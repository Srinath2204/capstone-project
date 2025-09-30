const controller = require("../controllers/review.controller");
const router = require("express").Router();
const { reviewValidator } = require("../utils/validations");
const authJwt = require("../middlewares/authJWT");

module.exports = app => {
    
    router.post('/:id/reviews', [authJwt.verifyToken], reviewValidator, controller.addReview);

    router.delete('/review/:id', [authJwt.verifyToken], controller.deleteReview);

    router.get('/reviews', [authJwt.verifyToken, authJwt.isAdmin], controller.getReviews);

    router.get('/books/:bookId/reviews', [authJwt.verifyToken], controller.getBookReviews);

    app.use('/api/v1', router);
}