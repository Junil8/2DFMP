var socket = io('localhost:8080', {
    query: {
        authorization: window.localStorage.getItem('token'),
    },
});

const config = {
    width:800,
    height: 600,
    parent: 'game-view',
    title: "2DFMP",
    version: "0.0.1",
    fps: 30
}

const game = new Phaser.Game(config);

console.log('Game setup!');