var obj = {
    userName: '',
    passWord: '',
    phoneNumber: '13900000000'
};
function isNonEmpty(value, errMsg) {
    if (value == '') {
        return errMsg;
    }
}

function minLength(length) {
    return function (value, errMsg) {
        if (value.length < length) {
            return errMsg;
        }
    }
}

function isMobile(value, errMsg) {
    if (!/^1(3|5|8)[0-9]{9}$/.test(value)) {
        return errMsg;
    }
}

var Validator = function () {
    this.cache = [];
};
Validator.prototype.add = function (value, ruleAry) {
    for (var i = 0; i < ruleAry.length; i++) {
        let ruleObj = ruleAry[i];
        this.cache.push(function () {
            var strategy = ruleObj.strategy;
            return strategy(value,ruleObj.errMsg);
        });
    }
};
Validator.prototype.start = function () {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
        var errMsg = validatorFunc();
        if (errMsg) {
            return errMsg;
        }
    }
};

function validatorFunc(password='') {
    var valida = new Validator();
    valida.add(password, [{
        strategy: isNonEmpty,
        errMsg: '密码不能为空'
    }, {
        strategy: minLength(6),
        errMsg: '密码不能低于6位'
    }]);
    var errMsg = valida.start();
    if (errMsg) {
        console.log(errMsg);
    } else {
        console.log('ok');
    }
}

validatorFunc();
validatorFunc('12345');