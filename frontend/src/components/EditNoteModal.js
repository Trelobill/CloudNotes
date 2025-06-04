// Modal component for editing an existing note.
// Handles input fields for title, category, and description, and calls onSave when saving changes.

import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

/**
 * Props:
 * - show: boolean, whether the modal is visible
 * - onHide: function to close the modal
 * - editInput: object with { title, category, description }
 * - setEditInput: setter for editInput fields
 * - onSave: function to save the edited note
 */
function EditNoteModal({ show, onHide, editInput, setEditInput, onSave }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          className="mb-2"
          type="text"
          placeholder="Title"
          value={editInput.title || ""}
          onChange={(e) => setEditInput({ ...editInput, title: e.target.value })}
          autoFocus
        />
        <Form.Control
          className="mb-2"
          type="text"
          placeholder="Category"
          value={editInput.category || ""}
          onChange={(e) => setEditInput({ ...editInput, category: e.target.value })}
        />
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Description"
          value={editInput.description || ""}
          onChange={(e) => setEditInput({ ...editInput, description: e.target.value })}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditNoteModal;