# Task Manager

A simple and elegant task manager application built with Node.js, Express, and SQLite. This application allows you to create, read, update, and delete notes.

## Project Structure

```
project-root/
│
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── db/
│   │   ├── notes.db
│   │   └── migrations/
│   ├── routes/
│   │   └── notes.js
│   └── models/
│       └── notesModel.js
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── components/
│       └── notesList.js
│
└── README.md
```

## Features

- ✨ Create new notes with title and content
- 📝 View all your notes in a beautiful interface
- ✏️ Edit existing notes
- 🗑️ Delete notes you no longer need
- 💾 Persistent storage using SQLite database
- 🎨 Modern and responsive UI design

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - better-sqlite3 (SQLite database)
  - CORS middleware

- **Frontend:**
  - Vanilla JavaScript (ES6 modules)
  - HTML5
  - CSS3

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taskmanager
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Usage

1. **Adding a Note:** Fill in the title and content fields, then click "Add Note"
2. **Editing a Note:** Click the "Edit" button on any note, modify the content, and click "Update Note"
3. **Deleting a Note:** Click the "Delete" button on any note and confirm the deletion

## Database

The application uses SQLite for data persistence. The database file (`notes.db`) is automatically created in the `backend/db/` directory when you first run the application.

## License

ISC