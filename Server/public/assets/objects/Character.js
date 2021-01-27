import { COLLISION_DAMAGE, COLLISION_PLAYER, COLLISION_WORLD } from "./Global.js";

export class Character extends Phaser.Physics.Matter.Sprite {

    constructor(scene, x, y, sprite_tag) {
        super(scene.matter.world, x, y, sprite_tag);
        scene.add.existing(this);

        this.scene = scene;
        this.touching = {
            ground: false,
            left: false,
            right: false
        }

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const offsetX = this.width / 2;
        const offsetY = this.height / 2 + 2;
        const width = 18;
        const height = 32;
        const radius = 8;

        const main =    Bodies.rectangle(offsetX            , offsetY               , width                 , height                , { label: 'main'   , chamfer: { radius: radius }});
        const left =    Bodies.rectangle(offsetX - width / 4, offsetY               , width / 2             , height - (radius * 2) , { label: 'left'   , isSensor: true });
        const bottom =  Bodies.rectangle(offsetX            , offsetY + height / 2  , width - (radius * 2)  , 2                     , { label: 'bottom' , isSensor: true });
        const right =   Bodies.rectangle(offsetX + width / 4, offsetY               , width / 2             , height - (radius * 2) , { label: 'right'  , isSensor: true });
        const hitbox =  Bodies.rectangle(offsetX            , offsetY               , width                 , height                , { label: 'hitbox' , isSensor: true });

        const compound = Body.create({
            parts: [main, left, bottom, right, hitbox],
            frictionStatic: 0,
            frictionAir: 0.02,
            friction: 0.1,
            label: 'player'
        });

        this
            .setExistingBody(compound)
            .setFixedRotation()
            .setPosition(x, y)
            .setCollisionCategory(COLLISION_PLAYER)
            .setCollidesWith([COLLISION_WORLD, COLLISION_DAMAGE])

        this.sensors = {
            left: left,
            bottom: bottom,
            right: right,
            hitbox: hitbox
        }

        this.scene.matter.world.on("beforeupdate", this.resetTouching, this);

        this.scene.matterCollision.addOnCollideStart({
            objectA: [this.sensors.left, this.sensors.bottom, this.sensors.right],
            callback: this.onSensorCollide,
            context: this
        });

        this.scene.matterCollision.addOnCollideActive({
            objectA: [this.sensors.left, this.sensors.bottom, this.sensors.right],
            callback: this.onSensorCollide,
            context: this
        });
    }

    onSensorCollide({ bodyA, bodyB, pair }) {
        if (bodyB.isSensor) return;

        if (bodyA === this.sensors.left) {
            this.touching.left = true;
        } else if (bodyA === this.sensors.right) {
            this.touching.right = true;
        } else if (bodyA === this.sensors.bottom) {
            this.touching.ground = true;
        }
    }

    resetTouching() {
        this.touching.left = false;
        this.touching.right = false;
        this.touching.ground = false;
    }

    destroy() {
        if (this.scene.matter.world) {
            this.scene.matter.world.off("beforeupdate", this.resetTouching, this);
        }

        const sensors = [this.sensors.bottom, this.sensors.left, this.sensors.right];

        this.scene.matterCollision.removeOnCollideStart({ objectA: sensors });
        this.scene.matterCollision.removeOnCollideActive({ objectA: sensors });
    }
}