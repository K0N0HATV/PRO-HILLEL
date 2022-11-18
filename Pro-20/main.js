const SELECTOR_ID_NOTES_LIST = '#notesList'
const SELECTOR_ID_FORM = '#form'
const CLASS_DELETE_ITEM = 'notesItemDelete'
const SELECTOR_ID_NOTES_ITEM = '#notesItem'
const ATTRIBUTE_DATA_ID = 'id'
const CLASS_NOTES_ITEM_TEXT_AREA = 'notesItemText'

const $notesListContainer = $(SELECTOR_ID_NOTES_LIST)
const $formEl = $(SELECTOR_ID_FORM)
let notesList = []

$formEl.on('submit', onFormElSubmit)
$notesListContainer.on('click', onNotesListContainerClick)

getNotesList()

function onFormElSubmit(e) {
    e.preventDefault()

    createNote()
}

function onNotesListContainerClick(e) {
    if (hasClass($(e.target), CLASS_DELETE_ITEM)) {
        const $note = $(e.target).closest(SELECTOR_ID_NOTES_ITEM)
        const $idNote = $note.data(ATTRIBUTE_DATA_ID)

        NotesApi.delete($idNote).catch(showError)

        $note.remove()
    }
    if (hasClass($(e.target), CLASS_NOTES_ITEM_TEXT_AREA)) {
        $(e.target).focusout(() => {
            const $note = getNote($(e.target))
            const $noteId = $(e.target).closest(SELECTOR_ID_NOTES_ITEM).data(ATTRIBUTE_DATA_ID)
            const oldNote = notesList.find(el => +el.id === $noteId)

            if (textAreaValid($note)) {
                showError({ message: 'поле не должно быть пустое' })
                return
            }

            oldNote.description = $note.description

            NotesApi.update($noteId, $note).catch(showError)

            renderNotesList(notesList)
        })
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

function getNote(el) {
    return {
        description: el.val()
    }
}

function hasClass(el, classItem) {
    return el.hasClass(classItem)
}

function textAreaValid(el) {
    return el.description.trim() === ''
}

function showError(err) {
    alert(err.message)
}