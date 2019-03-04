'use strict';

let notes = getSavedNotes();

const filters = {
    searchText: '',
    sortBy: 'byEdited'
};

renderNotes(notes, filters);


document.querySelector('#create-note').addEventListener('click', event => {
    const id = uuidv4();
    const timestamp = moment().valueOf();
    // add new note object to notes array
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    });

    saveNotes(notes);

    // redirect to edit page
    location.assign(`/edit.html#${id}`);
});


document.querySelector('#search-text').addEventListener('input', event => {
    filters.searchText = event.target.value.toLowerCase();
    renderNotes(notes, filters);
});

document.querySelector('#filter-by').addEventListener('change', event => {
    filters.sortBy = event.target.value;
    renderNotes(notes, filters);
});

window.addEventListener('storage', (event) => {
    if (event.key === 'notes') {
        notes = JSON.parse(event.newValue);
    }

    renderNotes(notes, filters);
});
