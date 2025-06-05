// Component for the search bar used to filter notes by category.
// Calls setSearchCategory on input change.

import React from "react";
import { InputGroup, Form } from "react-bootstrap";
import styles from "../App.module.css";

/**
 * Props:
 * - searchCategory: current value of the search input
 * - setSearchCategory: setter for updating the search input
 */
function SearchBar({ searchCategory, setSearchCategory }) {
  return (
    <div className={styles.searchBarWrapper}>
      <InputGroup className={styles.searchInputGroup}>
        <InputGroup.Text className={styles.searchInputLabel}>
          🔎 Category
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search notes by category..."
          value={searchCategory}
          onChange={e => setSearchCategory(e.target.value)}
          className={styles.searchInput}
        />
      </InputGroup>
    </div>
  );
}

export default SearchBar;