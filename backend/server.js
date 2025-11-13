// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const contactRoutes = require("./routes/contactRoutes");
const adminAuthRoutes = require("./routes/adminAuth");




dotenv.config({ path: './.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminAuthRoutes);
// Fallback route
app.get( (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// MongoDB Connection

mongoose.connect(process.env.MONGO_URI) 
  .then(() => console.log(" MongoDB connected successfully"))
  .catch((err) => console.error(" MongoDB connection failed:", err));
              
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
