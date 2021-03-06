const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const removeElement = document.querySelector('#remove-note');
const lastEdited = document.querySelector('#last-edited');

// extract note id from URL hash and remove the '#' from the string
const noteId = location.hash.substring(1);

// retrieve notes stored in localStorage
let notes = getSavedNotes();

// find and store the current note object being edited
let note = notes.find((note) => note.id === noteId);

// if a note isn't found, redirect back to the home page
if (!note) {
    location.assign('/index.html');
}

titleElement.value = note.title;
bodyElement.value = note.body;
lastEdited.textContent = generateLastEdited(note.updatedAt);

titleElement.addEventListener('input', (event) => {
    // update note title as user types and save 
    note.title = event.target.value;
    note.updatedAt = moment();
    lastEdited.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
});

bodyElement.addEventListener('input', (event) => {
    // update note body as user types and save 
    note.body = event.target.value;
    note.updatedAt = moment().valueOf();
    lastEdited.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
});

removeElement.addEventListener('click', (event) => {
    // remove note, save notes and redirect back to home page
    removeNote(note.id);
    saveNotes(notes);
    location.assign('/index.html');
});

window.addEventListener('storage', (event) => {
    if (event.key === 'notes') {
        notes = JSON.parse(event.newValue)
    }
    note = notes.find((note) => {
        return note.id === noteId;
    });
    
    // if a note isn't found, redirect back to the home page
    if (!note) {
        location.assign('/index.html');
    }
    
    titleElement.value = note.title;
    bodyElement.value = note.body;
    lastEdited.textContent = generateLastEdited(note.updatedAt);
});
