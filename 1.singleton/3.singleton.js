function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    console.log(this.name);
};
//代理模式
var CreateSinglePerson = (function (name) {
    var instance;
    return function () {
        if (!instance) {
            instance = new Person(name);
        }
        return instance;
    };
})();
var a = new CreateSinglePerson('a');
var b = new CreateSinglePerson('b');
console.log(a === b);
var c = new Person('c');
var d = new Person('d');
console.log(c === d);