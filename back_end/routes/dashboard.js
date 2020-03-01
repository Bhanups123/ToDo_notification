const express = require("express");
const passport = require("passport");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Data = mongoose.model("Data");

// router.get(
//   "/todo/Dashboard",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const errors = {};
//     console.log(req.user);
//     User.find({ _id: { $ne: req.user.id } }).then(users => {
//       if (users) {
//         res.json(users);
//       } else {
//         errors.notFound = "Not found";
//         res.status(404).json(errors);
//       }
//     });
//   }
// );

//responding todos from db
router.get(
  "/todo/mytodos",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    User.findById(req.user._id)
      .populate("todos")
      .exec((err, user) => {
        if (user) {
          console.log(user);
          res.json(user.todos);
        } else {
          errors.UserNotFound = "user not found";
          res.status(404).json(errors);
        }
      });
  }
);

// //creating todos
// router.post(
//   "/todo/mytodos",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     User.findById(req.user._id)
//       .populate("todos")
//       .exec((err, user) => {
//         if (user) {
//           user.todos.todos.push("kmkn");
//           // user.todos.todos.splice(0, user.todos.todos.length, req.body.todos);
//           user.save().then(user => console.log(user));
//           res.json(user);
//         } else {
//           errors.UserNotFound = "user not found";
//           res.status(404).json(errors);
//         }
//       });
//   }
// );

//creating todos
router.post(
  "/todo/mytodos",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user._id).then(user => {
      if (user) {
        Data.findById(user.todos._id).then(data => {
          // data.todos.splice(0, data.todos.length, req.body.todos);
          data.todos = req.body.todos;
          data
            .save()
            .then()
            .catch();
        });
      } else {
        errors.UserNotFound = "user not found";
        res.status(404).json(errors);
      }
    });
  }
);

module.exports = router;
