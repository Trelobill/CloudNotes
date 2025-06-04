// Component for displaying toast notifications.
// Shows a message at the bottom-end of the screen and auto-hides after a delay.

 /**
  * Props:
  * - toast: object with { show, message, bg } for toast state
  * - setToast: setter to update toast state
  */

import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function ToastMessage({ toast, setToast }) {
  return (
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
  );
}

export default ToastMessage;