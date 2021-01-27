import { Preload } from './Preload.js';
import { MainMenu } from './MainMenu.js';
import { FindMatch } from './FindMatch.js';
import { CreateLobby } from './CreateLobby.js';
import { Settings } from './Settings.js';
import { MatchLobby } from './MatchLobby.js';
import { Match } from './Match.js';


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
        this.scene.add('FindMatch', FindMatch);
        this.scene.add('CreateLobby', CreateLobby);
        this.scene.add('Settings', Settings);
        this.scene.add('MatchLobby', MatchLobby);
        this.scene.add('Match', Match);
        
        this.scene.start('Preload');
    }

    update() {}
}