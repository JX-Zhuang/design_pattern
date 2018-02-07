let EventEmitter = require('events');
let util = require('util');
util.inherits(PushFile, EventEmitter);

function PushFile() {
    EventEmitter.call(this);
}

function pushFileListener(id) {
    console.log(`上传文件,id:${id}`);
}

let proxyPushFileListener = (function () {
    let cache = [],timer;
    return function (id) {
        cache.push(id);
        if(timer)
            return;
        timer = setTimeout(function () {
            pushFileListener(cache.join(','));
            clearTimeout(timer);
            timer = null;
            cache.length = 0;
        },1000);
    };
})();
let pushFile = new PushFile();
pushFile.on('push', proxyPushFileListener);
pushFile.emit('push', 1);
pushFile.emit('push', 2);
pushFile.emit('push', 3);
setTimeout(function () {
    pushFile.emit('push', 4);
},2000);
