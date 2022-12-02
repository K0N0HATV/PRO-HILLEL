class FormModal {
    static SELECTOR_ID_FORM = '#dialog-form form'
    static FIRST_ELEMENT = 0
    static SELECTOR_ID_INPUT = '#id'
    static OPEN_DIALOG_FORM = "open"
    static CLOSE_DIALOG_FORM = "close"

    #dialog

    constructor(selectorModalEl) {
        this.$formModal = $(FormModal.SELECTOR_ID_FORM)
        this.$id = $(FormModal.SELECTOR_ID_INPUT)

        this.#dialog = $(selectorModalEl).dialog({
            autoOpen: false,
            height: 400,
            width: 350,
            modal: true,
            buttons: {
                Save: () => {
                    const note = getNote();
                    const $noteId = this.$id.val()

                    if (this.textAreaValid(note)) {
                        showError({ message: 'поле не должно быть пустое' })
                        return
                    }

                    if ($noteId) {
                        NotesApi.update($noteId, note)
                            .catch(showError)

                        const noteOld = notesList.find(item => item.id === $noteId);
                        Object.keys(note).forEach(key => noteOld[key] = note[key]);

                        renderNotesList(notesList);
                    } else {
                        NotesApi.create(note)
                            .then((newSticer) => {
                                notesList.push(newSticer);
                                renderNotesList(notesList);
                            })
                            .catch(showError)
                        renderNote(note)
                    }

                    this.clearForm()
                },
                Cancel: () => {
                    this.clearForm()
                }
            },
            close: () => {
                this.clearForm()
            }
        });
    }

    textAreaValid(el) {
        return el.description.trim() === ''
    }

    clearForm() {
        this.$formModal[0].reset();
        this.$id[FormModal.FIRST_ELEMENT].value = ''
        this.close()
    }

    open() {
        this.#dialog.dialog(FormModal.OPEN_DIALOG_FORM)
    }

    close() {
        this.#dialog.dialog(FormModal.CLOSE_DIALOG_FORM)
    }
}