var closeDoorCommand = {
    execute: () => console.log('close door')
};
var openPCCommand = {
    execute: () => console.log('open PC')
};
var openQQCommand = {
    execute: () => console.log('open QQ')
};

var openTVCommand = {
    execute: () => console.log('openTVCommand')
};
var openSoundCommand = {
    execute: () => console.log('openSoundCommand')
};
var macroCommand = function () {
    return {
        commandList: [],
        add: function (command) {
            this.commandList.push(command)
        },
        execute: function () {
            for (var command of this.commandList) {
                command.execute();
            }
        }
    }
};
var command1 = macroCommand();
command1.add(closeDoorCommand);
command1.add(openPCCommand);
command1.add(openQQCommand);
var command2 = macroCommand();
command2.add(openTVCommand);
command2.add(openSoundCommand);

var command = macroCommand();
command.add(command1);
command.add(command2);
command.execute();