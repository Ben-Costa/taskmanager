const db = require('../db');

module.exports = {
    async list({search, minDate, maxDate, sortBy, sortOrder, page, pageSize}){
       let sql = "SELECt * FROM notes";

       const params = [];
       const where = [];

       if (search){
            where.push('(title like ? or content like ?)');
            params.push(`%${search}%`, `%${search}%`);
       }

       if (minDate){
            where.push('DATE(created_date) >= DATE(?)');
            params.push(minDate);
       }

       if (maxDate){
            where.push('DATE(created_date) <= DATE(?)');
            params.push(maxDate);
       }

       if (where.length > 0){
            sql += ' WHERE ' + where.join(' AND ');
       }

       const validSortFields = ['created_date', 'modified_date', 'title'];
       if (sortBy && validSortFields.includes(sortBy)){
            sql += ` ORDER BY ${sortBy} ${sortOrder === 'asc' ? 'ASC' : 'DESC'}`;
       } else {
            sql += ' ORDER BY created_date DESC';
       }

       if (page && pageSize){
            const offset = (page - 1) * pageSize;
            sql += ` LIMIT ? OFFSET ?`;
            params.push(pageSize, offset);
       }

       const stmt = db.prepare(sql);
       return stmt.all(...params);
    },

    async count({search, minDate, maxDate}){
        let sql = 'SELECT COUNT(*) as count FROM notes';
        const params = [];
        const whereClauses = [];

        if (search){
            whereClauses.push('(title LIKE ? OR content LIKE ?)');
            params.push(`%${search}%`, `%${search}%`);
        }

        if (minDate){
            whereClauses.push('DATE(created_date) >= DATE(?)');
            params.push(minDate);
        }

        if (maxDate){
            whereClauses.push('DATE(created_date) <= DATE(?)');
            params.push(maxDate);
        }

        if (whereClauses.length > 0){
            sql += ' WHERE ' + whereClauses.join(' AND ');
        }

        const stmt = db.prepare(sql);
        return stmt.get(...params).count;
    },

    async getById(id){
        const stmt = db.prepare('SELECT * FROM notes WHERE id = ?');
        return stmt.get(id);
    },

    async create(title, content){
        const stmt = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)');
        const info = stmt.run(title, content);
        return this.getById(info.lastInsertRowid);
    },

    async update(id, title, content){
        const stmt = db.prepare('UPDATE notes SET title = ?, content = ?, modified_date = CURRENT_TIMESTAMP WHERE id = ?');
        stmt.run(title, content, id);
        return this.getById(id);
    },

    async delete(id){
        const stmt = db.prepare('DELETE FROM notes WHERE id = ?');
        stmt.run(id);
    },

    //relationship queries
    async getWithTasks(id){
        const stmt = db.prepare('SELECT t.* FROM tasks t JOIN note_tasks nt ON t.id = nt.task_id WHERE nt.note_id = ?');
        return stmt.all(id);
    },

    async getWithTags(id){
        const stmt = db.prepare('SELECT t.* FROM tags t JOIN note_tags nt ON t.id = nt.tag_id WHERE nt.note_id = ?');
        return stmt.all(id);
    },

    replaceTags(noteId, tagIds){
        const deleteStmt = db.prepare('DELETE FROM note_tags WHERE note_id = ?');
        deleteStmt.run(noteId);

        const insertStmt = db.prepare('INSERT INTO note_tags (note_id, tag_id) VALUES (?, ?)');
        const insertMany = db.transaction((tags) => {
            for (const tagId of tags){
                insertStmt.run(noteId, tagId);
            }
        });
        insertMany(tagIds);
    },

    getWithRelations(id){
        const note = this.getById(id);
        if (!note) return null;

        const tasks = this.getWithTasks(id);
        const tags = this.getWithTags(id);

        return {...note, tasks, tags};
    }
}
