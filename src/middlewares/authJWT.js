const config = require("../config/auth.config");
const jwt = require("jsonwebtoken")


const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token){
        res.status(403).send({messagee : "Please provide token"})
    }
    else{
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err){
                return res.status(403).send({message : "Unauthorized request"})
            }
            req.userId = decoded.id;
            next();
        })
    }
}

const authJwt = {
  verifyToken
};
module.exports = authJwt;