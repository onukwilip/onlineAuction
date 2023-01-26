const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  image: String,
  authenticated: {
    type: Boolean,
    required: true,
  },
  auth: {
    code: { type: Number, required: true },
    expiry: { type: Date, required: true },
  },
});

module.exports = mongoose.models.Users || mongoose.model("Users", userModel);
