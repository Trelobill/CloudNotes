const express = require("express");
const router = express.Router();
const Note = require("../models/note");

// Get all notes
router.get("/", async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

// Add a note
router.post("/", async (req, res) => {
  const note = new Note({ text: req.body.text });
  await note.save();
  res.status(201).json(note);
});

// Edit a note
router.put("/:id", async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true });
  res.json(note);
});

// Delete a note
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;