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
        this.player2Name;
        this.player1NameRec;
        this.player2NameRec;

        this.textTeamColor;
        this.textColor;
        this.textColorRec;

        this.buttonChangeColor;


    }

    Create() {

        this.player1Sprite = this.add.sprite(100, 125).play('lime_still').setScale(2);
        this.player2Sprite = this.add.sprite(275, 125).play('green_still').setScale(2);

        this.player1Checkmark = this.add.image(125, 100, 'checkmark').setVisible(false);
        this.player2Checkmark = this.add.image(300, 100, 'checkmark').setVisible(false);

        this.player1NameRec = this.add.rectangle(this.player1Sprite.x, this.player1Sprite.y + 60, 150, 20);
        this.player1Name = this.add.text(0, 0, "xXxDarknessxXx");
        Phaser.Display.Align.In.Center(this.player1Name, this.player1NameRec);

        this.player2NameRec = this.add.rectangle(this.player2Sprite.x, this.player2Sprite.y + 60, 150, 20);
        this.player2Name = this.add.text(0, 0, "xXxDarknessxXx");
        Phaser.Display.Align.In.Center(this.player2Name, this.player2NameRec);

        this.textTeamColor = this.add.text(120, 225, "Team color:", { font: "bold 22px monospace" });
        this.textColorRec = this.add.rectangle(this.textTeamColor.x + 70, this.textTeamColor.y + 35, 100, 20);
        this.textColor = this.add.text(0, 0, "blue", { font: "bold 16px monospace", color: '#0000FF' });
        Phaser.Display.Align.In.Center(this.textColor, this.textColorRec);

        
        this.buttonChangeColor = this.Method.CreateButton.call(this, 190, 350, 120, 35, "Change", );
    }

    test() {
        console.log("Yo");
    }

    colorPicker() {

        let color = {
            red: '#FF0000',
            green: '#00FF00',
            blue: '#0000FF',
            yellow: '#FFFF00'
        };

        console.log("HEY");
        let selectedColor = "red";
      //  return selectedColor;


    }


}
