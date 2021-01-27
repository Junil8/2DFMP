import { COLLISION_WORLD } from "../objects/Global.js";

export class TestMap {

    constructor(scene) {
        const map = scene.make.tilemap({ key: 'test_map' });

        const tileset = map.addTilesetImage('caves_of_gallet', 'caves_of_gallet');

        const fluidLayer = map.createLayer('fluid', tileset, 0, 0);
        const fallsLayer = map.createLayer('falls', tileset, 0, 0);
        const platformsLayer = map.createLayer('platforms', tileset, 0, 0);
        const foliageLayer = map.createLayer('foliage', tileset, 0, 0);

        fluidLayer.setCollisionByProperty({ collides: true })
        fallsLayer.setCollisionByProperty({ collides: true })
        platformsLayer.setCollisionByProperty({ collides: true })
        foliageLayer.setCollisionByProperty({ collides: true })

        scene.matter.world.convertTilemapLayer(fluidLayer);
        scene.matter.world.convertTilemapLayer(fallsLayer);
        scene.matter.world.convertTilemapLayer(platformsLayer);
        scene.matter.world.convertTilemapLayer(foliageLayer);

        for (let i = 0; i < scene.matter.world.localWorld.bodies.length; i++) {        
            let body = scene.matter.world.localWorld.bodies[i];
            body.collisionFilter.category = COLLISION_WORLD;
        }

        this.spawn1 = map.findObject("objects", obj => obj.name === "spawn_1");
        this.spawn2 = map.findObject("objects", obj => obj.name === "spawn_2");
        this.spawn3 = map.findObject("objects", obj => obj.name === "spawn_3");
        this.spawn4 = map.findObject("objects", obj => obj.name === "spawn_4");

        this.width = map.widthInPixels;
        this.height = map.heightInPixels;
    }
}