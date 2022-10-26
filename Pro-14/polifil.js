'use strict'

if (!Array.prototype.max) {
    Array.prototype.max = function () {
        let obj = Object(this), maxNum = obj[0]

        for (let i = 0; i < obj.length; i++) {
            if (Object(this)[i] > maxNum) {
                maxNum = Object(this)[i]
            }
        }
        return maxNum
    }
}

console.log([6, 5, 8, 7].max());