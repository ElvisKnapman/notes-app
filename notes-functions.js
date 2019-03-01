// check for, and read existing saved data in localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes');

    // if there was saved data in localStorage, return it
    if (notesJSON !== null) {
       return JSON.parse(notesJSON);
    } else {
        return [];
    }
};

// remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex(function(note) {
        return note.id === id;
    });

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

// render application notes
const renderNotes = (notes, filters) => {
    const filteredNotes = notes.filter(note => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    // reset the HTML contents so notes don't continuously stack
    document.querySelector('.notes').innerHTML = '';

    // render found notes to the DOM
    filteredNotes.forEach(note => {
        const noteElement = generateNoteDOM(note);
        document.querySelector('.notes').appendChild(noteElement);
    });
}

// generate the last edited message display
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}
