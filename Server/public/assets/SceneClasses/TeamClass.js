import { MenuMethods } from '../SceneClasses/MenuMethods.js';
export class TeamClass {

    Method = new MenuMethods;

    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.player1Checkmark;
        this.player2Checkmark;
        this.player1Name;
        this.player2Name;
        this.textTeamColor;
        this.teamColor;
        this.buttonChangeColor;
    }

    Create() {
        let test1 = this.add.sprite(100, 125).play('lime_still').setScale(2);
        let test2 = this.add.sprite(275, 125).play('green_still').setScale(2);

        this.player1Checkmark = this.add.image(125,100, 'checkmark').setVisible(false);
        this.player2Checkmark = this.add.image(300,100, 'checkmark').setVisible(false);

        this.player1Name; 
        this.player2Name;

    }



}
