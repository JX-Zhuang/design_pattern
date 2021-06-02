//对象池
var objectPoolFactory = function (createObjFn) {
    var objectPool = [];
    return {
        create: function () {
            var obj = objectPool.length === 0 ? createObjFn.apply(this, arguments) : objectPool.shift();
            return obj;
        },
        recover: function (obj) {
            objectPool.push(obj);
        }
    }
};
var iframeFactory = objectPoolFactory(function () {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.onload = function () {
        iframe.onload = null;
        iframeFactory.recover(iframe);
    }
    return iframe;
});
var iframe1 = iframeFactory.create();
iframe1.src = 'http://baidu.com';
var iframe2 = iframeFactory.create();
iframe2.src = 'http://qq.com';
setTimeout(() => {
    var iframe3 = iframeFactory.create();
    iframe3.src = 'http://163.com';
}, 3000);