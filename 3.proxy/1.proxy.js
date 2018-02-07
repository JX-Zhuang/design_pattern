var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function (src) {
            imgNode.src = src;
        }
    }
})();
var proxyImage = (function () {
    var img = new Image;
    img.onload = function () {
        myImage.setSrc(this.src);
    };
    return {
        setSrc: function (src) {
            myImage.setSrc('./1.png');
            img.src = src;
        }
    }
})();
proxyImage.setSrc('http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg');