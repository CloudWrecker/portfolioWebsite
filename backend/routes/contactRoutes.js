
// routes/contactRoutes.js
const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

// POST: Save a message
router.post("/", async (req, res) => {
  try {
    console.log("📨 Received contact form data:", req.body);
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message received successfully!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ 
      success: false,
      error: "server error try again later." });
  }
});

// GET: Retrieve all messages (admin)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 }); // newest first
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Server error" });
  }
});
/*
// DELETE: Delete a message by ID (admin)
router.delete("/:id", async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Server error" });
  }
});
*/

// In contactRoutes.js - update the DELETE route
router.delete("/:id", async (req, res) => {
  try {
    const adminPass = req.headers["x-admin-password"];
    
    // Add admin password check
    if (adminPass !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized: Incorrect admin password" });
    }

    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;






