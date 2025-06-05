// Main application component for CloudNotes frontend.
// Handles layout and composition of all major UI components.

import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import Header from "./components/Header";
import AddNoteForm from "./components/AddNoteForm";
import SearchBar from "./components/SearchBar";
import NotesList from "./components/NotesList";
import EditNoteModal from "./components/EditNoteModal";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import ToastMessage from "./components/ToastMessage";
import Footer from "./components/Footer";
import styles from "./App.module.css";
import useNotes from "./hooks/useNotes";
import useAuth from "./hooks/useAuth";
import useToast from "./hooks/useToast";

function App() {
  // Local state for the add note form fields and search bar
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  // Custom hooks for toast notifications, notes CRUD, and authentication
  const { toast, setToast, handleToast } = useToast();
  const notesHook = useNotes(handleToast);
  const authHook = useAuth(handleToast);

  // Filter notes by category (case-insensitive)
  const filteredNotes = notesHook.notes.filter(note =>
    note.category.toLowerCase().includes(searchCategory.toLowerCase())
  );

  return (
    <div className={styles.background}>
      {/* App header with login/register buttons */}
      <Header
        onLogin={() => authHook.setShowLogin(true)}
        onRegister={() => authHook.setShowRegister(true)}
        userName={authHook.userName}
        onLogout={authHook.handleLogout}
      />
      <Container className="py-4">
        {/* Add Note Form - only show if user is logged in */}
        {authHook.userEmail && (
          <Card className={`mb-4 shadow-sm ${styles.cardRadius}`}>
            <Card.Body>
              <AddNoteForm
                title={title}
                setTitle={setTitle}
                category={category}
                setCategory={setCategory}
                description={description}
                setDescription={setDescription}
                addNote={() => {
                  notesHook.addNote(title, category, description);
                  setTitle("");
                  setCategory("");
                  setDescription("");
                }}
              />
            </Card.Body>
          </Card>
        )}

        {/* Search Bar - only show if user is logged in */}
        {authHook.userEmail && (
          <SearchBar
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
          />
        )}

        {/* Notes List or Empty State - only show if user is logged in */}
        {authHook.userEmail && (
          filteredNotes.length === 0 ? (
            <Card className={`text-center text-muted shadow-sm ${styles.noNotesCard}`}>
              <Card.Body>
                <Card.Title className={styles.noNotesTitle}>
                  No Notes
                </Card.Title>
                <Card.Text>
                  <span role="img" aria-label="sparkles" className={styles.sparkle}>
                    ✨
                  </span>
                  <br />
                  Start by adding your first note!
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <NotesList
              notes={filteredNotes}
              onEdit={(id, title, category, description) =>
                notesHook.startEdit(id, title, category, description)
              }
              onDelete={id => notesHook.deleteNote(id)}
            />
          )
        )}

        {/* Edit Note Modal */}
        <EditNoteModal
          show={!!notesHook.editingId}
          onHide={() => {
            notesHook.setEditingId(null);
            notesHook.setEditInput({ title: "", category: "", description: "" });
          }}
          editInput={notesHook.editInput}
          setEditInput={notesHook.setEditInput}
          onSave={notesHook.saveEdit}
        />

        {/* Login Modal */}
        <LoginModal
          show={authHook.showLogin}
          onHide={() => authHook.setShowLogin(false)}
          loginData={authHook.loginData}
          setLoginData={authHook.setLoginData}
          onLogin={authHook.handleLogin}
        />

        {/* Register Modal */}
        <RegisterModal
          show={authHook.showRegister}
          onHide={() => authHook.setShowRegister(false)}
          registerData={authHook.registerData}
          setRegisterData={authHook.setRegisterData}
          onRegister={authHook.handleRegister}
        />

        {/* Toast Notification */}
        <ToastMessage toast={toast} setToast={setToast} />
      </Container>
      {/* App Footer */}
      <Footer />

      {/* Message Card - Prompt user to log in if not authenticated */}
      {!authHook.userEmail && (
        <Card
          className={`mb-4 shadow ${styles.cardRadius} ${styles.welcomeCard}`}
        >
          <Card.Body className="text-center">
            <div className={styles.welcomeEmoji}>
              <span role="img" aria-label="cloud">☁️</span>
            </div>
            <Card.Title className={styles.welcomeTitle}>
              Welcome to CloudNotes!
            </Card.Title>
            <Card.Text className={styles.welcomeSubtitle}>
              Your notes, always in the cloud. Safe, simple, and accessible anywhere.
            </Card.Text>
            <Card.Text className={styles.welcomeText}>
              Sign up or log in to securely create, view, and manage your personal notes in the cloud.
            </Card.Text>
            <div>
              <button
                className={`btn btn-primary btn-lg me-2 ${styles.loginBtn}`}
                onClick={() => authHook.setShowLogin(true)}
              >
                Log In
              </button>
              <button
                className={`btn btn-outline-primary btn-lg ${styles.registerBtn}`}
                onClick={() => authHook.setShowRegister(true)}
              >
                Register
              </button>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default App;