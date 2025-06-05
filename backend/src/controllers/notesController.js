const Note = require("../models/Note");

/**
 * Get all notes for the authenticated user.
 * Returns: Array of notes
 */
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.json(notes);
  } catch (err) {
    console.error("Get notes error:", err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

/**
 * Create a new note for the authenticated user.
 * Expects: { title, category, description } in req.body
 * Returns: The created note
 */
exports.createNote = async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      userId: req.userId,
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error("Create note error:", err);
    res.status(500).json({ message: "Failed to add note" });
  }
};

/**
 * Update a note by ID for the authenticated user.
 * Expects: { title, category, description } in req.body
 * Returns: The updated note
 */
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    console.error("Update note error:", err);
    res.status(500).json({ message: "Failed to update note" });
  }
};

/**
 * Delete a note by ID for the authenticated user.
 * Returns: Success message
 */
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("Delete note error:", err);
    res.status(500).json({ message: "Failed to delete note" });
  }
};