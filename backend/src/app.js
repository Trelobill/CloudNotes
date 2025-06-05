const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const path = require("path");

const notesRouter = require("./routes/notes");
const authRouter = require("./routes/auth");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Notes API routes (protected)
app.use("/api/notes", notesRouter);

// Auth API routes (register, login)
app.use("/api/auth", authRouter);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

var __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // Handle React routing, return all requests to React app
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT || 5000}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
