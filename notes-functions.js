// check for, and read existing saved data in localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes');

    // if there was saved data in localStorage, return it.. otherwise return empty array
    return notesJSON !== null ? JSON.parse(notesJSON) : [];
};

// remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id);

    // if no note was found above, noteIndex would contain -1. If a note was found, noteIndex contains its position
    // and we will delete it
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
    }
}

// save notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

const generateNoteDOM = (note) => {
    const noteEl = document.createElement('div');
    const textEl = document.createElement('a');
    const button = document.createElement('button');

    
    // setup the remove note button
    button.textContent = 'x';
    noteEl.appendChild(button);
    button.addEventListener('click', (event) => {
        removeNote(note.id);
        saveNotes(notes);
        renderNotes(notes, filters);
    });

    // setup note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title;
    } else {
        textEl.textContent = 'Unnamed note';
    }
    textEl.setAttribute('href', `/edit.html#${note.id}`);
    noteEl.appendChild(textEl);

    return noteEl;
};

// sort notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (b.updatedAt > a.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        });

    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (b.createdAt > a.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });

    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (b.title.toLowerCase() < a.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        });

    } else {
        return notes;
    }
}

// render application notes
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy);
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    // reset the HTML contents so notes don't continuously stack
    document.querySelector('.notes').innerHTML = '';

    // render found notes to the DOM
    filteredNotes.forEach(note => {
        const noteElement = generateNoteDOM(note);
        document.querySelector('.notes').appendChild(noteElement);
    });
}

// generate the last edited message display
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`;
