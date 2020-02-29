const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  todos: []
});

module.exports = Data = mongoose.model("Data", dataSchema);
