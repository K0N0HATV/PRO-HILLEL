const FIRST_OPERAND = 'A'
const SECOND_OPERAND = 'B'

const operator = getOperator()
if ((operator === '+' || operator === '-' || operator === '*' || operator === '/')) {
    const operandA = getOperand(FIRST_OPERAND)
    if (Number(operandA)) {
        const operandB = getOperand(SECOND_OPERAND)
        if (Number(operandB)) {
            const res = calc(operator, operandA, operandB)
            seeRes(operator, operandA, operandB, res)
        } else {
            errorOperand(SECOND_OPERAND)
        }
    } else {
        errorOperand(FIRST_OPERAND)
    }
} else {
    errorOperator(operator)
}

function getOperator(operators) {
    return prompt(`Enter operator ${operators}`)
}

function getOperand(numberAB) {
    return Number(prompt(`Enter operand ${numberAB}`))
}

function calc(operator, a, b) {
    switch (operator) {
        case '+':
            return (`${a + b}`)
        case '-':
            return (`${a - b}`)
        case '*':
            return (`${a * b}`)
        case '/':
            return (`${a / b}`)
    }
}

function seeRes(operator, a, b, res) {
    alert(`${a} ${operator} ${b} = ${res}`)
}

function errorOperator(operator) {
    alert(`Entered wrong operator ${operator}`)
}

function errorOperand(NumberAB) {
    alert(`Entered wrong operand ${NumberAB}`)
}