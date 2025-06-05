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
  return (
    <Navbar
      className={`mb-4 shadow ${styles.headerNavbar}`}
      variant="dark"
    >
      <Container>
        <Navbar.Brand className={styles.brand}>
          <Sticky className="mb-1 me-2" size={28} />
          CloudNotes <span className={styles.brandEmoji}>☁️</span>
        </Navbar.Brand>
        <div>
          {userName ? (
            <>
              <span className={styles.userName}>{userName}</span>
              <Button
                variant="outline-light"
                onClick={onLogout}
                className={styles.logoutBtn}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="btn btn-primary"
                className={`me-2 ${styles.loginBtn}`}
                onClick={onLogin}
              >
                <BoxArrowInRight className="me-1" /> Login
              </Button>
              <Button
                variant="light"
                onClick={onRegister}
                className={styles.registerBtn}
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