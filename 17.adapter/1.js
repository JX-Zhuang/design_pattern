var googleMap = {
    show() {
        console.log('google')
    }
}
var baiduMap = {
    display() {
        console.log('baiduMap')
    }
}
var renderMap = function (map) {
    if (typeof map.show === 'function') {
        map.show();
    }
}
var baiduMapAdapter = {
    show() {
        baiduMap.display();
    }
}
renderMap(googleMap);
renderMap(baiduMapAdapter);