// Modal component for editing an existing note.
// Handles input fields for title, category, and description, and calls onSave when saving changes.

import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "../App.module.css";

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
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title>Edit Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Title input */}
        <Form.Control
          className={`mb-2 ${styles.inputRadius}`}
          type="text"
          placeholder="Title"
          value={editInput.title || ""}
          onChange={(e) => setEditInput({ ...editInput, title: e.target.value })}
          autoFocus
        />
        {/* Category input */}
        <Form.Control
          className={`mb-2 ${styles.inputRadius}`}
          type="text"
          placeholder="Category"
          value={editInput.category || ""}
          onChange={(e) => setEditInput({ ...editInput, category: e.target.value })}
        />
        {/* Description textarea */}
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Description"
          value={editInput.description || ""}
          onChange={(e) => setEditInput({ ...editInput, description: e.target.value })}
          className={styles.inputRadius}
        />
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button variant="secondary" onClick={onHide} className={styles.cancelBtn}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={onSave}
          className={styles.saveBtn}
          disabled={
            !editInput.title || !editInput.category || !editInput.description
          }
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditNoteModal;