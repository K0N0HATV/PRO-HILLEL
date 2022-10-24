const quiz = [
    {
        question: 'Сколько будет 2+2?',
        answer: '4',
        type: 'prompt'
    },
    {
        question: 'Солнце встает на востоке?',
        answer: true,
        type: 'confirm'
    },
    {
        question: 'Сколько будет 5 / 0?',
        answer: 'Infinity',
        type: 'prompt'
    },
    {
        question: 'Какого цвета небо?',
        answer: 'голубого',
        type: 'prompt'
    },
    {
        question: 'Главный вопрос жизни, вселенной и всего такого',
        answer: '42',
        type: 'prompt'
    }
]

let score = 0
iterateArray(quiz)
res(score)

function iterateArray(array) {
    for (let i = 0; i < array.length; i++) {
        if (questionType(array[i])) {
            score = sum(score, 10)
        }
    }
}

function questionType(array) {
    let typeQuestion
    if (array.type === 'prompt') {
        typeQuestion = prompt
    }
    if (array.type === 'confirm') {
        typeQuestion = confirm
    }
    return (typeQuestion(array.question) == array.answer)
}

function sum(a, b) {
    return a + b
}

function res(score) {
    alert(`Ваша оценка: ${score}`)
}