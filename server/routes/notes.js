const express = require('epxress');
const db = require('../db');
const notesModel = require('../models/notes');
const {
    NoteCreateInput,
    NoteUpdateInput,
    NoteQueryParams
} = require('../schema/notes.schema');
const router = express.Router();

// GET api/v1/notes - list with pagination, search, filter, sort
router.get('/', async (req, res) => {
    try {
        const filters = NoteQueryParams.parse(req.query);
        const notes = await notesModel.list({search, minDate, maxDate, sortBy, sortOrder, page: Number(page), pageSize: Number(pageSize)});
        const totalCount = await notesModel.count({search, minDate, maxDate});
        res.json({notes, totalCount});
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

// GET api/v1/notes/:id - get by id (tasks and tags included)
router.get('/:id', async (req, res) => {
    try {
        const noteID = Number(req.params.id);
        const note = await notesModel.getWithRelations(noteID);
        if (!note){
            return res.status(404).json({error: 'Note not found'});
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

// POST api/v1/notes/ - create
router.post('/', async (req, res) => {
    try {
        const title = req.body.title;
        const body = req.body.body;
        const created = await notesModel.create(title, body);
        res.status(201).json(created)
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
})

// PUT api/v1/notes/:id - update
router.put('/:id', async (req, res) => {
    try {
        const noteID = Number(req.params.id);
        const title = req.body.title;
        const body = req.body.body;
        const updated = await notesModel.update(noteID, title, body);
        res.json(updated);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
})

// DELETE api/v1/notes/:id - delete
router.delete('/:id', async (req, res) => {
    try {
        const noteID = Number(req.params.id);
        const deleted = await notesModel.delete(noteID);
        if (!deleted) {
            return res.status(404).json({error: 'Note not found'});
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

//TODO: see if needed
// PUT api/v1/notes/:id/tasks - update tasks for a note (add/remove/reorder)
// PUT api/v1/notes/:id/tags - update tags for a note (add/remove)