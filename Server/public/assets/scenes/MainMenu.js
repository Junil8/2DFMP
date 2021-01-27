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
        this.Method.CreateTitle.call(this, 280, 70, '2 D F M P', "bold 56px ariel");
        this.Method.CreateBorder.call(this, 400, 175, 300, 2);
        this.Method.CreateButton.call(this, 400, 210, 240, 45, 'Find Match', 'FindMatch');
        this.Method.CreateButton.call(this, 400, 270, 240, 45, 'Create Lobby', 'CreateLobby');
        this.Method.CreateButton.call(this, 400, 330, 240, 45, 'Settings', 'Settings');
        this.Method.CreateBorder.call(this, 400, 365, 300, 2)
    }
    update() {
    }
}