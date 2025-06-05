// Component for displaying toast notifications.
// Shows a message at the bottom-end of the screen and auto-hides after a delay.

import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import styles from "../App.module.css";

/**
 * Props:
 * - toast: object with { show, message, bg } for toast state
 * - setToast: setter to update toast state
 */
function ToastMessage({ toast, setToast }) {
  return (
    <ToastContainer position="bottom-end" className={`p-3 ${styles.toastContainer}`}>
      <Toast
        show={toast.show}
        bg={toast.bg}
        onClose={() => setToast({ ...toast, show: false })}
        delay={2000}
        autohide
        className={styles.toast}
      >
        <Toast.Body className={styles.toastBody}>{toast.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;