import { Example } from './scenes/Example.js';

self.PhaserConfig = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    title: "2DFMP",
    version: "0.0.1",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [ Example ]
}