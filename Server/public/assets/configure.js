import { Example } from './scenes/Example.js';

const socket = io('localhost:8080', {
    query: {
        authorization: window.localStorage.getItem('token'),
    },
});

const config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    canvas: document.getElementById('game-view'),
    title: "2DFMP",
    version: "0.0.1",
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
        Example
    ],
    fps: 30
}

const game = new Phaser.Game(config);