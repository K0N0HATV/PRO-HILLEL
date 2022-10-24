'use strict'

Hamburger.BURGER_SMALL = {
    price: 50,
    callories: 20,
}

Hamburger.BURGER_MEDIUM = {
    price: 75,
    callories: 30,
}

Hamburger.BURGER_BIG = {
    price: 100,
    callories: 40,
}

Hamburger.TOPPING_CHEESE = {
    price: 10,
    callories: 20,
}

Hamburger.TOPPING_SALAT = {
    price: 20,
    callories: 5,
}

Hamburger.TOPPING_POTATO = {
    price: 15,
    callories: 10,
}

Hamburger.TOPPING_SPICE = {
    price: 15,
    callories: 0,
}

Hamburger.TOPPING_MAYONEZ = {
    price: 20,
    callories: 5,
}

function Hamburger(hamburger) {
    this.hamburger = hamburger
}

Hamburger.prototype.addTopping = function (toping) {
    this.hamburger.price += toping.price
    this.hamburger.callories += toping.callories
}

Hamburger.prototype.getPrice = function () {
    return this.hamburger.price
}

Hamburger.prototype.getCallories = function () {
    return this.hamburger.callories
}

const hamburger = new Hamburger(Hamburger.BURGER_MEDIUM)
hamburger.addTopping(Hamburger.TOPPING_SPICE)
hamburger.addTopping(Hamburger.TOPPING_MAYONEZ)
hamburger.addTopping(Hamburger.TOPPING_POTATO)
hamburger.addTopping(Hamburger.TOPPING_SALAT)
hamburger.addTopping(Hamburger.TOPPING_CHEESE)

console.log("Price with sauce: " + hamburger.getPrice())
console.log("Callories with sauce: " + hamburger.getCallories())