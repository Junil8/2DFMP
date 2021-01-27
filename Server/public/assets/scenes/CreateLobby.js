import { MenuMethods } from '../MenuMethods.js';
export class CreateLobby extends Phaser.Scene{

    constructor() { 
        super({key: "CreateLobby"});
    }

    Method = new MenuMethods;
    create() {
        this.Method.CreateTitle.call(this, 280, 70, 'Create Lobby', "bold 56px ariel")
        this.Method.CreateButton.call(this, 400, 210, 240, 45, 'Main Menu', 'MainMenu')
        console.log("You are in CreateLobby!!!");
    }
    
}