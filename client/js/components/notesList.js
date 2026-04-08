export function renderNotesList(notes, onSelect){
    const container = document.createElement('div');
    container.className = "notes-list";

    notes.forEach(note => {
        const item = document.createElement("div");
        item.className = "note-item";
        item.innerHTML = `
        <div class="note-item-title">${note.title}</div>
        <div class="note-item-preview">${note.content.slice(0, 60)}...</div>
        `;

        item.addEventListener("click", () => onSelect(note.id));
        container.append(item);
    });

    return container;
    
}