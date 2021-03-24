import { TestMap } from '../maps/TestMap.js';
import { Character } from '../objects/Character.js';
import { Controller } from '../objects/Controller.js';

export class Match extends Phaser.Scene {

    constructor() {
        super({ key: "Match" });
    }

    preload() {
        // Load a plugin to smooth collisions in the world
        this.load.scenePlugin('Slopes', Slopes);
    }

    create() {
        // Create map on screen
        this.map = new TestMap(this);

        // Create characters
        this.player = new Character(this, this.map.spawn1.x, this.map.spawn1.y, 'adventure', 'green', 18, 32);
        this.player2 = new Character(this, this.map.spawn2.x, this.map.spawn2.y, 'adventure', 'red', 18, 32);
        
        this.player.setDepth(1);

        // Setup controls for player
        this.controller = new Controller(this, this.player);

        // Setup camera to follow player, area to move inside and zoom
        this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
        this.cameras.main.startFollow(this.player, false, 0.5, 0.5);
        this.cameras.main.setZoom(2);
    }

    update() {}
}