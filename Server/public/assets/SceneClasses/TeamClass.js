import { MenuMethods } from '../SceneClasses/MenuMethods.js';
export class TeamClass {

    Method = new MenuMethods;

    constructor() {
        this.container;

        this.player1Sprite;
        this.player2Sprite;

        this.player1Checkmark;
        this.player2Checkmark;
        
        this.player1Name;
        this.player1NamePosition;
        this.player2Name;
        this.player2NamePosition;
        
        this.textTeamColor;
        this.teamColor;
        this.buttonChangeColor;
    }

    CreateButton(){
        
    }

    Create() {
        this.container = this.add.container(100, 100); 

        

        this.player1Sprite = this.add.sprite(100, 125).play('lime_still').setScale(2);
        this.player2Sprite = this.add.sprite(275, 125).play('green_still').setScale(2);

        this.player1Checkmark = this.add.image(125,100, 'checkmark').setVisible(false);
        this.player2Checkmark = this.add.image(300,100, 'checkmark').setVisible(false);

        this.player1Name = this.add.text(this.player1Sprite.CenterX, this.player1Sprite.y + 45, "xXxDarknesxXx");
        this.player2Name
    }
}
