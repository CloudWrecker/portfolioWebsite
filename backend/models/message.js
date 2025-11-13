// models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true
  },
  message: {
    type: String,
    required: [true, "Message cannot be empty"],
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Message", messageSchema);
