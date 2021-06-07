var plane = {
    fire() {
        console.log('普通');
    }
};
var missileDecorator = function () {
    console.log('导弹');
};
var atomDecorator = function () {
    console.log('原子弹');
};
var fire1 = plane.fire;
plane.fire = function () {
    fire1();
    missileDecorator();
};
var fire2 = plane.fire;
plane.fire = function () {
    fire2();
    atomDecorator();
};
plane.fire();