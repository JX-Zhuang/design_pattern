var setCommand = function (command) {
    // button.onClick = function () {
    command();
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
setCommand(menuBar.refresh);
setCommand(subMenu.add);
setCommand(subMenu.del);