import Server from "./Server.js"

const CLASS_SELECTOR_FORM_EL = '.form'
const CLASS_SELECTOR_INPUT_EL = '.inp'
const CLASS_SELECTOR_CONTAINER = '.ulContainer'
const ATTRIBUTE_NAME = 'name'

const formEl = document.querySelector(CLASS_SELECTOR_FORM_EL)
const inputs = document.querySelectorAll(CLASS_SELECTOR_INPUT_EL)
const ulEl = document.querySelector(CLASS_SELECTOR_CONTAINER)
const WebSocet = new Server()


formEl.addEventListener('submit', onFormElSubmit)

function onFormElSubmit(e) {
    e.preventDefault()

    const message = getMessage()

    if (message) {
        WebSocet.sendMessage(message)

        clearForm()
    }
}

function getMessage() {
    let message = {}

    for (const input of inputs) {
        if (input.value.trim()) {
            message[input.getAttribute(ATTRIBUTE_NAME)] = input.value
        }
        else {
            showError(`поле ${input.getAttribute(ATTRIBUTE_NAME)} должно быть заполненым `)
            return
        }
    }

    return message
}

WebSocet.ws.onmessage = (e) => {
    const data = JSON.parse(e.data)
    const liEl = getTemplate(data)

    ulEl.insertAdjacentHTML('beforeend', liEl)
}

function getTemplate({ message, name }) {
    return `<li>${name}: ${message}</li>`
}

function clearForm() {
    formEl.reset()
}

function showError(err) {
    alert(err)
}