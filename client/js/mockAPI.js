let mockNotes = [
    
    {
        id: 1,
        title: "Mock Note 1",
        content: "This is the content of mock note 1.",
        created_date: "2024-01-01T12:00:00Z",
        modified_date: "2024-01-01T12:00:00Z"
    },
    {
        id: 2,
        title: "Mock Note 2",
        content: "This is the content of mock note 2.",
        created_date: "2024-01-02T12:00:00Z",
        modified_date: "2024-01-02T12:00:00Z"
    },
    {
        id: 3,
        title: "Mock Note 3",
        content: "This is the content of mock note 3.",
        created_date: "2024-01-03T12:00:00Z",
        modified_date: "2024-01-03T12:00:00Z"
    }
]

export const mockAPI = {
    async getNotes(){
        return {notes: mockNotes, totalCount: mockNotes.length};
    },
    
    async getNoteByID(id){
        return mockNotes.find(note => note.id === id);
    },
    
    async createNote(title, body){
        const newNote = {
            id: mockNotes.length + 1,
            title,
            content: body,
            created_date: new Date().toISOString(),
            modified_date: new Date().toISOString()
        };
        mockNotes.push(newNote);
        return newNote;
    },

    async updateNote(id, title, body){
        const note = mockNotes.findIndex(note => note.id === id);
        if (note === -1) return null;
        mockNotes[note].title = title;
        mockNotes[note].content = body;
        mockNotes[note].modified_date = new Date().toISOString();
        return mockNotes[note];
    },

    async deleteNote(id){
        const noteIndex = mockNotes.findIndex(note => note.id === id);
        if (noteIndex === -1) return false;
        mockNotes.splice(noteIndex, 1);
        return true;
    }
}