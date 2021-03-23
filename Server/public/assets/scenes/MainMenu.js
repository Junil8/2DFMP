import { MenuMethods } from '../SceneClasses/MenuMethods.js';
export class MainMenu extends Phaser.Scene {

    constructor() {
        super({ key: "MainMenu" });

    }

    Method = new MenuMethods;

    preload() {
    }

    // Creates the main menu.
    create() {
        // The titel is made by adding the title image.
        // The top and bottom border is made via a rectangle.
        // The three buttons are made from the CreateButton method, found in \2DFMP\Server\public\assets\SceneClasses\MenuMethods.js
        
        let centerX = this.cameras.main.width / 2;

        let title = this.add.image(this.cameras.main.width / 2, 90, 'title');
        let borderTop = this.add.rectangle(centerX, 175, 300, 2, 0x595652);
        let buttonFindMatch = this.Method.CreateButton.call(this, centerX, 210, 240, 45, 'Find Match', () => { this.scene.start('FindMatch') });
        let buttonCreateLobby = this.Method.CreateButton.call(this, centerX, 270, 240, 45, 'Create Lobby', () => { this.scene.start('CreateLobby') });
        let buttonSettings = this.Method.CreateButton.call(this, centerX, 330, 240, 45, 'Settings', () => { this.scene.start('Settings') });
        let borderBot = this.add.rectangle(centerX, 365, 300, 2, 0x595652);
    }
    update() {
    }
}