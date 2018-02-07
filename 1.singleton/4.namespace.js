var MyApp = {};
MyApp.addNamespace = function (name) {
    if (typeof name === 'string') {
        var parts = name.split('.');
        var current = MyApp;
        for(var index in parts){
            var key = parts[index];
            if(!current[key]){
                current[key] = {};
            }
            current = current[key];
        }
    }
};
MyApp.addNamespace('a');
MyApp.addNamespace('a.b');
MyApp.addNamespace('b.c');
console.log(MyApp);