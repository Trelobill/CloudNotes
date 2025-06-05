// Modal component for user login.
// Displays a form for email and password, and calls onLogin on submit.

import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "../App.module.css";

/**
 * Props:
 * - show: boolean, whether the modal is visible
 * - onHide: function to close the modal
 * - loginData: object with { email, password }
 * - setLoginData: setter for loginData fields
 * - onLogin: function to handle login form submission
 */
function LoginModal({ show, onHide, loginData, setLoginData, onLogin }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onLogin}>
        <Modal.Body>
          {/* Email input */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={loginData.email}
              onChange={e => setLoginData({ ...loginData, email: e.target.value })}
              placeholder="Enter email"
              autoFocus
              className={styles.inputRadius}
            />
          </Form.Group>
          {/* Password input */}
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={loginData.password}
              onChange={e => setLoginData({ ...loginData, password: e.target.value })}
              placeholder="Password"
              className={styles.inputRadius}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button variant="secondary" onClick={onHide} className={styles.cancelBtn}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className={styles.loginBtn}>
            Login
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default LoginModal;