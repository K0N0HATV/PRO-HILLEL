const INPUT_ATTRIBUTE = 'name'
const ClASS_LI = 'li'
const CLASS_DELETE_BTN = 'del'
const CLASS_CHANGE_COLOR = 'green-bg'
const SELECTOR_CLASS_LI = '.li'

const ulEl = document.querySelector('.ul')
const inpEl = document.querySelector('.input')
const itemTemplate = document.querySelector('#itemTemplate').innerHTML
const formEl = document.querySelector('.form')

formEl.addEventListener('submit', onFormElSubmit)
ulEl.addEventListener('click', clickDeleteEl)
ulEl.addEventListener('click', clickAddClass)



function onFormElSubmit(e) {
    e.preventDefault()

    if (validate()) {
        return
    }

    getTemolateDisplay()

    clearInpValue()
}

function getTemolateDisplay() {
    let clearTemplate = itemTemplate
    clearTemplate = clearTemplate.replace(`[${inpEl.getAttribute(INPUT_ATTRIBUTE)}]`, inpEl.value)
    ulEl.insertAdjacentHTML('beforeend', clearTemplate)
}

function clickAddClass(e) {
    if (isClass(e, ClASS_LI)) {
        const addClass = findLiEl(e.target)
        if (addClass) {
            addClass.classList.toggle(CLASS_CHANGE_COLOR)
        }
    }
}

function clickDeleteEl(e) {
    if (isClass(e, CLASS_DELETE_BTN)) {
        const getDeleteEl = findLiEl(e.target)
        if (getDeleteEl) {
            getDeleteEl.remove();
        }
    }
}

function isClass(e, classEl) {
    return e.target.classList.contains(classEl)
}

function findLiEl(el) {
    return el.closest(SELECTOR_CLASS_LI)
}

function validate() {
    return inpEl.value.trim() === ''
}

function clearInpValue() {
    return inpEl.value = ''
}