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
    operations.playerDead = function (player) {
        var team = player.team,
            teamPlayers = players[team];
        var all_dead = true;
        for (const item of teamPlayers) {
            if (item.state !== 'dead') {
                all_dead = false;
                break;
            }
        }
        if (all_dead) {
            for (const item of teamPlayers) {
                item.lose();
            }
            for (var color in players) {
                if (color !== team) {
                    var teamPlayers = players[color];
                    for (const item of teamPlayers) {
                        item.win();
                    }
                }
            }
        }
    };
    var ReceiveMessage = function (message, ...argus) {
        operations[message].apply(this, argus);
    };
    return {
        ReceiveMessage
    };
})();

var p1 = playerFactory('皮蛋', 'red'),
    p2 = playerFactory('小乖', 'red'),
    p3 = playerFactory('小强', 'red');


var p4 = playerFactory('小明', 'blue'),
    p5 = playerFactory('葱头', 'blue'),
    p6 = playerFactory('胖墩', 'blue');

// p1.die();
// p2.die();
// p3.die();

// p1.remove();
// p2.remove();
// p3.die();

p1.changeTeam('blue');
p2.die();
p3.die();