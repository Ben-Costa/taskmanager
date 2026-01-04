import { renderNotesList } from './components/notesList.js';

const API_BASE_URL = '/api/notes';

// State management
let currentEditingNoteId = null;

// DOM elements
const noteForm = document.getElementById('noteForm');
const noteTitleInput = document.getElementById('noteTitle');
const noteContentInput = document.getElementById('noteContent');
const notesListContainer = document.getElementById('notesList');

// API functions
async function fetchNotes() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch notes');
        return await response.json();
    } catch (error) {
        console.error('Error fetching notes:', error);
        return [];
    }
}

async function createNote(title, content) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });
        if (!response.ok) throw new Error('Failed to create note');
        return await response.json();
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
}

async function updateNote(id, title, content) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });
        if (!response.ok) throw new Error('Failed to update note');
        return await response.json();
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
}

async function deleteNote(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete note');
        return await response.json();
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
}

// UI functions
async function loadAndDisplayNotes() {
    notesListContainer.innerHTML = '<div class="loading">Loading notes...</div>';
    const notes = await fetchNotes();
    renderNotesList(notes, notesListContainer, handleEdit, handleDelete);
}

function handleEdit(note) {
    currentEditingNoteId = note.id;
    noteTitleInput.value = note.title;
    noteContentInput.value = note.content;
    
    const submitButton = noteForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Update Note';
    submitButton.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    
    noteTitleInput.focus();
}

async function handleDelete(noteId) {
    await deleteNote(noteId);
    await loadAndDisplayNotes();
}

function resetForm() {
    noteForm.reset();
    currentEditingNoteId = null;
    
    const submitButton = noteForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Add Note';
    submitButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}

// Event listeners
noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = noteTitleInput.value.trim();
    const content = noteContentInput.value.trim();
    
    if (!title || !content) {
        alert('Please fill in both title and content');
        return;
    }
    
    try {
        if (currentEditingNoteId) {
            await updateNote(currentEditingNoteId, title, content);
        } else {
            await createNote(title, content);
        }
        
        resetForm();
        await loadAndDisplayNotes();
    } catch (error) {
        alert('Error saving note. Please try again.');
    }
});

// Initialize app
loadAndDisplayNotes();
