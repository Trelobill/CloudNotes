const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

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

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT || 5000, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT || 5000}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
