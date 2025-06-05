// Component for displaying a list of notes as cards.
// Renders each note with edit and delete actions.

import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import styles from "../App.module.css";

/**
 * Props:
 * - notes: array of note objects to display
 * - onEdit: function to start editing a note (id, title, category, description)
 * - onDelete: function to delete a note (id)
 */
function NotesList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <Card className={`text-center text-muted shadow-sm ${styles.emptyCard}`}>
        <Card.Body>
          <Card.Title className={styles.emptyTitle}>No Notes</Card.Title>
          <Card.Text>
            <span role="img" aria-label="sparkles" className={styles.sparkleEmoji}>
              ✨
            </span>
            <br />
            Start by adding your first note!
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Row xs={1} md={2} className="g-4">
      {notes.map((note) => (
        <Col key={note._id || note.id}>
          <Card className={`shadow-sm ${styles.noteCard}`}>
            <Card.Body>
              <Card.Title className={styles.noteTitle}>{note.title}</Card.Title>
              <Card.Subtitle className={`mb-2 text-primary ${styles.noteCategory}`}>
                {note.category}
              </Card.Subtitle>
              <Card.Text className={styles.noteDescription}>{note.description}</Card.Text>
              <div className={styles.noteActions}>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => onEdit(note._id, note.title, note.category, note.description)}
                  className={styles.editBtn}
                >
                  <PencilSquare /> Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(note._id)}
                  className={styles.deleteBtn}
                >
                  <Trash /> Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default NotesList;