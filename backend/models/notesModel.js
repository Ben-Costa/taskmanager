const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbDir = path.join(__dirname, '../db');
const dbPath = path.join(dbDir, 'notes.db');

// Ensure database directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const notesModel = {
  // Get all notes
  getAllNotes: () => {
    const stmt = db.prepare('SELECT * FROM notes ORDER BY updated_at DESC');
    return stmt.all();
  },

  // Get a single note by ID
  getNoteById: (id) => {
    const stmt = db.prepare('SELECT * FROM notes WHERE id = ?');
    return stmt.get(id);
  },

  // Create a new note
  createNote: (title, content) => {
    const stmt = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)');
    const result = stmt.run(title, content);
    return result.lastInsertRowid;
  },

  // Update a note
  updateNote: (id, title, content) => {
    const stmt = db.prepare(
      'UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    );
    const result = stmt.run(title, content, id);
    return result.changes;
  },

  // Delete a note
  deleteNote: (id) => {
    const stmt = db.prepare('DELETE FROM notes WHERE id = ?');
    const result = stmt.run(id);
    return result.changes;
  }
};

module.exports = notesModel;
