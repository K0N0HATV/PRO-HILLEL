const operator = getOperator()
const quantitisOperand = getQuantitis()
const operands = []
getOperand()

const res = calc(operator, operands)
showRes(operator, operands, res)


function getOperator() {
    let arg
    do {
        arg = prompt('Enter operator +, -, *, /')
    } while (arg !== '+' && arg !== '-' && arg !== '*' && arg !== '/')
    return arg
}

function getQuantitis() {
    let numbers
    do {
        numbers = Number(prompt('Enter quantitis numbers 1 < num < 5'))
    } while (numbers >= 5 || numbers <= 1 || isNaN(numbers))
    return numbers
}

function getOperand() {
    for (n = 1; n <= quantitisOperand; n++) {
        do {
            str = Number(prompt(`Enter ${n}-th operand`))
        } while (!Number(str))
        operands.push(str)
    }
}

function calc(operator, operands) {
    switch (operator) {
        case '+':
            return operands.reduce((a, b) => a + b)
        case '-':
            return operands.reduce((a, b) => a - b)
        case '*':
            return operands.reduce((a, b) => a * b)
        case '/':
            return operands.reduce((a, b) => a / b)
    }
}

function showRes(operator, operands, res) {
    alert(`${operands.join(` ${operator} `)} = ${res}`)
}