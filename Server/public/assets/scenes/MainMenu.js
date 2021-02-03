import { MenuMethods } from '../MenuMethods.js';
export class MainMenu extends Phaser.Scene {

    constructor() {
        super({ key: "MainMenu" });
        
    }

    Method = new MenuMethods;

    preload() {
    }

    // Creates the main menu
    create() {
        this.add.image(this.cameras.main.width / 2, 90, 'title');
        this.add.rectangle(400, 175, 300, 2, 0x595652);
        this.Method.CreateButton.call(this, 400, 210, 240, 45, 'Find Match', () => { this.scene.start('FindMatch') });
        this.Method.CreateButton.call(this, 400, 270, 240, 45, 'Create Lobby',() => { this.scene.start('CreateLobby') });
        this.Method.CreateButton.call(this, 400, 330, 240, 45, 'Settings', () => { this.scene.start('Settings') });
        this.add.rectangle(400, 365, 300, 2, 0x595652);
    }
    update() {
    }
}