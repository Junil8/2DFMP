import { MenuMethods } from '../MenuMethods.js';
export class FindMatch extends Phaser.Scene{

    constructor() { 
        super({key: "FindMatch"});
    }

    Method = new MenuMethods;
    create() {
        this.Method.CreateTitle.call(this, 280, 70, 'Find Match', "bold 56px ariel")
        this.Method.CreateButton.call(this, 400, 210, 240, 45, 'Main Menu', 'MainMenu')
        console.log("You are in FindMatch!!!");
    }
    
}