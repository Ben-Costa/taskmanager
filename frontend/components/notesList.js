export function renderNotesList(notes, container, onEdit, onDelete) {
    if (!notes || notes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No notes yet. Create your first note above!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = notes.map(note => `
        <div class="note-card" data-id="${note.id}">
            <h3>${escapeHtml(note.title)}</h3>
            <p>${escapeHtml(note.content)}</p>
            <div class="note-card-meta">
                Created: ${formatDate(note.created_at)} | 
                Updated: ${formatDate(note.updated_at)}
            </div>
            <div class="note-card-actions">
                <button class="btn-edit" data-id="${note.id}">Edit</button>
                <button class="btn-delete" data-id="${note.id}">Delete</button>
            </div>
        </div>
    `).join('');

    // Attach event listeners
    container.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const noteId = e.target.dataset.id;
            const note = notes.find(n => n.id === parseInt(noteId, 10));
            if (note && onEdit) {
                onEdit(note);
            }
        });
    });

    container.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const noteId = e.target.dataset.id;
            if (onDelete && confirm('Are you sure you want to delete this note?')) {
                onDelete(noteId);
            }
        });
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}
