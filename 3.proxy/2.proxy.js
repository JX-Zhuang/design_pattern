var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return function (src) {
        imgNode.src = src;
    };
})();
var proxyImage = (function () {
    var image = new Image;
    image.onload = function () {
        myImage(this.src);
    };
    return function (src) {
        myImage('./1.png');
        image.src = src;
    };
})();
// myImage('http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg');
proxyImage('http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg');