class Plane {
    fire() {
        console.log('普通子弹');
    }
}
class MissileDecorator {
    constructor(plane) {
        this.plane = plane;
    }
    fire() {
        this.plane.fire();
        console.log('导弹');
    }
}
class AtomDecorator {
    constructor(plane) {
        this.plane = plane;
    }
    fire() {
        this.plane.fire();
        console.log('原子弹');
    }
}
let plane = new Plane();
plane = new MissileDecorator(plane);
plane = new AtomDecorator(plane);
plane.fire();