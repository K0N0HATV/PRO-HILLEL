function operand() {
    const operator = prompt('Enter operator +, -, *, /')

    if ((operator === '+' || operator === '-' || operator === '*' || operator === '/')) {
        const a = prompt('Enter operand A')
        if ((Number(a) || a === '0')) {
            const b = prompt('Enter operand B')
            if ((Number(b) || b === '0')) {
                if (operator === '+') {
                    alert(`${Number(a)} ${operator} ${Number(b)} = ${Number(a) + Number(b)}`)
                } else if (operator === '-') {
                    alert(`${Number(a)} ${operator} ${Number(b)} = ${Number(a) - Number(b)}`)
                } else if (operator === '*') {
                    alert(`${Number(a)} ${operator} ${Number(b)} = ${Number(a) * Number(b)}`)
                } else if (operator === '/') {
                    alert(`${Number(a)} ${operator} ${Number(b)} = ${Number(a) / Number(b)}`)
                } else {
                    alert('Wrong operator')
                }
            } else {
                alert('Wrong operand')
            }
        } else {
            alert('Wrong operand')
        }
    } else {
        alert('Wrong operator')
    }
}

operand()