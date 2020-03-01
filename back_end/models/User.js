const mongoose = require("mongoose");
//const Data = mongoose.model("Data");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
    // select: false //for not responding in find()
  },
  date: {
    type: Date,
    default: Date.now
  },
  todos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Data"
  }
});

module.exports = User = mongoose.model("User", userSchema);
