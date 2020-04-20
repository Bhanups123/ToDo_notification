const express = require("express");
const passport = require("passport");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Data = mongoose.model("Data");
const mailjet = require("node-mailjet").connect(
  "bfee651185b50ceb1b055390b5beca13",
  "d7fead11096aa3779a83a33a8e31bbb8"
);

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
          console.log("SDvxc", req.user);
          data
            .save()
            .then()
            .catch();
          const request = mailjet.post("send", { version: "v3.1" }).request({
            Messages: [
              {
                From: {
                  Email: "sbhanupratap161@gmail.com",
                  Name: "Bhanu"
                },
                To: [
                  {
                    Email: req.user.email,
                    Name: req.user.name
                  }
                ],
                Subject: "Reminder from ToDo...",
                TextPart: "Xvxcvcxvxc",
                HTMLPart:
                  "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                CustomID: "AppGettingStartedTest"
              }
            ]
          });
          request
            .then(result => {
              console.log(result.body);
            })
            .catch(err => {
              console.log("fdgdgd", err);
            });
        });
      } else {
        errors.UserNotFound = "user not found";
        res.status(404).json(errors);
      }
    });
  }
);

module.exports = router;
