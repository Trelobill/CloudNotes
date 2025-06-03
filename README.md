# CloudNotes

CloudNotes is a full-stack MERN (MongoDB, Express, React, Node.js) application for creating, organizing, and managing notes in the cloud.

## Features

- Add, edit, delete, and search notes by category
- Dark mode toggle
- Responsive, modern UI
- Backend REST API with MongoDB
- Environment variable support
- Easy setup for local development

## Project Structure

```
CloudNotes/
│
├── backend/      # Express + MongoDB backend
│   └── src/
│   └── README.md
│
├── frontend/     # React frontend
│   └── src/
│   └── README.md
│
├── .gitignore
├── README.md     # (this file)
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd CloudNotes
```

### 2. Setup the backend

```bash
cd backend
npm install
# Create src/.env with your MongoDB URI and PORT
npm start
```

### 3. Setup the frontend

```bash
cd ../frontend
npm install
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:5000](http://localhost:5000) by default.

## More Info

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

---

**Made with ❤️ using the MERN stack**