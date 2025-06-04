const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const auth = require("../middleware/auth"); // <-- import the middleware

router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ userId: req.userId });
  res.json(notes);
});

router.post("/", auth, async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      userId: req.userId,
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to add note" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to update note" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete note" });
  }
});

module.exports = router;