import { TestMap } from '../maps/TestMap.js';
import { Player } from '../objects/Player.js';

const Setting = {
    up: 'UP',
    left: 'LEFT',
    down: 'DOWN',
    right: 'RIGHT',
    jump: 'SPACE',
    punch: 'Z',
    kick: 'X',
    menu: 'ESC'
}

export class Match extends Phaser.Scene {

    constructor() {
        super({ key: "Match" });
    }

    preload() {
        this.load.scenePlugin('Slopes', Slopes);
    }

    create() {
        this.map = new TestMap(this);

        this.player = new Player(this, this.map.spawn1.x, this.map.spawn1.y, 'red_adventure');
        this.player2 = new Player(this, this.map.spawn2.x, this.map.spawn2.y, 'green_adventure');
        
        this.player.sprite.setDepth(1);

        this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
        this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);
        this.cameras.main.setZoom(2);

        this.direction = this.input.keyboard.addKeys({
            up: Setting.up,
            left: Setting.left,
            down: Setting.down,
            right: Setting.right
        });

        this.input.keyboard.on('keydown-' + Setting.jump, () => this.player.jump());
        this.input.keyboard.on('keydown-' + Setting.punch, () => this.player.punch());
        this.input.keyboard.on('keydown-' + Setting.kick, () => this.player.kick());
    }

    update() {
        if (this.direction.left.isDown) this.player.move(-1);
        else if (this.direction.right.isDown) this.player.move(1);
        else this.player.move(0);

        if (this.direction.down.isDown) this.player.crouch();
        else this.player.stand();
    }
}