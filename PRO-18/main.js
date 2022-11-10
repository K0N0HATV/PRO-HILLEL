const ID_TABLE = 'table'
const ID_FORM = 'form'
const ID_INPUT_ID = 'inpId'
const CLASS_INPUT = 'inp'
const CLASS_BUTTON = 'button'
const CLASS_BUTTON_DELETE = 'deleteBtn'
const CLASS_BUTTON_EDIT = 'editBtn'
const ATTRIBUTE_INPUT = 'name'
const ID_INPUT_FIRST_NAME = 'inpFirstName'
const ID_INPUT_LAST_NAME = 'inpLastName'
const ID_INPUT_PHONE = 'inpPhone'

const tableEl = document.querySelector(`#${ID_TABLE}`)
const formEl = document.querySelector(`#${ID_FORM}`)
const inpId = document.querySelector(`#${ID_INPUT_ID}`)
const inpFirstName = document.querySelector(`#${ID_INPUT_FIRST_NAME}`)
const inpLastName = document.querySelector(`#${ID_INPUT_LAST_NAME}`)
const inpPhone = document.querySelector(`#${ID_INPUT_PHONE}`)
const inpEl = Array.from(document.querySelectorAll(`.${CLASS_INPUT}`))
let contactList = []

formEl.addEventListener('submit', onformElClick)
tableEl.addEventListener('click', onTableElClick)

getContactList()

function onformElClick(e) {
    e.preventDefault()

    const contact = getContact()

    if (isEmptyInp()) {
        return
    }

    saveContactList(contact)

    clearInp()
}

function onTableElClick(e) {
    if (isClassListContains(e.target, CLASS_BUTTON)) {
        const trEl = findEl(e.target)
        const trId = getId(trEl)

        const contact = getFindId(contactList, trId)

        if (contact) {
            if (isClassListContains(e.target, CLASS_BUTTON_DELETE)) {
                trEl.remove()
                ContactApi.deleteContact(trId)
                    .then(getContactList)
                    .catch(showError)
            }
            if (isClassListContains(e.target, CLASS_BUTTON_EDIT)) {
                fillForm(contact)
            }
        }
    }
}

function getContactList() {
    ContactApi.getList()
        .then(list => contactList = list)
        .then(renderContactList)
        .catch(showError)
}

function saveContactList(contact) {
    if (contact.id) {
        ContactApi.updateContact(contact.id, contact).catch(showError)
        const contactOld = getFindId(contactList, contact.id)

        contactOld.firstName = contact.firstName
        contactOld.lastName = contact.lastName
        contactOld.phone = contact.phone

        renderContactList(contactList)
    } else {
        ContactApi.createContact(contact)
            .then(getContactList)
            .catch(showError)
        addContact(contact)
    }
}

function fillForm(contact) {
    inpFirstName.value = contact.firstName
    inpLastName.value = contact.lastName
    inpPhone.value = contact.phone
    inpId.value = contact.id
}

function isEmptyInp() {
    return inpEl.find(el => {
        if (isInpValueValid(el)) {
            showError({ message: `Инпут не должен быть пустым: ${el.getAttribute(ATTRIBUTE_INPUT)}` })
            return true
        }
    })
}

function getContact() {
    const id = inpId.value
    const contact = getFindId(contactList, id) || {}

    return {
        ...contact,
        firstName:  inpFirstName.value,
        lastName: inpLastName.value,
        phone: inpPhone.value,
    }
}

function renderContactList(contactList) {
    const html = contactList.map(getTemplate).join('')

    tableEl.innerHTML = html
}

function addContact(contact) {
    const html = getTemplate(contact)

    tableEl.insertAdjacentHTML('beforeend', html)
}

function getTemplate(contact) {
    return `
    <tr class="contactItem" data-id="${contact.id}">
        <td>${contact.firstName}</td>
        <td>${contact.lastName}</td>
        <td>${contact.phone}</td>
        <td>
            <button class="deleteBtn button">Delete</button>
            <button class="editBtn button">Edit</button>
        </td>
    </tr>
    `
}

function getFindId(el, equals) {
    return el.find(elItem => elItem.id === equals)
}

function isClassListContains(el, classEl) {
    return el.classList.contains(classEl)
}

function isInpValueValid(el) {
    return el.value.trim() === ''
}

function getId(el) {
    return el.dataset.id
}

function findEl(el) {
    return el.closest('.contactItem')
}

function showError(err) {
    alert(err.message)
}

function clearInp() {
    formEl.reset()
    inpId.value = ''
}