const mongoose = require("mongoose");

const UserModel = mongoose.model("users", {
  name: { type: String },
  password: { type: String },
  email: { type: String },
});

module.exports = UserModel;
