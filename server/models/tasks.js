const db = require('../db');
const { create } = require('./notes');

/*schema 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATETIME,
    priority INTEGER,
    status TEXT,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified_date DATETIME DEFAULT CURRENT_TIMESTAMP
*/

module.exports = {
    list(){
        const stmt = db.prepare('SELECT * FROM tasks ORDER BY created_date DESC');
        return stmt.all();
    },

    getById(id){
        const stmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
        return stmt.get(id);
    },

    create(title, description, due_date, priority, status){
        const stmt = db.prepare('INSERT INTO tasks (title, description, due_date, priority, status) VALUES (?, ?, ?, ?, ?)');
        const info = stmt.run(title, description, due_date, priority, status);
        return this.getById(info.lastInsertRowid);
    },

    update(id, title, description){
        const stmt = db.prepare('UPDATE tasks SET title = ?, description = ?, modified_date = CURRENT_TIMESTAMP WHERE id = ?');
        stmt.run(title, description, id);
        return this.getById(id);
    },

    delete(id){
        const stmt = db.prepare('DELETE FROM tasks where id = ?');
        stmt.run(id);
    },

    // think this is not needed
    listByNotes(noteId){
        const stmt = db.prepare(`
            SELECT t.* FROM tasks t 
            JOIN note_tasks nt ON t.id = nt.task_id
            WHERE nt.note_id = ?
        `);
        return stmt.all(noteId);
    },

    markDone(id){
        const stmt = db.prepare('UPDATE tasks SET status = "done", modified_date = CURRENT_TIMESTAMP WHERE id = ?');
        stmt.run(id);
        return this.getById(id);
    },

    reorder(taskId, newOrder){
        const stmt = db.prepare('UPDATE tasks SET priority = ? WHERE id = ?');
        stmt.run(newOrder, taskId);
    }
};