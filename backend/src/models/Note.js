const mongoose = require("mongoose");

/**
 * Note Schema
 * - title: The note's title (required)
 * - category: The note's category (required)
 * - description: The note's content (required)
 * - userId: Reference to the user who owns the note (required)
 * - timestamps: Automatically adds createdAt and updatedAt fields
 */
const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);