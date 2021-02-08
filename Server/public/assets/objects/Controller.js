import { PlayerAnimation, PlayerSettings } from "./Global.js";

export class Controller {

    constructor(scene, character) {
        this.scene = scene;
        this.character = character;

        this.canJump = false;
        this.canDoubleJump = false;

        this.key = this.scene.input.keyboard.addKeys({
            up: PlayerSettings.input_key.up,
            left: PlayerSettings.input_key.left,
            down: PlayerSettings.input_key.down,
            right: PlayerSettings.input_key.right,
            jump: PlayerSettings.input_key.jump,
            punch: PlayerSettings.input_key.punch,
            kick: PlayerSettings.input_key.kick
        });

        this.scene.events.on("update", this.update, this);
        this.scene.events.once("shutdown", this.destroy, this);
        this.scene.events.once("destroy", this.destroy, this);
    }

    jump() {
        if (this.destroyed) return;

        if (this.canJump) {
            this.canJump = false;
            this.canDoubleJump = true;
            this.character.jump();
        } else if (this.canDoubleJump) {
            this.canDoubleJump = false;
            this.character.jump();
        }
    }

    punch() {
        if (this.character.status.moving) this.character.play(PlayerAnimation.punchingWhileRunning);
        else this.character.play(PlayerAnimation.punching1);
    }

    kick() {
        this.character.play(PlayerAnimation.kicking1);
    }

    update() {
        if (this.destroyed) return;

        if (this.character.touching.ground || (this.character.touching.left || this.character.touching.right)) this.canJump = true;

        if (this.key.left.isDown) this.character.move(-1);
        if (this.key.right.isDown) this.character.move(1);
        if (this.key.down.isDown) this.character.status.crouching = true;
        else this.character.status.crouching = false;

        if (Phaser.Input.Keyboard.JustDown(this.key.jump)) this.jump();
        if (Phaser.Input.Keyboard.JustDown(this.key.punch)) this.punch();
        if (Phaser.Input.Keyboard.JustDown(this.key.kick)) this.kick();
    }

    destroy() {
        this.destroyed = true;

        this.scene.events.off("update", this.update, this);
        this.scene.events.off("shutdown", this.destroy, this);
        this.scene.events.off("destroy", this.destroy, this);
    }

}