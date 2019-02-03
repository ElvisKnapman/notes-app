'use strict';

let notes = getSavedNotes();

const filters = {
    searchText: ''
};

renderNotes(notes, filters);


document.querySelector('button').addEventListener('click', e => {
    // add new note object to notes array
    notes.push({
        title: '',
        body: ''
    });

    saveNotes();

    // render notes to the page
    renderNotes(notes, filters);
});


document.querySelector('#search-text').addEventListener('input', e => {
    filters.searchText = e.target.value.toLowerCase();
    renderNotes(notes, filters);
});

document.querySelector('#filter-by').addEventListener('change', e => {
    console.log(e.target.value);
});
