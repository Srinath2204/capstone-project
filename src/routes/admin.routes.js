const adminController = require("../controllers/admin.controller");
const router = require("express").Router();
const authJwt = require("../middlewares/authJWT");

module.exports = app => {
    router.get('/users', [authJwt.verifyToken, authJwt.isAdmin], adminController.getUsers);

    router.delete('/users/:id', [authJwt.verifyToken, authJwt.isAdmin], adminController.deleteUser);

    router.put('/users/:id', [authJwt.verifyToken, authJwt.isAdmin], adminController.editUser)

    app.use('/api/v1/admin', router);
}