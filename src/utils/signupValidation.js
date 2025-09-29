const { body } = require("express-validator");
const User = require("../models/user");

const checkDuplicateUserName = async (userName) => {
    const isExistingUserName =  await User.findOne({userName : userName});
    if(isExistingUserName){
        throw new Error("User name already exists.");
    }
    return true;
}

const checkDuplicateUserEmail = async (email) => {
    const isExistingUserEmail =  await User.findOne({email : email});
    if(isExistingUserEmail){
        throw new Error("Email already exists.");
    }
    return true;
}

exports.verifySignupValidation = [
    body('userName').trim().notEmpty().withMessage("Username cannot be empty").custom(checkDuplicateUserName),
    body('email').trim().notEmpty().withMessage("Email cannot be empty").isEmail().custom(checkDuplicateUserEmail),
    body('password').trim().notEmpty().withMessage("Password cannot be empty")
]