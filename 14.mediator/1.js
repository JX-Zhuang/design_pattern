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
    playerDirector.ReceiveMessage('playerDead', this);
}
Player.prototype.remove = function () {
    playerDirector.ReceiveMessage('removePlayer', this);
}
Player.prototype.changeTeam = function (color) {
    playerDirector.ReceiveMessage('changeTeam', this, color);
}
var playerFactory = function (name, team) {
    var player = new Player(name, team);
    playerDirector.ReceiveMessage('addPlayer', player);
    return player;
}
var playerDirector = (function () {
    var players = {},
        operations = {};
    operations.addPlayer = function (player) {
        var team = player.team;
        players[team] = players[team] || [];
        players[team].push(player);
    };
    operations.removePlayer = function (player) {
        var team = player.team,
            teamPlayers = players[team] || [];
        for (var i = 0; i < teamPlayers.length; i++) {
            if (teamPlayers[i] === player) {
                teamPlayers.splice(i, 1);
            }
        }
    };
    operations.changeTeam = function (player, color) {
        operations.removePlayer(player);
        player.team = color;
        operations.addPlayer(player);
    };
    operations.playerDead = function () {

    };
    var ReceiveMessage = function (message, ...argus) {
        operations[message].apply(this, argus);
    };
    return {
        ReceiveMessage
    };
})();