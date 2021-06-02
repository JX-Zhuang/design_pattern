var Beverage = function (params) {
    var boilWater = function () {
        console.log('把水煮沸');
    };
    var brew = params.brew || function () {
        throw new Error('brew');
    };
    var pourInCup = params.pourInCup || function () {
        throw new Error('pourInCup');
    };
    var addCondiments = params.addCondiments || function () {
        throw new Error('addCondiments');
    };
    var F = function () { };
    F.prototype.init = function () {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }
    return F;
}
var Coffee = Beverage({
    brew: function () {
        console.log('用沸水冲泡咖啡')
    },
    pourInCup: function () {
        console.log('把咖啡倒入杯子')
    },
    addCondiments: function () {
        console.log('加入牛奶')
    }
});
var Tea = Beverage({
    brew: function () {
        console.log('用沸水冲泡茶叶')
    },
    pourInCup: function () {
        console.log('把茶倒入杯子')
    },
    addCondiments: function () {
        console.log('加入柠檬')
    }
});
var coffee = new Coffee();
coffee.init();

var tea = new Tea();
tea.init();