var setCommand = function (command) {
    // button.onClick = function () {
    command.execute();
    // }
};
var menuBar = {
    refresh() {
        console.log('刷新菜单目录');
    }
};
var subMenu = {
    add() {
        console.log('add submenu');
    },
    del() {
        console.log('delete submenu')
    }
};
class RefreshMenuBarCommand {
    constructor(receiver) {
        this.receiver = receiver;
    }
    execute() {
        this.receiver.refresh();
    }
}
class AddSubMenuCommand {
    constructor(receiver) {
        this.receiver = receiver;
    }
    execute() {
        this.receiver.add();
    }
}
class DelSubMenuCommand {
    constructor(receiver) {
        this.receiver = receiver;
    }
    execute() {
        this.receiver.del();
    }
}
var refreshMenuBarCommand = new RefreshMenuBarCommand(menuBar);
var addSubMenuCommand = new AddSubMenuCommand(subMenu);
var delSubMenuCommand = new DelSubMenuCommand(subMenu);
setCommand(refreshMenuBarCommand);
setCommand(addSubMenuCommand);
setCommand(delSubMenuCommand);