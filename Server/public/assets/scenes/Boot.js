import { Preload } from './Preload.js';
import { Match } from './Match.js';
import { MainMenu } from './MainMenu.js';

export class Boot extends Phaser.Scene {

    constructor() {
        super({ key: "Boot" });
    }

    preload() {
        this.load.image('title', './assets/graphic/2dfmp/gui/title.png');
    }

    create() {
        this.scene.add('Preload', Preload);
        this.scene.add('MainMenu', MainMenu);
        this.scene.add('Match', Match);
        
        this.scene.start('Preload');
    }

    update() {}
}