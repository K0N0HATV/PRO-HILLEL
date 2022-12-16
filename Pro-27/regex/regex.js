let regexp = /(?:love)/;
console.log(regexp.test('I love JavaScript'));
console.log(regexp.test('I JavaScript'));

regexp = /ing$/;
console.log(regexp.test('Good morning'));
console.log(regexp.test('Good morning!')); 