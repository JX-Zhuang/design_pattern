function isType(type) {
    return function (obj) {
        return Object.prototype.toString.call(obj) === `[object ${type}]`;
    }
}
var isString = isType('String');
var isNumber = isType('Number');
console.log(isNumber(123));
console.log(isString('123'));