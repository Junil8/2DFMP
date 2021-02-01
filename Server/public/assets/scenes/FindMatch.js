import { MenuMethods } from '../MenuMethods.js';
export class FindMatch extends Phaser.Scene{

    constructor() { 
        super({key: "FindMatch"});
    }

    Method = new MenuMethods;
    create() {
        this.add.text(280, 70, 'Find Match',{font: "bold 56px ariel"} );
        this.Method.CreateButton.call(this, 400, 210, 240, 45, 'Match', () => { this.scene.start('Match') })
        this.Method.CreateButton.call(this, 400, 310, 240, 45, 'Main Menu', () => { this.scene.start('MainMenu') })
        console.log("You are in FindMatch!!!");
    }
    
}