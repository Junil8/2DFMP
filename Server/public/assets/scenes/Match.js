import { TestMap } from '../maps/TestMap.js';
import { Controller } from '../objects/Controller.js';
import { Player } from '../objects/Player.js';

export class Match extends Phaser.Scene {

    constructor() {
        super({ key: "Match" });
    }

    preload() {
        this.load.scenePlugin('Slopes', Slopes);
    }

    create() {
        this.map = new TestMap(this);

        this.player = new Player(this, this.map.spawn1.x, this.map.spawn1.y, 'red_adventure');
        this.player2 = new Player(this, this.map.spawn2.x, this.map.spawn2.y, 'green_adventure');
        
        this.player.sprite.setDepth(1);

        this.controller = new Controller(this, this.player);

        this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
        this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);
        this.cameras.main.setZoom(2);
    }

    update() {}
}