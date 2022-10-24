const calculator = createCalculator(100)

console.log(calculator.add(NaN))
console.log(calculator.add(20))
console.log(calculator.sub(undefined))
console.log(calculator.sub(-10))
console.log(calculator.sub(40))
console.log(calculator.set())
console.log(calculator.add(80))
console.log(calculator.set(1000))
console.log(calculator.add('sfsdfsf'))
console.log(calculator.set('sfsdfsf'))
console.log(calculator.sub('sfsdfsf'))
console.log(calculator.add(12))
console.log(calculator.add(12))
console.log(calculator.reset())
console.log(calculator.reset(3232))
console.log(calculator.add(120))
console.log(calculator.get())

function createCalculator(num) {
    const DEFAULT_NUM = num

    return {
        add: (add) => {
            num = typeofNumber(add, num, plus(num, add))
        },
        sub: (sub) => {
            num = typeofNumber(sub, num, minus(num, sub))
        },
        set: (set) => {
            num = typeofNumber(set, num, set)
        },
        reset: () => {
            num = DEFAULT_NUM
        },
        get: () => {
            return num
        }
    }
}

function typeofNumber(type, num, method) {
    return typeof type === 'number' && isFinite(type) ? method : num
}

function plus(a, b) {
    return a + b
}

function minus(a, b) {
    return a - b
}