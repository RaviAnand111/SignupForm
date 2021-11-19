const { validationResult } = require("express-validator");
const db = require("../models");

const User = db.profiles;

// create a user
const createUser = async (req, res) => {

  let info = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    phone: req.body.phone,
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
      await User.create(info);
      res
        .status(200)
        .send({ status: "User Created Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("User already exists!!");
  }
};

// to login a user
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Please try to login with correct Credentials",
      });
    }
    else {
      if (req.body.password == user.password) {
        res.json(user);
      }
      else {
        return res.status(401).json({
          success: false,
          error: "Please try to login with correct Credentials",
        });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error :(");
  }
};

module.exports = {
  createUser,
  loginUser
};
