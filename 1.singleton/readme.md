# 单例模式 
>单例设计模式：保证一个类仅有一个实例，并且提供一个访问它的全局访问点。有些对象只需要一个，这时可用单例模式。

#### 传统的单例模式
* 和new 创建对象的调用不一样
* 调用者要调用xxx.getInstance才能获得该单例
``` javascript
function Singleton(name) {
    this.name = name;
}
Singleton.getInstance = function (name) {
    if(this.instace){
        return this.instace;
    }else {
        this.instace = new Singleton(name);
        return this.instace;
    }
};
var a = Singleton.getInstance('a');
var b = Singleton.getInstance('b');
console.log(a===b); //true
```
#### "透明"的单例模式
* 透明”的单例类，用户从这个类中创建对象的时候，可以像使用其他任何普通类一样
* 直接 new 一个对象
* 不能new 多个对象，扩展性不好
```javascript
var instace;
function Person(name) {
    this.name = name;
    if (!instace) {
        instace = this;
    }
    return instace;
}

Person.prototype.getName = function () {
    console.log(this.name);
};
var a = new Person('a');
var b = new Person('b');
console.log(a===b);
```
#### 代理模式创建单例模式
* 代理模式:自己不去做，委托中间人做
* Person是一个普通类，通过new Person可以创建一个对象
* 用代理模式创建CreateSinglePerson方法，通过new CreateSinglePerson可以创建一个单例
```javascript
function Person(name) {
    this.name = name;
}
Person.prototype.getName = function () {
    console.log(this.name);
};
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
```

#### JavaScript中的单例模式
* 单例模式的核心是确保只有一个实例，并提供全局访问
* 在JavaScript可以通过直接创建一个对象来实现单例模式
* 可以用闭包的方式实现私有变量
```javascript
let MyApp = {
  name:'app',
  getName:function() {
    console.log(this.name);
  }  
};
let MyApp2 = (function(){
    var _name = 'app';
    return {
        getName:function() {
            console.log(_name);
        } 
    }
})();
```
#### 惰性单例
* 惰性单例是指在需要的时候才创建
* 🌰：调用render方法，创建A对象，可以多次调用render方法，A对象是单例的
```javascript
var createA = (function () {
    var instance;
    return function () {
        if(!instance){
            //xxx
            instance = 'A';
        }
        return instance;
    };
})();
function render() {
    createA();
    console.log('b');
}
render();
render();

```
* 如果要创建B对象，B也是单例
```javascript
var createB = (function () {
    var instance;
    return function () {
        if(!instance){
            //xxx
            instance = 'B';
        }
        return instance;
    };
})();
```
* 我们看到createA和createB的核心代码是相同的，所以可以抽离出通用创建的惰性单例的代码
```javascript
function getSingleton(fn) {
  var result;
  return function() {
    return result||(result = fn.apply(this,arguments));
  }
} 
var createA = function () {
    var instance;
    if(!instance){
        //xxx
        instance = 'A';
    }
    return instance;
};
var createB = function () {
    var instance;
    if(!instance){
        //xxx
        instance = 'B';
    }
    return instance;
};
var createASingle = getSingleton(createA);
var createBSingle = getSingleton(createB);
function render() {
    createASingle();
    createBSingle();
}
render();
render();

```

#### 小结
单例模式用到了闭包和高阶函数的特性。单例模式是简单但常用到的模式，比如单页应用、websocket连接等等。特别是惰性单例模式，用到时才创建，再次用到是不需要再次创建。创建对象和管理单例的职责分布在不同的方法中，方便扩展和管理。
