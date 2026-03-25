const express = require('epxress');
const db = require('../db');
const notesModel = require('../models/tags');

const router = express.Router();

// GET api/v1/tags
router.get('/', async (req, res) => {
    try {
        const tags = await tagsModel.list();
        res.json(tags);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

// GET api/v1/tags/:id
router.get('/:id', async (req, res) => {
    try {
        const tagID = Number(req.params.id);
        const tag = await tagsModel.getById(tagID);
        if (!tag){
            return res.status(404).json({error: 'Tag not found'});
        }
        res.json(tag);
    }
    catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
})
// POST api/v1/tags/
router.post('/', async (req, res) => {
    try {
        const newTag = await tagsModel.create(req.body);
        res.status(201).json(newTag);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

// PUT api/v1/tags/:id
router.put('/:id', async (req, res) => {
    try {
        const tagID = Number(req.params.id);
        const updatedTag = await tagsModel.update(tagID, req.body);
        res.json(updatedTag);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

// DELETE api/v1/tags/:id
router.delete('/:id', async (req, res) => {
    try {
        const tagID = Number(req.params.id);
        await tagsModel.delete(tagID);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});


// POST api/v1/tags/:id/done
router.post('/:id/done', async (req, res) => {
    try {
        const tagID = Number(req.params.id);
        const updatedTag = await tagsModel.markDone(tagID);
        res.json(updatedTag);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;