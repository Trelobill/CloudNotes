// Component for the "Add Note" form.
// Handles input fields for title, category, and description, and calls addNote on submit.

import React from "react";
import { Card, Form, InputGroup, Button } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import styles from "../App.module.css";

/**
 * Props:
 * - title, setTitle: state and setter for note title
 * - category, setCategory: state and setter for note category
 * - description, setDescription: state and setter for note description
 * - addNote: function to add a new note
 */
function AddNoteForm({ title, setTitle, category, setCategory, description, setDescription, addNote }) {
  return (
    <Card className={`mb-4 shadow-sm ${styles.cardRadius}`}>
      <Card.Body>
        <Form
          onSubmit={e => {
            e.preventDefault();
            addNote();
          }}
        >
          <InputGroup className="mb-2">
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`me-2 ${styles.inputRadius}`}
            />
            <Form.Control
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.inputRadius}
            />
          </InputGroup>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Write a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`mb-2 ${styles.inputRadius}`}
            onKeyDown={e => {
              // Allow Enter+Shift for newlines, Enter alone submits
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                addNote();
              }
            }}
          />
          <Button
            type="submit"
            variant="primary"
            className={styles.addNoteBtn}
            disabled={!title || !category || !description}
          >
            <PlusCircle /> Add Note
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddNoteForm;