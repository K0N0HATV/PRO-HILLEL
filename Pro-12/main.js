function Calculator(base) {
    if (!validateSetNum(base, false, base)) {
        throw new Error('ты клоун')
    }

    this.base = base

    this.add = function (add) {
        this.base = validateSetNum(add, this.base, plus(this.base, add))
    }
    this.sub = function (sub) {
        this.base = validateSetNum(sub, this.base, minus(this.base, sub))
    }
    this.set = function (set) {
        this.base = validateSetNum(set, this.base, set)
    }
    this.get = function () {
        return this.base
    }
}

function validateSetNum(num, base, method) {
    return typeof num === 'number' && isFinite(num) ? method : base
}

function plus(a, b) {
    return a + b
}

function minus(a, b) {
    return a - b
}

const calc = new Calculator(100)

calc.add(10);
calc.add(10);
calc.sub(20);
calc.set(20);
calc.add(10);
calc.add('qwe');
calc.get();