import { Character } from "./Character.js";
import { PlayerState } from "./Global.js";

export class Player {

    constructor(scene, x, y, sprite_tag) {
        this.scene = scene;

        this.state = PlayerState.idle;
        this.destroyed = false;

        this.sprite = new Character(this.scene, x, y, sprite_tag);

        this.scene.events.on("update", this.update, this);
        this.scene.events.once("shutdown", this.destroy, this);
        this.scene.events.once("destroy", this.destroy, this);
    }

    setState(state) {
        if (this.destroyed) return;

        this.state = state;
    }

    update() {
        if (this.destroyed) return;

        this.updateAnimation();
    }

    updateAnimation() {
        switch(this.state) {
            case PlayerState.running: this.sprite.anims.play('run', true); break;

            case PlayerState.crouching: this.sprite.anims.play('crouch', true); break;
            case PlayerState.sneaking: this.sprite.anims.play('crouch_walk', true); break;

            case PlayerState.falling: this.sprite.anims.play('fall', true); break;
            case PlayerState.flying: this.sprite.anims.play('fly', true); break;

            case PlayerState.punching1: this.sprite.anims.play('punch_1', true); break;
            case PlayerState.punching2: this.sprite.anims.play('punch_2', true); break;
            case PlayerState.punching3: this.sprite.anims.play('punch_3', true); break;

            case PlayerState.kicking1: this.sprite.anims.play('kick_1', true); break;
            case PlayerState.kicking2: this.sprite.anims.play('kick_2', true); break;

            case PlayerState.wallSliding: this.sprite.anims.play('wall_slide', true); break;
            case PlayerState.sliding: this.sprite.anims.play('slide', true); break;
            case PlayerState.standing: this.sprite.anims.play('stand', true); break;

            case PlayerState.knockedDown: this.sprite.anims.play('knock_down', true); break;
            case PlayerState.gettingUp: this.sprite.anims.play('get_up', true); break;

            default: this.sprite.anims.play('idle', true); break;
        }
    }

    destroy() {
        this.destroyed = true;

        this.scene.events.off("update", this.update, this);
        this.scene.events.off("shutdown", this.destroy, this);
        this.scene.events.off("destroy", this.destroy, this);

        this.sprite.destroy();
    }
}