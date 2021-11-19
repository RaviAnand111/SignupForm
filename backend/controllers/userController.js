const { validationResult } = require("express-validator");
const db = require("../models");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "Welcometonewsapplication";

const User = db.users;
// const Review = db.reviews

// create a user
const createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);
  console.log(secPass);

  let info = {
    email: req.body.email,
    password: secPass,
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    dob: req.body.dob,
    gender: req.body.gender,
    phone: req.body.phone,
    address: req.body.address,
    admin_user_id: "admin",
  };

  console.log(info);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // let olduser = await User.findOne({ where: { email: req.body.email } });
    // if (info.email == olduser.email) {
    //   return res
    //     .status(400)
    //     .json({ error: "Sorry a user with this email already exists" });
    // }

    await User.create(info);
    const data = {
      user: {
        email: User.email,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res
      .status(200)
      .send({ status: "User Created Successfully", authToken: authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(" User Already Exists :(");
  }
};

// to login a user
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  console.log(req.body);
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Please try to login with correct Credentials",
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({
        success: false,
        error: "Please try to login with correct Credentials",
      });
    }
    const data = {
      user: {
        email: user.email,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    // let userData = await User.findOne({ where: { email: req.body.email } });
    // res.json(userData);
    res.json({ success: true, authToken: authToken });
    // res.json(authToken);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error :(");
  }
};

// get user by credentials
const getUser = async (req, res) => {
  try {
    emailId = req.user.email;
    const user = await User.findOne({ where: { email: emailId } });
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  // getAllProducts,
  // getOneProduct,
  // updateProduct,
  // deleteProduct,
  // getPublishedProduct
};
