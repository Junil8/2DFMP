import { PlayerSettings, COLLISION_DAMAGE, COLLISION_PLAYER, COLLISION_WORLD, State } from "./Global.js";

export class Player {

    constructor(scene, x, y, sprite_tag) {
        this.scene = scene;

        this.sprite = this.scene.matter.add.sprite(0, 0, sprite_tag, 0);

        this.state = State.idle;
        this.destroyed = false;
        this.touching = {
            ground: false,
            left: false,
            right: false
        }
        this.crouching = false;
        this.moving = false;
        this.falling = false;

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const offsetX = this.sprite.width / 2;
        const offsetY = this.sprite.height / 2 + 2;
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

        this.sprite
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

    jump() {
        if (this.destroyed) return;

        if (this.canJump) {
            this.canJump = false;
            this.canDoubleJump = true;

            if (this.state === State.wallSliding) {
                if (this.touching.left) this.sprite.setVelocity(PlayerSettings.running_speed, -PlayerSettings.jumping_force);
                else this.sprite.setVelocity(-PlayerSettings.running_speed, -PlayerSettings.jumping_force);

                this.sprite.toggleFlipX();
            } else this.sprite.setVelocityY(-PlayerSettings.jumping_force);

        } else if (this.canDoubleJump) {
            this.canDoubleJump = false;

            if (this.state === State.wallSliding) {
                if (this.touching.left) this.sprite.setVelocity(PlayerSettings.running_speed, -PlayerSettings.jumping_force);
                else this.sprite.setVelocity(-PlayerSettings.running_speed, -PlayerSettings.jumping_force);

                this.sprite.toggleFlipX();
            } else this.sprite.setVelocityY(-PlayerSettings.jumping_force);
        }
    }

    move(direction) {
        if (this.destroyed) return;

        if (direction < 0) {
            this.sprite.setFlipX(true);
      
            if (!(!this.touching.ground && this.touching.left)) {
                this.sprite.setVelocityX(this.crouching ? -PlayerSettings.crouching_speed : -PlayerSettings.running_speed);
                this.moving = true;
            }
        } else if (direction > 0) {
            this.sprite.setFlipX(false);
      
            if (!(!this.touching.ground && this.touching.right)) {
                this.sprite.setVelocityX(this.crouching ? PlayerSettings.crouching_speed : PlayerSettings.running_speed);
                this.moving = true;
            }
        } else {
            this.moving = false;
        }
    }

    crouch() {
        if (this.destroyed) return;

        this.crouching = true;
    }

    stand() {
        if (this.destroyed) return;

        this.crouching = false;
    }

    update() {
        if (this.destroyed) return;

        if (this.touching.ground || this.touching.left || this.touching.right) this.canJump = true;

        this.updateState();
        this.updateFriction();
        this.updateAnimation();
    }

    updateState() {
        this.state = State.idle;

        if (this.touching.ground && this.moving && !this.crouching) this.state = State.running;
        if (this.touching.ground && this.moving && this.crouching) this.state = State.sneaking;
        if (this.touching.ground && !this.moving && this.crouching) this.state = State.crouching;

        if (!this.touching.ground && (!this.falling || this.sprite.body.velocity.y <= 0)) this.state = State.flying;
        if (!this.touching.ground && (this.falling || this.sprite.body.velocity.y > 0)) this.state = State.falling;
        if (!this.touching.ground && (this.touching.left || this.touching.right)) this.state = State.wallSliding;
    }

    updateFriction() {
        switch(this.state) {
            case State.wallSliding: this.sprite.setFriction(0.5); break;
            default: this.sprite.setFriction(0.1); break;
        }
    }

    updateAnimation() {
        switch(this.state) {
            case State.running: this.sprite.anims.play('run', true); break;
            case State.sneaking: this.sprite.anims.play('crouch_walk', true); break;

            case State.falling: this.sprite.anims.play('fall', true); break;
            case State.wallSliding: this.sprite.anims.play('wall_slide', true); break;
            case State.flying: this.sprite.anims.play('fly', true); break;

            case State.crouching: this.sprite.anims.play('crouch', true); break;
            default: this.sprite.anims.play('idle', true); break;
        }
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

        this.sprite.destroy();
    }
  }