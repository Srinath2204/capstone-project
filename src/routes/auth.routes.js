const authController = require("../controllers/auth.controller");

module.exports = app => {
    const router = require("express").Router();
    app.use(function(req, res, next){
        req.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    })

    router.post('/signup', authController.signup);

    router.post('/signin', authController.signin);

    app.use('/api/auth', router);
}