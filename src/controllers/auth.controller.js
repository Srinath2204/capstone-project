const { validationResult } = require("express-validator");
const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.signup = async (req, res) => {
  try {
    const email = req.body.email;
    const userName = req.body.userName;
    const password = bcrypt.hashSync(req.body.password, 8);

    const errors = validationResult(req);
    if (errors?.errors?.length > 0) {
      return res.send({ message: errors?.errors[0]?.msg });
    }
    const user = new User({
      email: email,
      userName: userName,
      password: password,
    });

    const saveUser = await user.save();
    if (saveUser) {
      return res.status(200).send({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: `Failed to create USer : ${error}` });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    var isValidPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 3600,
    });
    res.status(200).send({
      id: user._id,
      username: user.userName,
      email: user.email,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: `Error in sign in : ${error}` });
  }
};
