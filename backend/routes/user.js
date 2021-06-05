const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const User = require("../models/User");
//@route : test route
router.post("/test", (req, res) => {
  console.log(req.body);
  return res.json("Post message");
});

//@route :  POST /api/user/register
//@access:  public
//@public:  Register new User

router.post(
  "/",

  check("name", "name is required").notEmpty(),
  check("email", "email is required").isEmail(),
  check("password", "password length should be greater than 6").isLength({
    min: 6,
  }),

  async (req, res) => {
    // console.log(req.body);
    //check the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, name, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "user already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      //   const newPassword = bcrypt.hash(password, salt);
      user = new User({
        email,
        name,
        password,
      });
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //sign jwt token
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "2 days" },
        (err, token) => {
          if (err) {
            throw err;
          }
          return res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
