var Validator = function () {
    this.cache = [];
};
Validator.prototype.add = function (value,strategy,errMsg) {
    this.cache.push(function () {
        return strategy(value,errMsg);
    })
};
Validator.prototype.start = function () {
    for(var i = 0,validatorFunc; validatorFunc = this.cache[i++];){
        var msg = validatorFunc();
        if(msg) return msg;
    }
};
var obj = {
    userName:'1',
    passWord:'111111',
    phoneNumber:'13900000000'
};
var strategies = {
    isNonEmpty:function (value,errMsg) {
        if(value==''){
            return errMsg;
        }
    },
    minLength:function (length) {
        return function (value,errMsg) {
            if(value.length<length){
                return errMsg;
            }
        };
    },
    isMobile:function (value,errMsg) {
        if(!/^1(3|5|8)[0-9]{9}$/.test(value)){
            return errMsg;
        }
    }
};
var validataFunc = function () {
    var validator = new Validator();
    validator.add(obj.userName,strategies.isNonEmpty,'用户名不能为空');
    validator.add(obj.passWord,strategies.minLength(6),'密码不能小于6位');
    validator.add('1223',strategies.minLength(6),'密码不能小于10位');
    validator.add(obj.phoneNumber,strategies.isMobile,'手机格式不正确');
    var errMsg = validator.start();
    return errMsg;
};
var errMsg = validataFunc();
if(errMsg){
    console.log(errMsg);
}else {
    console.log('ok');
}
