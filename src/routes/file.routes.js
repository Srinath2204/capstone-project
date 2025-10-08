const controller = require("../controllers/file.controller");
const uploadMiddleware = require("../middlewares/fileUploadDownload")
const router = require("express").Router();

module.exports = app => {
    router.get("/files", uploadMiddleware, controller.getFiles);

    router.post("/files/upload/:bookId", uploadMiddleware, controller.upload);

    router.get("/files/:bookId/:fileName", uploadMiddleware, controller.download);

    router.delete("/files/:bookId/:fileName", uploadMiddleware, controller.remove)

    app.use('/api/v1', router);
}