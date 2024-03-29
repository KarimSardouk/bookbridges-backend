const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  userRole:{
    type: String,
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
//done with this part, no modifications should be done here
