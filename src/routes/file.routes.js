const controller = require("../controllers/file.controller");
const uploadMiddleware = require("../middlewares/fileUploadDownload");
const authJwt = require("../middlewares/authJWT");
const router = require("express").Router();
const isAdminOrCreatedUser = require("../middlewares/adminOrCreatedUserValidation");

module.exports = app => {
    router.get("/files", [authJwt.verifyToken, uploadMiddleware], controller.getFiles);

    router.post("/files/upload/:bookId", [authJwt.verifyToken, isAdminOrCreatedUser.validateCreatedUserOrAdmin, uploadMiddleware], controller.upload);

    router.get("/files/:bookId/:fileName", [authJwt.verifyToken], uploadMiddleware, controller.download);

    router.delete("/files/:bookId/:fileName", [authJwt.verifyToken, isAdminOrCreatedUser.validateCreatedUserOrAdmin, uploadMiddleware], controller.remove)

    app.use('/api/v1', router);
}