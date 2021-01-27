import { MenuMethods } from '../MenuMethods.js';
export class Settings extends Phaser.Scene {

    constructor() { 
        super({key: "Settings"});
    }

    Method = new MenuMethods;

    create() {
        this.Method.CreateTitle.call(this, 280, 70, 'Settings', "bold 56px ariel")
        this.Method.CreateButton.call(this, 400, 210, 240, 45, 'Main Menu', 'MainMenu')
        console.log("You are in settings!!!");
    }
}