// Header component for the CloudNotes app.
// Displays the app brand and login/register buttons in the navbar.

import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { PersonCircle, BoxArrowInRight, Sticky } from "react-bootstrap-icons";
import styles from "../App.module.css";

/**
 * Props:
 * - onLogin: function to open the login modal
 * - onRegister: function to open the register modal
 * - userName: string, the logged-in user's name (if any)
 * - onLogout: function to log out the user
 */
function Header({ onLogin, onRegister, userName, onLogout }) {
  console.log("Header userName:", userName);
  return (
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
          {userName ? (
            <>
              <span className={styles.userName}>{userName}</span>
              <Button variant="outline-light" onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline-light"
                className="me-2"
                onClick={onLogin}
                style={{ fontWeight: 500 }}
              >
                <BoxArrowInRight className="me-1" /> Login
              </Button>
              <Button
                variant="light"
                onClick={onRegister}
                style={{ fontWeight: 500, color: "#6366f1" }}
              >
                <PersonCircle className="me-1" /> Register
              </Button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;