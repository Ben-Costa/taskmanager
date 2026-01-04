const express = require('express');
const router = express.Router();
const notesModel = require('../models/notesModel');

// GET all notes
router.get('/', (req, res) => {
  try {
    const notes = notesModel.getAllNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single note by ID
router.get('/:id', (req, res) => {
  try {
    const note = notesModel.getNoteById(req.params.id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new note
router.post('/', (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const noteId = notesModel.createNote(title, content);
    const newNote = notesModel.getNoteById(noteId);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT (update) a note
router.put('/:id', (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const changes = notesModel.updateNote(req.params.id, title, content);
    if (changes > 0) {
      const updatedNote = notesModel.getNoteById(req.params.id);
      res.json(updatedNote);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a note
router.delete('/:id', (req, res) => {
  try {
    const changes = notesModel.deleteNote(req.params.id);
    if (changes > 0) {
      res.json({ message: 'Note deleted successfully' });
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
