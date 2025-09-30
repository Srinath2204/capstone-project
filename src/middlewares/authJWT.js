const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const Role = require("../models/role");
const User = require("../models/user");


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
            req.role = decoded.role;
            next();
        })
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const userRole = await Role.findById(req.role);
        if(userRole.name === 'Admin'){
            next();
        }
        else{
            res.send({message: 'Unauthenticated : Admin role is required'})
        }
    } catch (error) {
        res.status(500).send({message: `${error}`})
    }
}

const isUser = async (req, res, next) => {
    try {
        const userRole = await Role.findById(req.role);
        if(userRole.name === 'User'){
            next();
        }
        else{
            res.send({message: 'Unauthenticated : User role is required'})
        }
    } catch (error) {
        res.status(500).send({message: `${error}`})
    }
}

const authJwt = {
  verifyToken, isAdmin, isUser
};
module.exports = authJwt;