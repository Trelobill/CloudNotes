// Custom hook for managing notes CRUD logic and edit modal state.
// Handles adding, editing, deleting notes and edit modal input.

import { useState, useEffect } from "react";

export default function useNotes(handleToast) {
  // State for all notes
  const [notes, setNotes] = useState([]);

  // State for currently editing note (by id)
  const [editingId, setEditingId] = useState(null);

  // State for edit modal input fields
  const [editInput, setEditInput] = useState({ title: "", category: "", description: "" });

  const token = localStorage.getItem("token");

  // Fetch notes for the logged-in user
  const fetchNotes = async () => {
    if (!token) {
      setNotes([]);
      return;
    }
    const res = await fetch("http://localhost:5000/api/notes", {
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
  }, [token]);

  // Add a new note
  const addNote = async (title, category, description) => {
    const res = await fetch("http://localhost:5000/api/notes", {
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

  // Delete a note by id
  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotes(notes.filter((note) => note._id !== id));
    handleToast("Note deleted!", "danger");
  };

  // Start editing a note (open modal and set input)
  const startEdit = (id, noteTitle, noteCategory, noteDescription) => {
    setEditingId(id);
    setEditInput({ title: noteTitle, category: noteCategory, description: noteDescription });
  };

  // Save changes to the edited note
  const saveEdit = async () => {
    const res = await fetch(`http://localhost:5000/api/notes/${editingId}`, {
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