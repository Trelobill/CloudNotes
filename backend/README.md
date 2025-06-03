# CloudNotes Backend

This is the backend for the CloudNotes MERN application.

## Features

- REST API for notes (create, read, update, delete)
- MongoDB database connection
- User authentication (if implemented)
- Environment variables support via `.env`

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Create a `.env` file in `src/` with:
     ```
     MONGO_URI=mongodb://localhost:27017/cloudnotes
     PORT=5000
     ```

3. **Run the backend:**
   ```bash
   npm start
   ```

## Folder Structure

- `src/` - Source code
- `src/routes/` - API route handlers
- `src/models/` - Mongoose models

## API Endpoints

- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

---

For the frontend, see [`../frontend/README.md`](../frontend/README.md).