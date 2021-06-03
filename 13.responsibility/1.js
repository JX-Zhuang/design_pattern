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
var Chain = function (fn) {
    this.fn = fn;
    this.successor = null;
}
Chain.prototype.setNextSuccessor = function (successor) {
    return this.successor = successor;
}
Chain.prototype.passRequest = function () {
    var res = this.fn.apply(this, arguments);
    if (!res) return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    return res;
}
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(2, true, 500);
chainOrder500.passRequest(3, true, 500);
chainOrder500.passRequest(1, false, 0);