const db = require('../db');

module.exports = {
    async list(){
        const stmt = db.prepare('SELECT * FROM tags');
        return stmt.all();
    },

    async getById(id){
        const stmt = db.prepare('SELECT * FROM tags WHERE id = ?');
        return stmt.get(id);
    },

    async create(name){
        const stmt = db.prepare('INSERT INTO tags (name) VALUES (?)');
        const info = stmt.run(name);
        return this.getById(info.lastInsertRowid);
    },

    async update(id, name){
        const stmt = db.prepare('UPDATE tags SET name = ?, modified_date = CURRENT_TIMESTAMP WHERE id = ?');
        stmt.run(name, id);
        return this.getById(id);
    },

    async delete(id){
        const stmt = db.prepare('DELETE FROM tags WHERE id = ?');
        stmt.run(id);
    },

    //relationship queries
    async getForNote(noteId){
        const stmt = db.prepare(`
            SELECT t.* FROM tags t 
            JOIN note_tags nt ON t.id = nt.tag_id
            WHERE nt.note_id = ?
        `);
        return stmt.all(noteId);
    },

    async addToNote(noteId, tagId){
        const stmt = db.prepare('INSERT OR IGNORE INTO note_tags (note_id, tag_id) VALUES (?, ?)');
        stmt.run(noteId, tagId);
    },
    
    async removeFromNote(noteId, tagId){
        const stmt = db.prepare('DELETE FROM note_tags WHERE note_id = ? AND tag_id = ?');
        stmt.run(noteId, tagId);
    }
};