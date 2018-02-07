//基于javascript
var strategies = {
    'S': function (salary) {
        return salary * 4;
    },
    'A': function (salary) {
        return salary * 3;
    },
    'B': function (salary) {
        return salary * 2;
    }
};
var getBonus = function (level, salary) {
    return strategies[level](salary);
};
console.log(getBonus('S',1000));