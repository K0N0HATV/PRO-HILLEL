const SELECTOR_ID_NOTES_LIST = '#notesList'
const CLASS_DELETE_ITEM = 'notesItemDelete'
const SELECTOR_ID_NOTES_ITEM = '#notesItem'
const ATTRIBUTE_DATA_ID = 'id'
const CLASS_NOTES_ITEM_TEXT_AREA = 'notesItemText'
const SELECTOR_ID_DESCRIPTION = '#description'
const SELECTOR_ID_DIALOG_FORM = "#dialog-form"
const SELECTOR_ID_FORM_ADD_STICER = '#form'
const OPEN_DIALOG_FORM = "open"
const CLOSE_DIALOG_FORM = "close"

const SELECTOR_CLASS_INPUTS = '.inp'

const $notesListContainer = $(SELECTOR_ID_NOTES_LIST)
const $formAddSticer = $(SELECTOR_ID_FORM_ADD_STICER)
const $descriptionInp = $(SELECTOR_ID_DESCRIPTION)

const $inputs = $(SELECTOR_CLASS_INPUTS)

let notesList = []
const modal = new FormModal(SELECTOR_ID_DIALOG_FORM)

$formAddSticer.on('submit', onFormElSubmit)
$notesListContainer.on('click', onNotesListContainerClick)

getNotesList()

function onFormElSubmit(e) {
    e.preventDefault()

    modal.open()
}

function onNotesListContainerClick(e) {
    if (hasClass($(e.target), CLASS_DELETE_ITEM)) {
        const $note = $(e.target).closest(SELECTOR_ID_NOTES_ITEM)
        const $idNote = $note.data(ATTRIBUTE_DATA_ID)

        NotesApi.delete($idNote).catch(showError)

        notesList = notesList.filter(item => +item.id !== $idNote);

        $note.remove()
    }
    if (hasClass($(e.target), CLASS_NOTES_ITEM_TEXT_AREA)) {
        const $noteId = $(e.target).closest(SELECTOR_ID_NOTES_ITEM).data(ATTRIBUTE_DATA_ID)
        const oldNote = notesList.find(el => +el.id === $noteId)

        fillForm(oldNote)
        
        modal.open()
    }
}

function getNotesList() {
    NotesApi.getlist()
        .then(noteList => notesList = noteList)
        .then(renderNotesList)
        .catch(showError)
}

function fillForm(note) {
    for (const input of $inputs) {
        if (note[input.id]) {
            input.value = note[input.id]
        }
    }
}

function renderNotesList(notesList) {
    $notesListContainer.html(notesList.map(getTempateNotes))
}

function renderNote(note) {
    $notesListContainer.append(getTempateNotes(note))
}

function getTempateNotes(note) {
    return `
    <div data-id="${note.id}" id="notesItem">
        <p class="notesItemDelete">x</p>
        <textarea class="notesItemText" cols="20" rows="2">${note.description}</textarea>
    </div>
    `
}

function getNote() {
    return {
        description: $descriptionInp.val()
    }
}

function hasClass(el, classItem) {
    return el.hasClass(classItem)
}

function showError(err) {
    alert(err.message)
}