export function renderNoteEditor(selectedNote) {
  console.log("Rendering note editor for note:", selectedNote);

  // Title input
  const titleInput = document.getElementById("note-title-input");
  titleInput.value = selectedNote.title ?? "";

  // Content textarea
  const contentInput = document.getElementById("note-content-input");
  contentInput.value = selectedNote.content ?? selectedNote.body ?? "";

  // Tasks will be handled separately in your tasks component
}
