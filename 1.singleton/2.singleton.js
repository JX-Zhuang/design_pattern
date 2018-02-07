function Person(name) {
    this.name = name;
    if (!Person.instace) {
        Person.instace = this;
    }
    return Person.instace;
}

Person.prototype.getName = function () {
    console.log(this.name);
};
var a = new Person('a');
var b = new Person('b');
console.log(a===b);
//缺点，如果要创建多个Person，要修改代码，不利于扩展