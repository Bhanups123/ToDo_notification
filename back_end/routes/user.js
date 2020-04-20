const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const Data = require("../models/Data");
const Keys = require("../config/keys");
const router = express.Router();
const mongoose = require("mongoose");

// const validateRegisterInput = require("../validation/register");
// const validateLoginInput = require("../validation/login");

router.post("/todo/register", (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (user) {
      const errors = {};
      errors.email = "User with this email already exist";
      res.status(400).json(errors);
    } else {
      const newUser = User({
        name,
        email,
        password
      });

      const newData = Data({
        todos: []
      });
      newData.save();

      bcrypt.genSalt((err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.todos = newData.id;

          newUser
            .save()
            .then(user => res.json({ success: "true" }))
            .catch(err => res.json(err));
        });
      });
    }
  });
});

router.post("/todo/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) {
      const errors = {};
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    bcrypt
      .compare(password, user.password)
      .then(isMatch => {
        if (!isMatch) {
          const errors = {};
          errors.password = "Invalid Password!!";
          return res.status(401).json(errors);
        }
        const payload = {
          email: user.email,
          name: user.name
        };
        jwt.sign(
          payload,
          Keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              console.log(err);
            } else {
              res.json({ msg: "Congratulation!!!", token: "Bearer " + token });
            }
          }
        );
      })
      .catch(err => console.log(err));
  });
});

module.exports = router;
