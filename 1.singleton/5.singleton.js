//惰性单例
function getSingleton(fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this,arguments));
    }
}
var a = function () {
    var instance;
    if(!instance){
        instance = 'A';
    }
    console.log('我是单例');
    return instance;
};
var aSingle = getSingleton(a);
function render() {
    aSingle();
    console.log('b');
}
render();
render();
render();
render();
render();
