const userController = require("../controllers/userController.js");
const { body } = require("express-validator");

const router = require("express").Router();

// Route 1: SignUp a new User
router.post(
  "/signup",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Choose a password of minimum 8 characters").isLength({
      min: 8,
    }),
    body("password", "Choose a password of maximum 10 characters").isLength({
      max: 20,
    }),
  ],
  userController.createUser
);

// Router 2: LogIn an existing user
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  userController.loginUser
);

module.exports = router;
