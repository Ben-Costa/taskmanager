export const state = {
    notes: [],
    selectedNote: null,
    page: 1,


    setNotes(notes) {
        this.notes = notes;
    },

    setSelectedNote(note) {
        this.selectedNote = note;
    }

};