var order500 = function (orderType, pay, stock) {
    if (orderType === 1 && pay) {
        console.log('500');
        return true;
    }
    return false;
}
var order200 = function (orderType, pay, stock) {
    if (orderType === 2 && pay) {
        console.log('200');
        return true;
    }
    return false;
}
var orderNormal = function (orderType, pay, stock) {
    if (stock > 0) {
        console.log('normal');
        return true;
    }
    console.log('stock 0');
    return false;
}
Function.prototype.after = function (fn) {
    var self = this;
    return function () {
        var res = self.apply(this, arguments);
        if (res === false) {
            return fn.apply(this, arguments);
        }
        return res;
    }
}
var order = order500.after(order200).after(orderNormal);
order(1, true, 500);
order(2, true, 500);
order(1, false, 500);