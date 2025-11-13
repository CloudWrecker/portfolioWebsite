/*const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// POST: Admin login check
router.post("/login", (req, res) => {
  const { password } = req.body;

  if(password === ADMIN_PASSWORD){
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Incorrect password" });
  }
});

module.exports = router;
*/


const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const dotenv = require("dotenv");
dotenv.config();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// 📩 POST - Save new contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// 📋 GET - Fetch all messages (for admin)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// ❌ DELETE - Delete a message (password required)
router.delete("/:id", async (req, res) => {
  try {
    const adminPass = req.headers["x-admin-password"];

    if (adminPass !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized: Incorrect admin password" });
    }

    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
});

module.exports = router;
