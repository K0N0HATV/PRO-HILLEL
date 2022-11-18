const $notesListContainer = $('#notesList')
const $formEl = $('#form')
let notesList = []

$formEl.on('submit', onFormElSubmit)
$notesListContainer.on('click', onNotesListContainerClick)

getNotesList()

function onFormElSubmit(e) {
    e.preventDefault()

    createNote()
}

function onNotesListContainerClick(e) {
    if (hasClass($(e.target), 'notesItemDelete')) {
        const $note = $(e.target).closest('#notesItem')
        const $idNote = $note.data('id')

        NotesApi.delete($idNote).catch(showError)

        $note.remove()
    }
    if (hasClass($(e.target), 'notesItemText')) {
        $(e.target).focusout(() => {
            const $note = getNote($(e.target))
            const $noteId = $(e.target).closest('#notesItem').data('id')
            const oldNote = notesList.find(el => +el.id === $noteId)

            if (textAreaValid($note)) {
                showError({ message: 'поле не должно быть пустое' })
                throw new Error('поле не должно быть пустое')
            }

            oldNote.description = $note.description

            NotesApi.update($noteId, $note).catch(showError)

            renderNotesList(notesList)
        })
    }
}

function hasClass(el, classItem) {
    return el.hasClass(classItem)
}

function textAreaValid(el) {
    return el.description === ''
}

function getNote(el) {
    return {
        description: el.val()
    }
}

function createNote(note) {
    NotesApi.create(note)
        .then(getNotesList)
        .catch(showError)
}

function getNotesList() {
    NotesApi.getlist()
        .then(noteList => notesList = noteList)
        .then(renderNotesList)
        .catch(showError)
}

function renderNotesList(notesList) {
    $notesListContainer.html(notesList.map(getTempateNotes))
}

function getTempateNotes(note) {
    return `
    <div data-id="${note.id}" id="notesItem">
        <p class="notesItemDelete">x</p>
        <textarea class="notesItemText" cols="20" rows="2">${note.description}</textarea>
    </div>
    `
}

function showError(err) {
    alert(err.message)
}