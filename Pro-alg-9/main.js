const ulEl = document.querySelector('.ul')
const inpEl = document.querySelector('.input')
const btnEl = document.querySelector('.btn')

const addEl = btnEl.addEventListener('click', addElLiInUl)

function addElLiInUl() {
    const liEl = document.createElement('li')
    liEl.textContent = inpEl.value
    inpEl.value.trim() !== '' ? ulEl.append(liEl) : false
    inpEl.value = ''
}

console.log(ulEl);