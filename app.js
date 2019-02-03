'use strict';

let notes = [];

const filters = {
    searchText: ''
};

// check for existing saved data in local storage
const notesJSON = localStorage.getItem('notes');

if (notesJSON !== null) {
    notes = JSON.parse(notesJSON);
}


const renderNotes = (notes, filters) => {
    const filteredNotes = notes.filter(note => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    document.querySelector('.notes').innerHTML = '';
    // render found notes to the DOM
    filteredNotes.forEach(note => {
        const paragraph = document.createElement('p');
        paragraph.textContent = note.title;
        document.querySelector('.notes').appendChild(paragraph);
    });
}

renderNotes(notes, filters);


const createNote = document.querySelector('button');
createNote.addEventListener('click', event => {
    notes.push({
        title: '',
        body: ''
    });

    // update local storage
    localStorage.setItem('notes', JSON.stringify(notes));
});


document.querySelector('#search-text').addEventListener('input', e => {
    filters.searchText = e.target.value.toLowerCase();
    renderNotes(notes, filters);
});

document.querySelector('#filter-by').addEventListener('change', e => {
    console.log(e.target.value);
});
