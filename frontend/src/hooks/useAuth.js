// Custom hook for authentication modal state and logic (login/register).
// Handles showing/hiding modals and form state for authentication.

import { useState } from "react";

export default function useAuth(handleToast) {
  // State for showing/hiding login and register modals
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // State for login form fields
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // State for register form fields
  const [registerData, setRegisterData] = useState({ username: "", email: "", password: "" });

  // State for user email
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email") || "");

  // State for user name
  const [userName, setUserName] = useState(localStorage.getItem("username") || "");

  // Handles login form submission (demo only)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", loginData.email);
        localStorage.setItem("username", data.username); // <-- use backend username
        setUserEmail(loginData.email);
        setUserName(data.username); // <-- use backend username
        setShowLogin(false);
        handleToast("Logged in!", "success");
      } else {
        handleToast(data.message || "Login failed", "danger");
      }
    } catch {
      handleToast("Server error", "danger");
    }
  };

  // Handles register form submission (demo only)
  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      handleToast("Passwords do not match", "danger");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
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
    } catch {
      handleToast("Server error", "danger");
    }
  };

  // Add a logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    setUserEmail("");
    setUserName("");
    handleToast("Logged out", "info");
  };

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