# 策略模式 
>策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

#### 解决的问题
很多公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。例如，绩效为S的人年终奖有4倍工资，绩效为A的人年终奖有3倍工资，而绩效为B的人年终奖是2倍工资。
``` javascript
var calculateBonus = function( performanceLevel, salary ){
if ( performanceLevel === 'S' ){ 
    return salary * 4;
}
if ( performanceLevel === 'A' ){ 
    return salary * 3;
}
if ( performanceLevel === 'B' ){ 
    return salary * 2;
} };
calculateBonus( 'B', 20000 ); //40000 
calculateBonus( 'S', 6000 ); //24000
```
这段代码有以下缺点：
* calculateBonus方法中包含了许多的if-else语句
* 如果以后增加C等级，要再增加一个if分支，如果S等级变为5倍工资，需要修改calculateBonus方法
* 如果其他地方用到了S等级的计算方法，就要赋值S等级的计算方法

#### 用策略模式重构代码
```javascript
var performanceS = function () {
};
performanceS.prototype.calculate = function (salary) {
    return salary * 4;
};
var performanceA = function () {
};
performanceA.prototype.calculate = function (salary) {
    return salary * 3;
};
var performanceB = function () {
};
performanceB.prototype.calculate = function (salary) {
    return salary * 2;
};
var Bonus = function() {
  this.salary = null;
  this.strategy = null;
};
Bonus.prototype.setSalary = function(salary) {
  this.salary = salary;
};
Bonus.prototype.setStrategy = function(strategy) {
  this.strategy = strategy;
};
Bonus.prototype.getBonus = function() {
  return this.strategy.calculate(this.salary);
};
var bonus = new Bonus();
bonus.setSalary(1000);
bonus.setStrategy(new performanceS());
console.log(bonus.getBonus());
bonus.setStrategy(new performanceA());
console.log(bonus.getBonus());
```
重构代码后，可以看到每个类的职责更加清楚，每个方法的职责单一，方便扩展和移植。这是模仿传统面向对象语言的实现，下面看一下JavaScript的策略模式。

#### JavaScript版本的策略模式
```javascript
var strategies = {
    'S':function(salary) {
        return salary * 4;
    },
    'A':function(salary) {
        return salary * 3;
    },
    'B':function(salary) {
        return salary * 2;
    }
};
function getBonus(level,salary) {
    return strategies[level](salary);
}
console.log(getBonus('S',1000));
```
JavaScript版本的策略模式代码更加的简洁。JavaScript的灵活，即使缺点也是优点，在实现设计模式的时候更加方便。如果把每个策略变成一个方法，代码如下：

```javascript
function S(salary) {
    return salary * 4;
}
function A(salary) {
    return salary * 3;
}
function B(salary) {
    return salary * 2;
}
function getBonus(func,salary) {
    return func(salary);
}
console.log(getBonus(S,1000));
```
Peter Norvig 在他的演讲中曾说过:“在函数作为一等对象的语言中，策略模式是隐形的。strategy 就是值为函数的变量。” JavaScript中函数是一等公民，可以作为参数、返回值及直接调用等方式任意传播。所以可以将每个求奖金的算法封装在一个方法里，在调用getBonus时传入方法名，并在getBonus里执行该方法获得结果。

#### 具体应用
在验证表单时，如果有多个输入框，经常出现这种代码：
```javascript
if(name===''){
    //姓名不能为空
    return false;
}
if(passWord.length<6){
    //密码要大于6位
    return false;
}
if(!/^1(3|5|8)[0-9]{9}$/.test(phoneNumber)){
    //手机格式不正确
    return false;
}
```
用策略模式重构代码，把每个value的验证封装成单个方法：
```javascript
var obj = {
    userName:'1',
    passWord:'111111',
    phoneNumber:'13900000000'
};//模拟输入框的value
var strategies = {
    isNonEmpty:function (value,errMsg) {
        if(value==''){
            return errMsg;
        }
    },
    minLength:function (length) {
        //因为length不一定是多少位，所以要作为参数传入
        return function (value,errMsg) {
            if(value.length<length){
                return errMsg;
            }
        };
     },
    isMobile:function (value,errMsg) {
        if(!/^1(3|5|8)[0-9]{9}$/.test(value)){
            return errMsg;
        }
    }
};
```
先写如何调用
```javascript
var validataFunc = function () {
    var validator = new Validator();    //验证表单类
    validator.add(obj.userName,strategies.isNonEmpty,'用户名不能为空');  //加入需要验证的value，调用的策略，返回的错误信息
    validator.add(obj.passWord,strategies.minLength(6),'密码不能小于6位');
    validator.add('1223',strategies.minLength(6),'密码不能小于10位');
    validator.add(obj.phoneNumber,strategies.isMobile,'手机格式不正确');
    var errMsg = validator.start();     //开始验证
    return errMsg;
};
var errMsg = validataFunc();
if(errMsg){
    console.log(errMsg);
}else {
    console.log('ok');
}
```
验证表单的Validator是一个类，实例方法add是加入需要验证的value、调用的策略、返回的错误信息，start是开始验证。所以内部要有一个队列
```javascript
var Validator = function () {
    this.cache = [];
};
Validator.prototype.add = function (value,strategy,errMsg) {
    this.cache.push(function () {
        return strategy(value,errMsg);
    })
};
Validator.prototype.start = function () {
    for(var i = 0,validatorFunc; validatorFunc = this.cache[i++];){
        var msg = validatorFunc();
        if(msg) return msg;         //返回错误信息
    }
};
```
#### 添加多种校验规则
验证表单一般一个输入框要有多个验证，比如password，同时验证空和位数不足。修改后的代码：
```javascript
var passWord = '';
//把验证方法拆开，不影响结果，方便比较
function isNonEmpty(value, errMsg) {
    if (value == '') {
        return errMsg;
    }
}
function minLength(length) {
    return function (value, errMsg) {
        if (value.length < length) {
            return errMsg;
        }
    }
}
var Validator = function () {
    this.cache = [];
};
Validator.prototype.add = function (value, ruleAry) {
    //ruleAry 是数组，数据结构[{strategy,errMsg},{strategy,errMsg}] strategy:验证策略，errMsg:错误信息
    for (var i = 0; i < ruleAry.length; i++) {
        let ruleObj = ruleAry[i];
        this.cache.push(function () {
            var strategy = ruleObj.strategy;
            return strategy(value,ruleObj.errMsg);
        });
    }
};
Validator.prototype.start = function () {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
        var errMsg = validatorFunc();
        if (errMsg) {
            return errMsg;
        }
    }
};
function validatorFunc(password='') {
    var valida = new Validator();
    valida.add(password, [{
        strategy: isNonEmpty,
        errMsg: '密码不能为空'
    }, {
        strategy: minLength(6),
        errMsg: '密码不能低于6位'
    }]);
    var errMsg = valida.start();
    if (errMsg) {
        console.log(errMsg);
    } else {
        console.log('ok');
    }
}

validatorFunc();        //密码不能为空
validatorFunc('12345'); //密码不能低于6位
validatorFunc('123456'); //ok

```
#### 小结
策略模式，将算法封装在独立的strategy中，使得它们符合单一原则，方便扩展和调用。在JavaScript中，函数可以"随意"传递。函数作为参数时，不同的函数可以得到不同的结果。在JavaScript语言的策略模式中，策略类往往被函数所代替，所以在JavaScript策略模式是"隐形"的。
