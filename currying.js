var cost = (function () {
    var args = [];
    return function () {
        if (arguments.length == 0) {
            var money = 0;
            for (var i = 0; i < args.length; i++) {
                money += args[i];
            }
            return money;
        } else {
            [].push.apply(args, arguments);
            console.log(args);
        }
    }
})();
var currying = function (fn) {
    var args = [];
    return function result() {
        if(arguments.length===0){
            return fn.apply(this,args);
        }else {
            [].push.apply(args,arguments);
            console.log(args);
            return result;
        }
    }
};
var cost1 = (function () {
    var money = 0;
    return function () {
        for (var i = 0; i < arguments.length; i++) {
            money += arguments[i];
        }
        return money;
    }
})();
cost1 = currying(cost1);
cost1(100,200,300)(400,600);
cost1(400,500);
cost1(600);
console.log(cost1());