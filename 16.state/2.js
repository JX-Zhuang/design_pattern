const FSM = {
    offLightState: {
        execute() {
            console.log('弱光');
            this.currentState = FSM.weakLightState;
        }
    },
    weakLightState: {
        execute() {
            console.log('强光');
            this.currentState = FSM.strongLightState;
        }
    },
    strongLightState: {
        execute() {
            console.log('关灯');
            this.currentState = FSM.offLightState;
        }
    }
};
class Light {
    constructor() {
        this.currentState = FSM.offLightState;
    }
    onClick() {
        this.currentState.execute.call(this);
    }
}
const light = new Light();
light.onClick();
light.onClick();
light.onClick();
light.onClick();