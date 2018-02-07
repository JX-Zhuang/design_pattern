Function.prototype.before = function (beforeFn) {
    var _self = this;
    return function () {
        beforeFn.apply(this, arguments);
        return _self.apply(this, arguments);
    }
};
Function.prototype.after = function (afterFn) {
    var _self = this;
    return function () {
        var ret = _self.apply(this, arguments);
        afterFn.apply(this, arguments);
        return ret;
    }
};

function fn() {
    console.log(2);
}
fn = fn.before(function () {
    console.log(1);
}).after(function () {
    console.log(3);
});
fn();