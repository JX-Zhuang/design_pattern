function Singleton(name) {
    this.name = name;
}
Singleton.getInstance = function (name) {
    if(this.instace){
        return this.instace;
    }else {
        this.instace = new Singleton(name);
        return this.instace;
    }
};
var a = Singleton.getInstance('a');
var b = Singleton.getInstance('b');
console.log(a===b,b.name);
//没有用new 写法不方便