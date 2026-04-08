import { api } from "./api.js";
import { state } from "./state.js";
import { renderNotesList } from "./components/notesList.js";
import { renderNoteEditor } from "./components/noteEditor.js";

async function loadNotes() {
    const result = await api.getNotes(state.page);
    console.log(result)
    state.setNotes(result.notes);
    renderSideBar();
}

async function selectNote(id){
    const note = await api.getNoteByID(id)
    state.selectedNote = note
    renderMain()
}

function renderSideBar(){
    const container = document.getElementById("notes-list")
    container.innerHTML = ""
    container.appendChild(renderNotesList(state.notes, selectNote));
}

function renderMain(){
    const container = document.getElementById("note-view")
    renderNoteEditor(state.selectedNote);
}

async function init(){
    await loadNotes();
    console.log("Initial notes loaded:", state);
    await selectNote(state.notes[0].id);
}

init()