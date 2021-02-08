import { Character } from "./Character.js";
import { PlayerState } from "./Global.js";

export class Player {

    constructor(scene, x, y, sprite_tag, color) {
        this.scene = scene;

        this.state = PlayerState.idle;
        this.destroyed = false;

        this.sprite = new Character(this.scene, x, y, sprite_tag, color);

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
            case PlayerState.running: this.sprite.playAfterRepeat('run'); break;

            case PlayerState.crouching: this.sprite.playAfterRepeat('crouch'); break;
            case PlayerState.sneaking: this.sprite.playAfterRepeat('crouch_walk'); break;

            case PlayerState.falling: this.sprite.playAfterRepeat('fall'); break;
            case PlayerState.flying: this.sprite.playAfterRepeat('fly'); break;

            case PlayerState.punching1: this.sprite.playAfterRepeat('punch_1'); break;
            case PlayerState.punching2: this.sprite.playAfterRepeat('punch_2'); break;
            case PlayerState.punching3: this.sprite.playAfterRepeat('punch_3'); break;

            case PlayerState.kicking1: this.sprite.playAfterRepeat('kick_1'); break;
            case PlayerState.kicking2: this.sprite.playAfterRepeat('kick_2'); break;

            case PlayerState.wallSliding: this.sprite.playAfterRepeat('wall_slide'); break;
            case PlayerState.sliding: this.sprite.playAfterRepeat('slide'); break;
            case PlayerState.standing: this.sprite.playAfterRepeat('stand'); break;

            case PlayerState.knockedDown: this.sprite.playAfterRepeat('knock_down'); break;
            case PlayerState.gettingUp: this.sprite.playAfterRepeat('get_up'); break;

            default: this.sprite.playAfterRepeat('idle'); break;
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