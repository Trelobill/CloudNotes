// Custom hook for managing notes CRUD logic and edit modal state.
// Handles adding, editing, deleting notes and edit modal input.

import { useState, useEffect } from "react";

/**
 * useNotes custom hook
 * @param {function} handleToast - Function to show toast notifications
 * @returns {object} - Notes state and CRUD handlers
 */
export default function useNotes(handleToast) {
  // State for all notes
  const [notes, setNotes] = useState([]);

  // State for currently editing note (by id)
  const [editingId, setEditingId] = useState(null);

  // State for edit modal input fields
  const [editInput, setEditInput] = useState({ title: "", category: "", description: "" });

  // Get JWT token from localStorage
  const token = localStorage.getItem("token");

  /**
   * Fetch notes for the logged-in user.
   * If no token, clear notes.
   */
  const fetchNotes = async () => {
    if (!token) {
      setNotes([]);
      return;
    }
    const res = await fetch("https://cloudnotes-backend.onrender.com/api/notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setNotes(data);
    } else {
      setNotes([]);
      handleToast("Failed to fetch notes", "danger");
    }
  };

  // Fetch notes when the hook is used or when token changes
  useEffect(() => {
    if (token) {
      fetchNotes();
    } else {
      setNotes([]);
    }
    // eslint-disable-next-line
  }, [token]);

  /**
   * Add a new note.
   * @param {string} title
   * @param {string} category
   * @param {string} description
   */
  const addNote = async (title, category, description) => {
    const res = await fetch("https://cloudnotes-backend.onrender.com/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, category, description }),
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);
    handleToast("Note added!", "success");
  };

  /**
   * Delete a note by id.
   * @param {string} id
   */
  const deleteNote = async (id) => {
    await fetch(`https://cloudnotes-backend.onrender.com/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotes(notes.filter((note) => note._id !== id));
    handleToast("Note deleted!", "danger");
  };

  /**
   * Start editing a note (open modal and set input).
   * @param {string} id
   * @param {string} noteTitle
   * @param {string} noteCategory
   * @param {string} noteDescription
   */
  const startEdit = (id, noteTitle, noteCategory, noteDescription) => {
    setEditingId(id);
    setEditInput({ title: noteTitle, category: noteCategory, description: noteDescription });
  };

  /**
   * Save changes to the edited note.
   */
  const saveEdit = async () => {
    const res = await fetch(`https://cloudnotes-backend.onrender.com/api/notes/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editInput),
    });
    const updatedNote = await res.json();
    setNotes(
      notes.map((note) =>
        note._id === editingId
          ? { ...note, ...updatedNote }
          : note
      )
    );
    setEditingId(null);
    setEditInput({ title: "", category: "", description: "" });
    handleToast("Note updated!", "info");
  };

  // Return all state and handlers for use in components
  return {
    notes,
    setNotes,
    editingId,
    setEditingId,
    editInput,
    setEditInput,
    addNote,
    deleteNote,
    startEdit,
    saveEdit,
    fetchNotes, // Expose fetchNotes to be used in components
  };
}