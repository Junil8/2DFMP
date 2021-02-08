import { COLLISION_DAMAGE, COLLISION_CHARACTER, COLLISION_WORLD, PlayerAnimation, PlayerSettings } from "./Global.js";

export class Character extends Phaser.Physics.Matter.Sprite {

    constructor(scene, x, y, sprite_tag, color, width = undefined, height = undefined) {
        super(scene.matter.world, x, y, sprite_tag);
        scene.add.existing(this);

        this.color = color;
        this.scene = scene;
        this.touching = {
            ground: false,
            left: false,
            right: false
        }
        this.status = {
            moving: false,
            falling: false,
            jumping: false,
            crouching: false,
            waiting: false
        }

        if (width == undefined) width = this.width;
        if (height == undefined) height = this.height;

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;

        const offset = new Phaser.Geom.Point(this.width / 2, (this.height / 2) + (this.height - height));
        const offsetSensorLeft = new Phaser.Geom.Point(offset.x - width / 4, offset.y);
        const offsetSensorRight = new Phaser.Geom.Point(offset.x + width / 4, offset.y);
        const offsetSensorBottom = new Phaser.Geom.Point(offset.x, offset.y + height / 2);
        const offsetCrouchingHitbox = new Phaser.Geom.Point(offset.x, offset.y + (height * 0.125));
        const radius = width / 4;

        const sizeSensorLeft = new Phaser.Math.Vector2(width / 2, height - (radius * 2));
        const sizeSensorRight = new Phaser.Math.Vector2(width / 2, height - (radius * 2));
        const sizeSensorBottom = new Phaser.Math.Vector2(width - radius * 2, 2);
        const sizeCrouchingHitbox = new Phaser.Math.Vector2(width, height * 0.75);

        const main = Bodies.rectangle(offset.x, offset.y, width, height, { label: 'main', chamfer: { radius: radius }});

        const left = Bodies.rectangle(offsetSensorLeft.x, offsetSensorLeft.y, sizeSensorLeft.x, sizeSensorLeft.y, { label: 'left', isSensor: true });
        const bottom = Bodies.rectangle(offsetSensorBottom.x, offsetSensorBottom.y, sizeSensorBottom.x, sizeSensorBottom.y, { label: 'bottom', isSensor: true });
        const right = Bodies.rectangle(offsetSensorRight.x, offsetSensorRight.y, sizeSensorRight.x, sizeSensorRight.y, { label: 'right', isSensor: true });

        const standingHitbox = Bodies.rectangle(offset.x, offset.y, width, height, { label: 'hitbox', isSensor: true });
        const crouchingHitbox = Bodies.rectangle(offsetCrouchingHitbox.x, offsetCrouchingHitbox.y, sizeCrouchingHitbox.x, sizeCrouchingHitbox.y, { label: 'hitbox', isSensor: true });

        const compound = Body.create({
            parts: [main, left, bottom, right, standingHitbox, crouchingHitbox],
            frictionStatic: 0,
            frictionAir: 0.02,
            friction: 0.1,
            label: 'character'
        });

        this.setExistingBody(compound)
            .setFixedRotation()
            .setPosition(x, y)
            .setCollisionCategory(COLLISION_CHARACTER)
            .setCollidesWith([COLLISION_WORLD, COLLISION_DAMAGE])

        this.sensors = {
            left: left,
            bottom: bottom,
            right: right,
            standingHitbox: standingHitbox,
            crouchingHitbox: crouchingHitbox
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

        this.destroyed = false;

        this.scene.events.on("update", this.update, this);
        this.scene.events.once("shutdown", this.destroy, this);
        this.scene.events.once("destroy", this.destroy, this);
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

    update() {
        if (this.destroyed) return;

        this.status.moving = this.body.velocity.x != 0;
        this.status.falling = this.body.velocity.y > 0 && !this.touching.ground;
        this.status.jumping = this.body.velocity.y <= 0 && !this.touching.ground;
        this.status.crouching = this.touching.ground && this.status.crouching;

        if (this.status.jumping && !(this.touching.left || this.touching.right)) this.play(PlayerAnimation.jumping);
        if (this.status.falling && !(this.touching.left || this.touching.right)) this.play(PlayerAnimation.falling);
        if (!this.touching.ground && (this.touching.left || this.touching.right)) this.play(PlayerAnimation.wallSliding);
        if (this.touching.ground && !this.status.moving && !this.status.crouching) this.play(PlayerAnimation.idle);
        if (this.touching.ground && this.status.moving && !this.status.crouching) this.play(PlayerAnimation.running);
        if (this.touching.ground && !this.status.moving && this.status.crouching) this.play(PlayerAnimation.crouching);
        if (this.touching.ground && this.status.moving && this.status.crouching) this.play(PlayerAnimation.sneaking);
    }

    jump() {
        if (this.destroyed) return;
        if (this.status.waiting) return;

        if (!this.touching.ground && (this.touching.left || this.touching.right)) {
            if (this.touching.left) this.setVelocity(PlayerSettings.running_speed, -PlayerSettings.jumping_force);
            else this.setVelocity(-PlayerSettings.running_speed, -PlayerSettings.jumping_force);

            this.toggleFlipX();
        } else {
            this.setVelocityY(-PlayerSettings.jumping_force);
        }
    }

    move(direction) {
        if (this.destroyed) return;
        if (this.status.waiting) return;

        if (!this.touching.left && direction < 0) {
            if (this.status.crouching) this.setVelocityX(-PlayerSettings.crouching_speed);
            else this.setVelocityX(-PlayerSettings.running_speed);

            this.setFlipX(true);
        }

        if (!this.touching.right && direction > 0) {
            if (this.status.crouching) this.setVelocityX(PlayerSettings.crouching_speed);
            else this.setVelocityX(PlayerSettings.running_speed);

            this.setFlipX(false);
        }
    }

    play(key) {
        if (this.destroyed) return;

        const current = this.anims.currentAnim?.key;
        const animation = this.color + '_' + key;
        let interrupt = true;

        if (animation == current && this.anims.isPlaying) return;

        if (current) {
            let currentKey = current.replace(`${this.color}_`, '');

            switch(currentKey) {
                case PlayerAnimation.gettingUp: interrupt = false; break;
                case PlayerAnimation.kicking1: interrupt = false; break;
                case PlayerAnimation.kicking2: interrupt = false; break;
                case PlayerAnimation.knockedDown: interrupt = false; break;
                case PlayerAnimation.punching1: interrupt = false; break;
                case PlayerAnimation.punching2: interrupt = false; break;
                case PlayerAnimation.punching3: interrupt = false; break;
                case PlayerAnimation.punchingWhileRunning: interrupt = false; break;
                default: interrupt = true; break;
            }
        }

        if (!interrupt && this.anims.isPlaying) {
            this.status.waiting = true;
            return;
        } else {
            this.status.waiting = false;
        }

        this.anims.play(animation, true);
    }

    destroy() {
        this.destroyed = true;

        this.scene.events.off("update", this.update, this);
        this.scene.events.off("shutdown", this.destroy, this);
        this.scene.events.off("destroy", this.destroy, this);

        if (this.scene.matter.world) {
            this.scene.matter.world.off("beforeupdate", this.resetTouching, this);
        }

        const sensors = [this.sensors.bottom, this.sensors.left, this.sensors.right];

        this.scene.matterCollision.removeOnCollideStart({ objectA: sensors });
        this.scene.matterCollision.removeOnCollideActive({ objectA: sensors });
    }
}