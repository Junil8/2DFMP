import { Player } from '../objects/Player.js';

export class Match extends Phaser.Scene {

    player;

    constructor() {
        super({ key: "Match" });
    }

    preload() {
        this.load.scenePlugin('Slopes', Slopes);
    }

    create() {
        const map = this.make.tilemap({ key: 'test_map' });

        const tileset = map.addTilesetImage('caves_of_gallet', 'caves_of_gallet');

        const fluidLayer = map.createLayer('fluid', tileset, 0, 0);
        const fallsLayer = map.createLayer('falls', tileset, 0, 0);
        const platformsLayer = map.createLayer('platforms', tileset, 0, 0);
        const foliageLayer = map.createLayer('foliage', tileset, 0, 0);

        fluidLayer.setCollisionByProperty({ collides: true });
        fallsLayer.setCollisionByProperty({ collides: true });
        platformsLayer.setCollisionByProperty({ collides: true });
        foliageLayer.setCollisionByProperty({ collides: true });

        this.matter.world.convertTilemapLayer(fluidLayer);
        this.matter.world.convertTilemapLayer(fallsLayer);
        this.matter.world.convertTilemapLayer(platformsLayer);
        this.matter.world.convertTilemapLayer(foliageLayer);

        const spawn_1 = map.findObject("objects", obj => obj.name === "spawn_1");
        const spawn_2 = map.findObject("objects", obj => obj.name === "spawn_2");
        const spawn_3 = map.findObject("objects", obj => obj.name === "spawn_3");
        const spawn_4 = map.findObject("objects", obj => obj.name === "spawn_4");

        this.player = new Player(this, spawn_1.x, spawn_1.y, "red_adventure");

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);
        this.cameras.main.setZoom(2);
    }

    update() {

    }
}