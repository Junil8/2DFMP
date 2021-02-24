import { MenuMethods } from '../MenuMethods.js';
export class CreateLobby extends Phaser.Scene {

    constructor() {
        super({ key: "CreateLobby" });

    }

    Method = new MenuMethods;

    create() {
        // center of page
        let centerX = this.cameras.main.width / 2;

        // variables used to check if a button is selected.
        let arrayLobbyPlayer = [false, false];
        let arrayLobbyPrivate = [false];
        let arrayLobbyMap = [false, false, false];

        // Page header 
        let textHeading = this.add.text(centerX, 40, 'Create Lobby', { font: "bold 48px Monospace" }).setOrigin(0.5);
        let buttonReturn = this.Method.CreateButton.call(this, centerX, 100, 240, 45, 'Return', () => { this.scene.start('MainMenu') })
        let borderTop = this.add.rectangle(centerX, 135, 300, 2, 0x595652);

        // Buttons for lobby settings
        let button1v1 = this.Method.CreateButton.call(this, centerX, 170, 200, 45, '1v1 Match', () => { this.CheckSelect(arrayLobbyPlayer, 0, arrayCheckmarkPlayer) })
        let button2v2 = this.Method.CreateButton.call(this, centerX, 225, 200, 45, '2v2 Match', () => { this.CheckSelect(arrayLobbyPlayer, 1, arrayCheckmarkPlayer) })
        let buttonPrivate = this.Method.CreateButton.call(this, centerX, 280, 200, 45, 'Private', () => { this.CheckSelect(arrayLobbyPrivate, 0, arrayCheckmarkPrivate) })

        // Map images
        let imageMap1 = this.CreateSelectableImage(centerX - 150, 350, "map1", () => { this.CheckSelect(arrayLobbyMap, 0, arraySelectMap) });
        let imageMap2 = this.CreateSelectableImage(centerX, 350, "template", () => { this.CheckSelect(arrayLobbyMap, 1, arraySelectMap) });
        let imageMap3 = this.CreateSelectableImage(centerX + 150, 350, "template", () => { this.CheckSelect(arrayLobbyMap, 2, arraySelectMap) });

        // checkboxes for lobby settings
        let checkbox1v1 = this.add.rectangle(centerX - 125, 170, 30, 30, 0xFFFFFF).setStrokeStyle(1, 0x595652);
        let checkbox2v2 = this.add.rectangle(centerX - 125, 225, 30, 30, 0xFFFFFF).setStrokeStyle(1, 0x595652);
        let checkboxPrivate = this.add.rectangle(centerX - 125, 280, 30, 30, 0xFFFFFF).setStrokeStyle(1, 0x595652);

        // checkmarks for lobby settings
        let checkmark1v1 = this.add.image(centerX - 125, 170, 'checkmark').setVisible(false);
        let checkmark2v2 = this.add.image(centerX - 125, 225, 'checkmark').setVisible(false);
        let checkmarkPrivate = this.add.image(centerX - 125, 280, 'checkmark').setVisible(false);

        // transparent boxes for selected maps
        let selectedMap1 = this.add.rectangle(centerX - 150, 350, 140, 80, 0x00FF00, 0.2).setVisible(false);
        let selectedMap2 = this.add.rectangle(centerX, 350, 140, 80, 0x00FF00, 0.2).setVisible(false);
        let selectedMap3 = this.add.rectangle(centerX + 150, 350, 140, 80, 0x00FF00, 0.2    ).setVisible(false);

        // collection of checkmarks and selected maps, used when setting visibility
        let arrayCheckmarkPlayer = [checkmark1v1, checkmark2v2];
        let arrayCheckmarkPrivate = [checkmarkPrivate];
        let arraySelectMap = [selectedMap1, selectedMap2, selectedMap3];

        // button that checks if the lobby criteria is met, then starts lobby if fitting.
        let buttonCreateLobby = this.Method.CreateButton.call(this, centerX, 420, 150, 40, 'Create', () => { this.CheckLobbyCriteria() })
    }


    // TO DO !!!!
    // check if true for eachs
    CheckLobbyCriteria(player,private,map){
        for (let i = 0)
        if(){}
        else this.scene.start('MatchLobby');
    }


    CreateSelectableImage(x, y, picture, func) {
        let image = this.add.image(x, y, picture).setInteractive();
        image.on('pointerup', () => {
            console.log("click")
            if (typeof func == 'function') { func(); }
        })
        return image;
    }

    CheckSelect(Select, arrayNumber, arraycheck) {
        if (Select[arrayNumber] == false) {
            for (let i = 0; i < Select.length; ++i) {
                Select[i] = false;
                arraycheck[i].setVisible(false);
            }
            Select[arrayNumber] = true;
            arraycheck[arrayNumber].setVisible(true);
        }
        else {
            Select[arrayNumber] = false;
            arraycheck[arrayNumber].setVisible(false);
        }
        console.log(Select);
    }
}