// Component for displaying a list of notes as cards.
// Renders each note with edit and delete actions.

/**
 * Props:
 * - notes: array of note objects to display
 * - onEdit: function to start editing a note (id, title, category, description)
 * - onDelete: function to delete a note (id)
 */

import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

function NotesList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <Card
        className="text-center text-muted shadow-sm"
        style={{
          borderRadius: "18px",
          background: "linear-gradient(135deg, #f0fdfa 0%, #e0e7ff 100%)",
          border: "1px dashed #38bdf8",
        }}
      >
        <Card.Body>
          <Card.Title style={{ color: "#0ea5e9", fontWeight: 600 }}>
            No Notes
          </Card.Title>
          <Card.Text>
            <span role="img" aria-label="sparkles" style={{ fontSize: 24 }}>
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
        <Col key={note.id}>
          <Card
            className="shadow-sm"
            style={{
              borderRadius: "16px",
              borderLeft: "6px solid #6366f1",
            }}
          >
            <Card.Body>
              <Card.Title style={{ fontWeight: 700 }}>{note.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-primary" style={{ fontWeight: 500 }}>
                {note.category}
              </Card.Subtitle>
              <Card.Text style={{ fontSize: "1.1rem" }}>
                {note.description}
              </Card.Text>
              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => onEdit(note._id, note.title, note.category, note.description)}
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <PencilSquare /> Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(note._id)}
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
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