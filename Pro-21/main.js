const SELECTOR_CLASS_BTN = '.btn'
const SELECTOR_CLASS_TABLE = '.table'
const SELECTOR_CLASS_INPUT = '.input'
const SELECTOR_CLASS_FORM = '.form'
const SELECTOR_ID_FIRST_NAME = '#firstName'
const SELECTOR_ID_LAST_NAME = '#lastName'
const SELECTOR_ID_PHONE = '#phone'
const SELECTOR_ID_INPUT_ID = '#id'
const SELECTOR_ID_DIALOG_FORM = "#dialog-form"
const SELECTOR_CLASS_DELETE_BTN = '.delete'
const SELECTOR_CLASS_EDIT_BTN = '.edit'
const OPEN_DIALOG = "open"
const CLOSE_DIALOG = "close"
const SELECTOR_CLASS_TR_ITEM = '.tr_item'
const ATTRIBUTE_DATA_ID = 'id'
const FIRST_ELEMENT = 0
const ATTRIBUTE_NAME = 'name'

const $addContactBtn = $(SELECTOR_CLASS_BTN)
const $tableEl = $(SELECTOR_CLASS_TABLE)
const $inputs = Array.from($(SELECTOR_CLASS_INPUT))
const $formEl = $(SELECTOR_CLASS_FORM)
const $inpFirstName = $(SELECTOR_ID_FIRST_NAME)
const $inpLastName = $(SELECTOR_ID_LAST_NAME)
const $inpPhone = $(SELECTOR_ID_PHONE)
const $id = $(SELECTOR_ID_INPUT_ID)
let contactsList = []
const dialog = $(SELECTOR_ID_DIALOG_FORM).dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
        Save: () => {
            const contact = getContact()
            const $contactId = $id.val()

            if (validateInp()) {
                return
            }

            if ($contactId) {
                updateContact($contactId, contact)
            } else {
                createContact(contact)
            }

            clear()
        },
        Cancel: function () {
            clear()
        }
    },
    close: function () {
        clear()
    }
})

$addContactBtn.on('click', onAddContactBtnClick)
$tableEl
    .on('click', SELECTOR_CLASS_DELETE_BTN, onDeleteBtnClick)
    .on('click', SELECTOR_CLASS_EDIT_BTN, onEditBtnClick)

getContactList()

function onAddContactBtnClick(e) {
    e.preventDefault()

    dialog.dialog(OPEN_DIALOG);
}

function onDeleteBtnClick() {
    const $targetDelBtn = $(this)
    const $trEl = $targetDelBtn.closest(SELECTOR_CLASS_TR_ITEM)
    const $trElId = $trEl.data(ATTRIBUTE_DATA_ID)

    ContactApi.delete($trElId)
        .then(() => {
            contactsList = contactsList.filter(item => +item.id !== $trElId);
        })
        .catch(showError)
    $trEl.remove()
}

function onEditBtnClick() {
    const $trElId = $(this).closest(SELECTOR_CLASS_TR_ITEM).data(ATTRIBUTE_DATA_ID)

    const contactUpdate = contactsList.find(el => +el.id === $trElId)

    fillForm(contactUpdate)

    dialog.dialog(OPEN_DIALOG);
}

function createContact(contact) {
    ContactApi.create(contact)
        .then(newContact => {
            contactsList.push(newContact)
            renderContactList(contactsList)
        })
        .catch(showError)

    addContact(contact)
}

function updateContact(contactId, contact) {
    ContactApi.update(contactId, contact)
        .catch(showError)

    const contactOld = contactsList.find(item => item.id === contactId)
    Object.keys(contact).forEach(key => contactOld[key] = contact[key])

    renderContactList(contactsList)
}

function validateInp() {
    return $inputs.find(el => {
        if (el.value.trim() === '') {
            alert(`Заполните поле с названием: ${el.getAttribute(ATTRIBUTE_NAME)}`)
            return true
        }
    })
}

function fillForm(contact) {
    for (const input of $inputs) {
        input.value = contact[input.id]
    }
    $id[FIRST_ELEMENT].value = contact.id
}

function getContact() {
    const $idContact = $id.val()
    let contact = contactsList.find(el => el.id === $idContact) || {}

    for (const input of $inputs) {
        contact = { ...contact, [input.getAttribute(ATTRIBUTE_NAME)]: input.value }
    }

    return contact
}

function getContactList() {
    ContactApi.getList()
        .then(contactList => contactsList = contactList)
        .then(renderContactList)
        .catch(showError)
}

function renderContactList(contactList) {
    $tableEl.html(contactList.map(getTemplate))
}

function addContact(contact) {
    $tableEl.append(getTemplate(contact))
}

function getTemplate({ firstName, lastName, phone, id }) {
    return `
    <tr class="tr_item" data-id="${id}">
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${phone}</td>
        <td>
            <button class="delete">Delete</button>
            <button class="edit">Edit</button>
        </td>
    </tr>
`
}

function showError({ message }) {
    alert(message)
}

function clear() {
    $formEl[FIRST_ELEMENT].reset()
    dialog.dialog(CLOSE_DIALOG);
}