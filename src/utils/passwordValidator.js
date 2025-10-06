const { body } = require("express-validator");

const passwordPolicy = (password) => {
    const hasNumber = /\d/;
    const hasSpecialCharacters = /[!@#$%^&*()_+{}\[\];,.?|\/]/;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;

    if(!hasNumber.test(password)){
        throw new Error("Password must contain atleast one number");
    }
    if(!hasSpecialCharacters.test(password)){
        throw new Error("password must contain atleast one special character")
    }
    if(!hasUppercase.test(password)){
        throw new Error("Password must contain atleast one uppercase character");
    }
    if(!hasLowercase.test(password)){
        throw new Error("password must contain atleast one lowercase character")
    }
    return true;
}


exports.passwordValidation = [
    body('password')
    .trim()
    .notEmpty().withMessage('Password cannot be empty')
    .isLength({min : 8}).withMessage('Password must be minimum 8 characters long')
    .isLength({max : 12}).withMessage("Password cannot contain more than 12 characters")
    .custom(passwordPolicy)
]