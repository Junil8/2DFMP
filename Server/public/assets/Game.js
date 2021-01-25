// Skift mellem Example & Test_Julian hvis du vil skifte scene
import { Test_Julian } from './scenes/Test_Julian.js';

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
            debug: false
        }
    },
    scene: [ Test_Julian ]
}