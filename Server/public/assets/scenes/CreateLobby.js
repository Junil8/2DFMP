import { MenuMethods } from '../MenuMethods.js';
export class CreateLobby extends Phaser.Scene {

    constructor() {
        super({ key: "CreateLobby" });
    }

    Method = new MenuMethods;
    create() {
        this.add.text(280, 70, 'Create Lobby', { font: "bold 56px ariel" });
        this.Method.CreateButton.call(this, 400, 210, 240, 45, 'Main Menu', () => { this.scene.start('MainMenu') })
        console.log("You are in CreateLobby!!!");
    }

}