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

// save notes to localStorage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

const generateNoteDOM = (note) => {
    const paragraph = document.createElement('p');

    if (note.title.length > 0) {
        paragraph.textContent = note.title;
    } else {
        paragraph.textContent = 'Unnamed note';
    }

    return paragraph;
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