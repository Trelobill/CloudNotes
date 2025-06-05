const mongoose = require("mongoose");

/**
 * User Schema
 * - username: The user's display name (required)
 * - email: The user's email address (required, unique)
 * - password: The user's hashed password (required)
 */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // User's name
  email: { type: String, required: true, unique: true }, // Must be unique
  password: { type: String, required: true }, // Hashed password
});

module.exports = mongoose.model("User", userSchema);