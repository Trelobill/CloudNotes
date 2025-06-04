// Component for the search bar used to filter notes by category.
// Calls setSearchCategory on input change.

/**
 * Props:
 * - searchCategory: current value of the search input
 * - setSearchCategory: setter for updating the search input
 */

import React from "react";
import { InputGroup, Form } from "react-bootstrap";

function SearchBar({ searchCategory, setSearchCategory }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "2rem",
      }}
    >
      <InputGroup style={{ maxWidth: 400, boxShadow: "0 2px 12px #6366f133", borderRadius: 16 }}>
        <InputGroup.Text
          style={{
            background: "linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)",
            color: "#fff",
            border: "none",
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          🔎 Category
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search notes by category..."
          value={searchCategory}
          onChange={e => setSearchCategory(e.target.value)}
          style={{
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            borderLeft: "none",
            fontWeight: 500,
            background: "#f4f8ff",
          }}
        />
      </InputGroup>
    </div>
  );
}

export default SearchBar;