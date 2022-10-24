const inputEl = document.querySelectorAll('.inp')
const btnEl = document.querySelector('.btn')
const table = document.querySelector('.table')
const itemTemplate = document.querySelector('#itemTemplate').innerHTML


btnEl.addEventListener('click', onBtnClick)
deleteElement()


function onBtnClick() {

    if (validate() === false) {
        return
    }

    displayValue()

    clearInp()

    deleteElement()
}

function validate() {
    for (i = 0; i < inputEl.length; i++) {
        if (inputEl[i].value.trim() === '') {
            error(getAttribute())
            return false
        }
        if (getAttribute() === 'phone' && (inputEl[i].value.length > 13 || inputEl[i].value.length < 9)) {
            error(getAttribute())
            return false
        }
    }
}

function displayValue() {
    let inpName = itemTemplate

    for (let i = 0; i < inputEl.length; i++) {
        inpName = inpName.replace(`[${inputEl[i].getAttribute('name')}]`, inputEl[i].value)
    }

    table.insertAdjacentHTML('beforeend', inpName)
}

function deleteElement() {
    const deleteEl = document.querySelectorAll('.del')

    deleteEl.forEach((el) => {
        el.addEventListener('click', delEl)
    })
}

function delEl(item) {
    item.target.closest('tr').remove()
}

function error(type) {
    alert(`Please enter your ${type}`)
}

function clearInp() {
    return inputEl.forEach((el) => el.value = '')
}

function getAttribute() {
    return inputEl[i].getAttribute('name')
}

function getValue() {
    return inputEl[i].value
}