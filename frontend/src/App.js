import React, { useState } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Navbar,
  Modal,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { PencilSquare, Trash, PlusCircle, PersonCircle, BoxArrowInRight, Sticky } from "react-bootstrap-icons";

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState({ title: "", category: "", description: "" });
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", bg: "" });
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ email: "", password: "", confirm: "" });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const handleToast = (message, bg = "success") => {
    setToast({ show: true, message, bg });
    setTimeout(() => setToast({ show: false, message: "", bg: "" }), 2000);
  };

  const addNote = () => {
    if (title.trim() && category.trim() && description.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          title,
          category,
          description,
        },
      ]);
      setTitle("");
      setCategory("");
      setDescription("");
      handleToast("Note added!", "success");
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    handleToast("Note deleted!", "danger");
  };

  const startEdit = (id, noteTitle, noteCategory, noteDescription) => {
    setEditingId(id);
    setEditInput({ title: noteTitle, category: noteCategory, description: noteDescription });
    setShowModal(true);
  };

  const saveEdit = () => {
    setNotes(
      notes.map((note) =>
        note.id === editingId
          ? { ...note, ...editInput }
          : note
      )
    );
    setEditingId(null);
    setEditInput({ title: "", category: "", description: "" });
    setShowModal(false);
    handleToast("Note updated!", "info");
  };

  // Placeholder handlers for login/register
  const handleLogin = (e) => {
    e.preventDefault();
    setShowLogin(false);
    handleToast("Logged in (demo only)", "success");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setShowRegister(false);
    handleToast("Registered (demo only)", "success");
  };

  const filteredNotes = notes.filter(note =>
    note.category.toLowerCase().includes(searchCategory.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)",
        paddingBottom: "60px",
      }}
    >
      <Navbar
        style={{
          background: "linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)",
        }}
        variant="dark"
        className="mb-4 shadow"
      >
        <Container>
          <Navbar.Brand style={{ fontWeight: 700, letterSpacing: 1 }}>
            <Sticky className="mb-1 me-2" size={28} />
            CloudNotes
          </Navbar.Brand>
          <div>
            <Button
              variant="outline-light"
              className="me-2"
              onClick={() => setShowLogin(true)}
              style={{ fontWeight: 500 }}
            >
              <BoxArrowInRight className="me-1" /> Login
            </Button>
            <Button
              variant="light"
              onClick={() => setShowRegister(true)}
              style={{ fontWeight: 500, color: "#6366f1" }}
            >
              <PersonCircle className="me-1" /> Register
            </Button>
          </div>
        </Container>
      </Navbar>
      <Container className="py-4">
        {/* Add Note Card */}
        <Card className="mb-4 shadow-sm" style={{ borderRadius: "18px" }}>
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
                  style={{ borderRadius: "12px" }}
                  className="me-2"
                />
                <Form.Control
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ borderRadius: "12px" }}
                />
              </InputGroup>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Write a description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-2"
                style={{ borderRadius: "12px" }}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addNote();
                  }
                }}
              />
              <Button
                type="submit"
                variant="primary"
                style={{
                  borderRadius: "12px",
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                disabled={!title || !category || !description}
              >
                <PlusCircle /> Add Note
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Beautiful Search Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <InputGroup style={{ maxWidth: 400, boxShadow: "0 2px 12px #6366f133", borderRadius: 16 }}>
            <InputGroup.Text
              style={{
                background: "linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)",
                color: "#fff",
                border: "none",
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              🔎 Category
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search notes by category..."
              value={searchCategory}
              onChange={e => setSearchCategory(e.target.value)}
              style={{
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
                borderLeft: "none",
                fontWeight: 500,
                background: "#f4f8ff",
              }}
            />
          </InputGroup>
        </div>

        {/* Notes List */}
        {filteredNotes.length === 0 ? (
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
        ) : (
          <Row xs={1} md={2} className="g-4">
            {filteredNotes.map((note) => (
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
                        onClick={() => startEdit(note.id, note.title, note.category, note.description)}
                        style={{ display: "flex", alignItems: "center", gap: 4 }}
                      >
                        <PencilSquare /> Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteNote(note.id)}
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
        )}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
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
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={saveEdit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Login Modal */}
        <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleLogin}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={loginData.email}
                  onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="Enter email"
                  autoFocus
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Password"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowLogin(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Register Modal */}
        <Modal show={showRegister} onHide={() => setShowRegister(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleRegister}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={registerData.email}
                  onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                  placeholder="Enter email"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={registerData.password}
                  onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={registerData.confirm}
                  onChange={e => setRegisterData({ ...registerData, confirm: e.target.value })}
                  placeholder="Confirm password"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowRegister(false)}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                Register
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <ToastContainer position="bottom-end" className="p-3">
          <Toast
            show={toast.show}
            bg={toast.bg}
            onClose={() => setToast({ ...toast, show: false })}
            delay={2000}
            autohide
          >
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
      <footer
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          background: "#6366f1",
          color: "#fff",
          textAlign: "center",
          padding: "10px 0",
          letterSpacing: 1,
          fontWeight: 500,
          fontSize: "1rem",
          zIndex: 100,
        }}
      >
        © {new Date().getFullYear()} CloudNotes
      </footer>
    </div>
  );
}

export default App;