'use strict';

let notes = getSavedNotes();

const filters = {
    searchText: ''
};

renderNotes(notes, filters);


document.querySelector('#create-note').addEventListener('click', e => {
    const id = uuidv4();
    // add new note object to notes array
    notes.push({
        id: id,
        title: '',
        body: ''
    });

    saveNotes();

    // redirect to edit page
    location.assign(`/edit.html#${id}`);
});


document.querySelector('#search-text').addEventListener('input', e => {
    filters.searchText = e.target.value.toLowerCase();
    renderNotes(notes, filters);
});

document.querySelector('#filter-by').addEventListener('change', e => {
    console.log(e.target.value);
});
