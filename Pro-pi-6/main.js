const factorial1 = factorial(3) // 6 
const factorial2 = factorial(5) // 120

console.log(factorial1)
console.log(factorial2)

function factorial(n) {
    if (n <= 0) {
        return 1
    } else {
        return n * factorial(n - 1)
    }
}