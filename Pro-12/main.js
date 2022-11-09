const DEFAULT_NUM = 0

function Calculator(base) {
    this.base = isNumber(base) ? base : DEFAULT_NUM

    this.add = function (add) {
        if (isNumber(add)) {
            this.base += add
        }
    }
    this.sub = function (sub) {
        if (isNumber(sub)) {
            this.base -= sub
        }
    }
    this.set = function (set) {
        if (isNumber(set)) {
            this.base = set
        }
    }
    this.get = function () {
        return this.base
    }
}

function isNumber(num) {
    return typeof num === 'number' && isFinite(num)
}

const calc = new Calculator(100)

calc.sub(20)
calc.sub(20)
calc.sub(20)
calc.add(10)
calc.set(100)
calc.get()