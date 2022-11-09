const URL = 'https://6367c5fbedc85dbc84db6854.mockapi.io/api/v1/listid'
const INPUT_ATTRIBUTE = 'name'
const ClASS_LI = 'li'
const CLASS_DELETE_BTN = 'del'
const CLASS_CHANGE_COLOR_GREEN = 'green-bg'
const CLASS_CHANGE_COLOR_RED = 'red-bg'
const CLASS_SUBMIT_BTN = 'btn'
const SELECTOR_CLASS_LI = '.li'
const SELECTOR_CLASS_UL = '.ul'
const SELECTOR_CLASS_INPUT = '.input'
const SELECTOR_CLASS_FORM = '.form'

const ulEl = document.querySelector(SELECTOR_CLASS_UL)
const inpEl = document.querySelector(SELECTOR_CLASS_INPUT)
const formEl = document.querySelector(SELECTOR_CLASS_FORM)

formEl.addEventListener('submit', onFormElSubmit)
ulEl.addEventListener('click', onClickUlEl)

getTodoList()

function onFormElSubmit(e) {
    e.preventDefault()

    const todo = getTodo()

    if (validate(todo)) {
        showError('ошибка ввода')
        return
    }

    createTodo(todo)

    clearInpValue()
}

function getTodoList() {
    fetch(URL)
        .then((res) => res.json())
        .then(renderToDoList)
        .catch(showError)
}

function createTodo(todo) {
    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then((res) => res.json())
        .then(showTempalte)
        .catch(showError)
}

function deleteTodo(todoId) {
    fetch(URL + `/${todoId}`, {
        method: 'Delete',
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(removeTodoList)
        .then(getTodoList)
        .catch(showError)
}

function getTodo() {
    return {
        title: inpEl.value,
        done: false,
        status: false,
    }
}

function showTempalte(todo) {
    let html = getTempalte(todo)

    ulEl.insertAdjacentHTML('beforeend', html)

    changeColorStatus()
}

function removeTodoList() {
    const todoListLi = Array.from(document.querySelectorAll(SELECTOR_CLASS_LI))

    todoListLi.forEach(el => el.remove())
}

function changeColorStatus() {
    const arrLi = Array.from(document.querySelectorAll(SELECTOR_CLASS_LI))

    arrLi.forEach(el => {
        if (isStatusBoolean(el.dataset.status, 'true')) {
            addClassEl(el, CLASS_CHANGE_COLOR_GREEN)
        }
        if (isStatusBoolean(el.dataset.status, 'false')) {
            addClassEl(el, CLASS_CHANGE_COLOR_RED)
        }
    })
}

function isStatusBoolean(el, boolean) {
    return el === boolean
}

function addClassEl(el, addClass) {
    el.classList.add(addClass)
}

function renderToDoList(todo) {
    todo.forEach(todo => showTempalte(todo))
}

function getTempalte(todo) {
    return `
    <li class="li" data-id="${todo.id}" data-status="${todo.status}">
        ${todo.title}
        <button class="del">Delete</button>
    </li>
    `
}

function onClickUlEl(e) {
    if (isClass(e.target, CLASS_DELETE_BTN)) {
        const getDeleteEl = findLiEl(e.target)

        if (getDeleteEl) {
            const getElId = getDeleteEl.dataset.id

            deleteTodo(getElId)
        }
    }
}

function isClass(e, classEl) {
    return e.classList.contains(classEl)
}

function findLiEl(el) {
    return el.closest(SELECTOR_CLASS_LI)
}

function validate(todo) {
    return todo.title.trim() === ''
}

function clearInpValue() {
    inpEl.value = ''
}

function showError(error) {
    alert(error)
}