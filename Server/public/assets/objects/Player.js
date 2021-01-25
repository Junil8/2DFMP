export class Player {

    constructor(scene, x, y, sprite) {
        this.scene = scene;

        this.scene.anims.createFromAseprite(sprite);

        // Create the physics-based sprite that we will move around and animate
        this.sprite = this.scene.matter.add.sprite(0, 0, sprite);

        // The player's body is going to be a compound body that looks something like this:
        //
        //                  A = main body
        //
        //                   +---------+
        //                   |         |
        //                 +-+         +-+
        //       B = left  | |         | |  C = right
        //    wall sensor  |B|    A    |C|  wall sensor
        //                 | |         | |
        //                 +-+         +-+
        //                   |         |
        //                   +-+-----+-+
        //                     |  D  |
        //                     +-----+
        //
        //                D = ground sensor
        //
        // The main body is what collides with the world. The sensors are used to determine if the
        // player is blocked by a wall or standing on the ground.

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const { width, height } = this.sprite;
        const offset_x = width / 2;
        const offset_y = height / 2 + 2;

        let body = Bodies.rectangle(offset_x, offset_y, 18, 32, { chamfer: { radius: 10 } });

        this.sensors = {
            bottom: Bodies.rectangle(offset_x, offset_y + 16, 8, 2, { isSensor: true }),
            left: Bodies.rectangle(offset_x - 9, offset_y, 2, 18, { isSensor: true }),
            right: Bodies.rectangle(offset_x + 9, offset_y, 2, 18, { isSensor: true })
        };

        let compound = Body.create({
            parts: [body, this.sensors.bottom, this.sensors.left, this.sensors.right],
            frictionStatic: 0,
            frictionAir: 0.02,
            friction: 0.1
        });

        this.sprite.setExistingBody(compound).setFixedRotation().setPosition(x, y);
        
        // Track which sensors are touching something
        this.touching = { left: false, right: false, ground: false };

        // Before matter's update, reset the player's count of what surfaces it is touching.
        this.scene.matter.world.on("beforeupdate", this.resetTouching, this);

        this.scene.matterCollision.addOnCollideStart({
            objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
            callback: this.onSensorCollide,
            context: this
        });

        this.scene.matterCollision.addOnCollideActive({
            objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
            callback: this.onSensorCollide,
            context: this
        });
        
        // Jumping is going to have a cooldown
        this.canJump = true;
        this.canDoubleJump = false;
        this.jumpCooldownTimer = null;

        this.direction = this.scene.input.keyboard.addKeys({
            up: 'up',
            down: 'down',
            left: 'left',
            right: 'right'
        });

        this.action = this.scene.input.keyboard.addKeys({
            jump: 'space'
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

        let force = this.direction.down.isDown ? 0.0025 : 0.005;
        let speed = this.direction.down.isDown ? 0.5 : 1;

        if (this.touching.ground || this.touching.left || this.touching.right) {
            this.canJump = true;
        }

        if (this.direction.left.isDown) {
            this.sprite.setFlipX(true);
      
            if (!(!this.touching.ground && this.touching.left)) {
                this.sprite.applyForce({ x: -force, y: 0 });
            }
        }
        
        if (this.direction.right.isDown) {
            this.sprite.setFlipX(false);
      
            if (!(!this.touching.ground && this.touching.right)) {
                this.sprite.applyForce({ x: force, y: 0 });
            }
        }

        // Limit horizontal speed, without this the player's velocity would just keep increasing to
        // absurd speeds. We don't want to touch the vertical velocity though, so that we don't
        // interfere with gravity.
        if (this.sprite.body.velocity.x > speed) this.sprite.setVelocityX(speed);
        if (this.sprite.body.velocity.x < -speed) this.sprite.setVelocityX(-speed);

        if (this.action.jump.isDown && this.canJump) {
            this.sprite.setVelocityY(-8);
            this.canJump = false;
            this.canDoubleJump = true;
        } else if (this.action.jump.isDown && this.canDoubleJump) {
            this.sprite.setVelocityY(-8);
            this.canDoubleJump = false;
        }

        // Update the animation/texture based on the state of the player's state
        if (this.touching.ground) {
            if (this.direction.down.isDown) {
                if (this.sprite.body.force.x !== 0) this.sprite.anims.play('crouch_walk', true);
                else this.sprite.anims.play('crouch', true);
            } else {
                if (this.sprite.body.force.x !== 0) this.sprite.anims.play('run', true);
                else this.sprite.anims.play('idle', true);
            }
        } else {
            if (this.sprite.body.velocity.y > 0) this.sprite.anims.play('fall', true);
            else this.sprite.anims.play('fly', true);
        }

        if (!this.touching.ground && (this.touching.left || this.touching.right)) {
            this.sprite.anims.play('wall_slide', true);
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