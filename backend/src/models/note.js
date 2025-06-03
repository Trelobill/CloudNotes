const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: String }, // For future user support
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);