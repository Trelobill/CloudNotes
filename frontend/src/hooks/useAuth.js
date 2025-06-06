// Custom hook for authentication modal state and logic (login/register).
// Handles showing/hiding modals, form state, and authentication actions.

import { useState } from "react";

/**
 * useAuth custom hook
 * @param {function} handleToast - Function to show toast notifications
 * @returns {object} - Auth state and handlers
 */
export default function useAuth(handleToast) {
  // State for showing/hiding login and register modals
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // State for login form fields
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // State for register form fields
  const [registerData, setRegisterData] = useState({ username: "", email: "", password: "", confirmPassword: "" });

  // State for user email and name (persisted in localStorage)
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email") || "");
  const [userName, setUserName] = useState(localStorage.getItem("username") || "");

  /**
   * Handles login form submission.
   * Sends credentials to backend and stores token/user info on success.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://cloudnotes-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", loginData.email);
        localStorage.setItem("username", data.username);
        setUserEmail(loginData.email);
        setUserName(data.username);
        setShowLogin(false);
        handleToast("Logged in!", "success");
      } else {
        handleToast(data.message || "Login failed", "danger");
      }
    } catch (err) {
      handleToast(err.message ? `Server error: ${err.message}` : "Server error", "danger");
    }
  };

  /**
   * Handles register form submission.
   * Sends registration data to backend and stores token/user info on success.
   */
  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      handleToast("Passwords do not match", "danger");
      return;
    }
    try {
      const res = await fetch("https://cloudnotes-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        setUserName(data.username);
        setUserEmail(data.email);
        setShowRegister(false);
        handleToast("Registered and logged in!", "success");
      } else {
        handleToast(data.message || "Registration failed", "danger");
      }
    } catch (err) {
      handleToast(err.message ? `Server error: ${err.message}` : "Server error", "danger");
    }
  };

  /**
   * Handles user logout.
   * Clears user info from localStorage and state.
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    setUserEmail("");
    setUserName("");
    handleToast("Logged out", "info");
  };

  // Return all state and handlers for use in components
  return {
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,
    loginData,
    setLoginData,
    registerData,
    setRegisterData,
    handleLogin,
    handleRegister,
    userEmail,
    userName,
    handleLogout,
  };
}