const operator = prompt('Enter operator +, -, *, /')
const a = Number(prompt('Enter operand A'))
const b = Number(prompt('Enter operand B'))

switch (operator) {
    case '+':
        alert(`${a} ${operator} ${b} = ${a + b}`)
        break;
    case '-':
        alert(`${a} ${operator} ${b} = ${a - b}`)
        break;
    case '*':
        alert(`${a} ${operator} ${b} = ${a * b}`)
        break;
    case '/':
        alert(`${a} ${operator} ${b} = ${a / b}`)
        break;
    default:
        alert('Enter wrong operator')
}

operator()