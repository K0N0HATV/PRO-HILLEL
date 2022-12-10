const SELECTOR_CLASS_TABLE = '.table'
const SELECTOR_ID_INPUT_NAME = '#name'
const SELECTOR_CLASS_FORM = '.form'
const SELECTOR_CLASS_STUDENTS_CONTAINER = '.studentList'
const DEFAULT_LENGTH = 10
const DEFAULT_MARK = '0'
const SELECTOR_CLASS_DELETE_BTN = '.delete'
const SELECTOR_CLASS_STUDENT_MARK = '.studentMark'
const SELECTOR_CLASS_TR_EL = '.trItem'
const SELECTOR_CLASS_MARK_EL = '.mark'
const ATTRIBUTE_DATA_ID = 'id'
const FIRST_EL = 0

const $tableEl = $(SELECTOR_CLASS_TABLE)
const $inputNameEl = $(SELECTOR_ID_INPUT_NAME)
const $formEl = $(SELECTOR_CLASS_FORM)
const $studentsContainer = $(SELECTOR_CLASS_STUDENTS_CONTAINER)
const DEFAULT_MARKS = new Array(DEFAULT_LENGTH).fill(DEFAULT_MARK);
let studentsList = []

$formEl.on('submit', onFormElSubmit)
$studentsContainer.on('click', SELECTOR_CLASS_DELETE_BTN, onDeleteBtnClick)
$studentsContainer.on('click', SELECTOR_CLASS_STUDENT_MARK, onMarkInputClick)

getStudentsList()

function onFormElSubmit(e) {
    e.preventDefault()

    const student = getStudent()

    if (isValidInput(student.name)) {
        return
    }

    createStudent(student)

    clearForm()
}

function onMarkInputClick(e) {
    $(e.target).focusout(() => {
        if (isValidInput($(e.target).val())) {
            return
        }

        updateStudent(e.target)
    })
}

function updateStudent(el) {
    const student = el.closest(SELECTOR_CLASS_TR_EL)
    const studentId = student.dataset.id
    const marks = Array.from(student.querySelectorAll(SELECTOR_CLASS_MARK_EL)).map(mark => mark.value)

    const studentOld = studentsList.find(item => item.id === studentId)
    studentOld.marks = marks

    StudentApi.update(studentId, studentOld).catch(showError)
}

function onDeleteBtnClick() {
    const $target = $(this)
    const $student = $target.closest(SELECTOR_CLASS_TR_EL)
    const $studentId = $student.data(ATTRIBUTE_DATA_ID)

    StudentApi.delete($studentId)
        .then(() => {
            studentsList = studentsList.filter(item => +item.id !== $studentId);
        })
        .catch(showError)

    $student.remove()
}

function createStudent(student) {
    StudentApi.create(student)
        .then(newStudent => {
            studentsList.push(newStudent)
            getStudentsList()
        })
        .catch(showError)

    addStudent(student)
}

function getStudent() {
    return {
        name: $inputNameEl.val(),
        marks: DEFAULT_MARKS
    }
}

function addStudent(student) {
    $studentsContainer.append(getTemplate(student))
}

function isValidInput(el) {
    if (el.trim() === '') {
        showError({ message: 'Поле не должно быть пустое' })
        return true
    }
}

function getStudentsList() {
    StudentApi.getList()
        .then(studentList => studentsList = studentList)
        .then(renderStudentsList)
        .catch(showError)
}

function renderStudentsList(studentList) {
    $studentsContainer.html(studentList.map(getTemplate))
}

function getTemplate({ name, marks, id }) {
    return `
        <tr class="trItem" data-id="${id}">
            <td>${name}</td>
            <td name="mark" class="studentMark">${marks.map(mark => `<input class="mark" value=${mark}>`).join('')}</td>
            <td><button class="delete">Delete</button></td>
        </tr>
        `
}

function showError({ message }) {
    alert(message)
}

function clearForm() {
    $formEl[FIRST_EL].reset()
}