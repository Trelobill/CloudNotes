// Custom hook for managing toast (notification) state and logic.
// Handles showing and hiding toast messages with different backgrounds.

import { useState } from "react";

export default function useToast() {
  // State for toast message, visibility, and background color
  const [toast, setToast] = useState({ show: false, message: "", bg: "" });

  // Show a toast with a message and background color, then auto-hide after 2s
  const handleToast = (message, bg = "success") => {
    setToast({ show: true, message, bg });
    setTimeout(() => setToast({ show: false, message: "", bg: "" }), 2000);
  };

  return { toast, setToast, handleToast };
}