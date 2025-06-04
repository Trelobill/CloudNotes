// Modal component for user registration.
// Displays a form for email, password, and confirm password, and calls onRegister on submit.

import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

/**
 * Props:
 * - show: boolean, whether the modal is visible
 * - onHide: function to close the modal
 * - registerData: object with { email, password, confirm }
 * - setRegisterData: setter for registerData fields
 * - onRegister: function to handle register form submission
 */
function RegisterModal({ show, onHide, registerData, setRegisterData, onRegister }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onRegister}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="registerUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={registerData.username}
              onChange={e => setRegisterData({ ...registerData, username: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={registerData.email}
              onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registerPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registerConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={e => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="success" type="submit">
            Register
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default RegisterModal;