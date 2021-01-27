import { PlayerSettings, PlayerState } from "./Global.js";

export class Controller {

    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        this.canJump = false;
        this.canDoubleJump = false;

        this.isTouchingWall = false;
        this.isGrounded = false;
        this.isMoving = false;
        this.isCrouching = false;
        this.isFalling = false;

        this.blockedLeft = false;
        this.blockedRight = false;

        this.direction = this.scene.input.keyboard.addKeys({
            up: PlayerSettings.input_key.up,
            left: PlayerSettings.input_key.left,
            down: PlayerSettings.input_key.down,
            right: PlayerSettings.input_key.right
        });

        this.scene.input.keyboard.on('keydown-' + PlayerSettings.input_key.jump, () => this.jump());
        this.scene.input.keyboard.on('keydown-' + PlayerSettings.input_key.punch, () => this.punch());
        this.scene.input.keyboard.on('keydown-' + PlayerSettings.input_key.kick, () => this.kick());

        this.scene.events.on("update", this.update, this);
        this.scene.events.once("shutdown", this.destroy, this);
        this.scene.events.once("destroy", this.destroy, this);
    }

    jump() {
        if (this.destroyed) return;

        let jumping = false;

        if (this.canJump) {
            this.canJump = false;
            this.canDoubleJump = true;
            jumping = true;
        } else if (this.canDoubleJump) {
            this.canDoubleJump = false;
            jumping = true;
        }

        if (jumping) {
            if (this.isTouchingWall && !this.isGrounded) {
                if (this.blockedLeft) this.player.sprite.setVelocity(PlayerSettings.running_speed, -PlayerSettings.jumping_force);
                else this.player.sprite.setVelocity(-PlayerSettings.running_speed, -PlayerSettings.jumping_force);
    
                this.player.sprite.toggleFlipX();
            }
            
            if (this.isGrounded) {
                this.player.sprite.setVelocityY(-PlayerSettings.jumping_force);
            }
        }
    }

    move(direction) {
        if (!this.blockedLeft && direction < 0) {
            if (this.isCrouching) this.player.sprite.setVelocityX(-PlayerSettings.crouching_speed);
            else this.player.sprite.setVelocityX(-PlayerSettings.running_speed);

            this.player.sprite.setFlipX(true);
            this.isMoving = true;
        }

        if (!this.blockedRight && direction > 0) {
            if (this.isCrouching) this.player.sprite.setVelocityX(PlayerSettings.crouching_speed);
            else this.player.sprite.setVelocityX(PlayerSettings.running_speed);

            this.player.sprite.setFlipX(false);
            this.isMoving = true;
        }

        if (direction == 0) {
            this.isMoving = false;
        }
    }

    update() {
        if (this.destroyed) return;

        this.blockedLeft = this.player.sprite.touching.left;
        this.blockedRight = this.player.sprite.touching.right;
        this.isTouchingWall = ( this.blockedLeft || this.blockedRight );
        this.isGrounded = this.player.sprite.touching.ground;
        this.isCrouching = (this.direction.down.isDown && this.isGrounded);
        this.isFalling = this.player.sprite.body.velocity.y > 0;

        this.canJump = (this.isGrounded || this.isTouchingWall);

        if (this.direction.left.isDown) this.move(-1);
        else if (this.direction.right.isDown) this.move(1);
        else this.move(0);

        this.updatePlayerState();
    }

    updatePlayerState() {
        if (!this.isGrounded && !this.isTouchingWall && this.isFalling) this.player.setState(PlayerState.falling);
        if (!this.isGrounded && !this.isTouchingWall && !this.isFalling) this.player.setState(PlayerState.flying);
        if (!this.isGrounded && this.isTouchingWall) this.player.setState(PlayerState.wallSliding);
        if (this.isGrounded && this.isCrouching && !this.isMoving) this.player.setState(PlayerState.crouching);
        if (this.isGrounded && this.isCrouching && this.isMoving) this.player.setState(PlayerState.sneaking);
        if (this.isGrounded && !this.isCrouching && !this.isMoving) this.player.setState(PlayerState.idle);
        if (this.isGrounded && !this.isCrouching && this.isMoving) this.player.setState(PlayerState.running);
    }

    destroy() {
        this.destroyed = true;

        this.scene.events.off("update", this.update, this);
        this.scene.events.off("shutdown", this.destroy, this);
        this.scene.events.off("destroy", this.destroy, this);
    }

}