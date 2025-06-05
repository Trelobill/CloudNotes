const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const notesController = require("../controllers/notesController");

router.get("/", auth, notesController.getNotes);
router.post("/", auth, notesController.createNote);
router.put("/:id", auth, notesController.updateNote);
router.delete("/:id", auth, notesController.deleteNote);

module.exports = router;