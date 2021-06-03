function Player(name, team) {
    this.name = name;
    this.team = team;
    this.state = 'alive';
}
Player.prototype.win = function () {
    console.log(this.name + ' won');
}
Player.prototype.lose = function () {
    console.log(this.name + ' lost');
}
Player.prototype.die = function () {
    this.state = 'dead';
    playerDirector.ReceieveMessage('playerDead', this);
}
Player.prototype.remove = function () {
    playerDirector.ReceieveMessage('removePlayer', this);
}
Player.prototype.changeTeam = function () {
    playerDirector.ReceieveMessage('changeTeam', this);
}
var playerFactory = function (name, team) {
    var player = new Player(name, team);
    playerDirector.ReceieveMessage('addPlayer', player);
    return player;
}