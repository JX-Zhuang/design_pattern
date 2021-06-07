Function.prototype.before = function (beforeFn) {
    var self = this;
    return function () {
        beforeFn.apply(self, arguments);
        return self.apply(self, arguments);
    }
}
Function.prototype.after = function (afterFn) {
    var self = this;
    return function () {
        var res = self.apply(self, arguments);
        afterFn.apply(self, arguments);
        return res;
    }
}
var before = function (fn, beforeFn) {
    return function () {
        beforeFn.apply(this, arguments);
        return fn.apply(this, arguments);
    }
};
var after = function (fn, afterFn) {
    return function () {
        var res = fn.apply(this, arguments);
        afterFn.apply(this, arguments);
        return res;
    }
};
var fn = function () {
    console.log('fn');
};
fn = before(fn, function () {
    console.log('before');
});
fn = after(fn, function () {
    console.log('after');
});
// fn();
var fn1 = function () {
    console.log('fn1');
};
fn1 = fn1.before(function () {
    console.log('before');
});
fn1 = fn1.after(function () {
    console.log('after1');
}).after(function () {
    console.log('after2');
});
fn1();