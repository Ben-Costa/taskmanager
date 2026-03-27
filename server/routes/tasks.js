const express = require('express');
const db = require('../db');
const notesModel = require('../models/tasks');

const router = express.Router();

// GET api/v1/tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await notesModel.list();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

// GET api/v1/tasks/:id
router.get('/:id', async (req, res) => {
    try {
        const taskID = Number(req.params.id);
        const task = await notesModel.getById(taskID);
        if (!task){
            return res.status(404).json({error: 'Task not found'});
        }
        res.json(task);
    }
    catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
})
// POST api/v1/tasks/
router.post('/', async (req, res) => {
    try {
        const newTask = await notesModel.create(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

// PUT api/v1/tasks/:id
router.put('/:id', async (req, res) => {
    try {
        const taskID = Number(req.params.id);
        const updatedTask = await notesModel.update(taskID, req.body);
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

// DELETE api/v1/tasks/:id
router.delete('/:id', async (req, res) => {
    try {
        const taskID = Number(req.params.id);
        await notesModel.delete(taskID);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});


// POST api/v1/tasks/:id/done
router.post('/:id/done', async (req, res) => {
    try {
        const taskID = Number(req.params.id);
        const updatedTask = await notesModel.markDone(taskID);
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});


module.exports = router;

//TODO
// POST api/v1/tasks/:id/reorder