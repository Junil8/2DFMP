import { MenuMethods } from '../MenuMethods.js';
export class CreateLobby extends Phaser.Scene {

    constructor() {
        super({ key: "CreateLobby" });

    }

    Method = new MenuMethods;

    create() {

        let centerX = this.cameras.main.width / 2;
        let arrayLobbyPlayers = [false, false];
        let boolLobbyPrivate = false;
        let arrayLobbyMap = [false, false, false];

        let textHeading = this.add.text(centerX, 40, 'Create Lobby', { font: "bold 48px Monospace" }).setOrigin(0.5);
        let buttonReturn = this.Method.CreateButton.call(this, centerX, 100, 240, 45, 'Return', () => { this.scene.start('MainMenu') })
        let borderTop = this.add.rectangle(centerX, 135, 300, 2, 0x595652);
        let button1v1 = this.Method.CreateButton.call(this, centerX, 170, 200, 45, '1v1 Match', () => { console.log("1v1") })
        let button2v2 = this.Method.CreateButton.call(this, centerX, 225, 200, 45, '2v2 Match', () => { console.log("2v2") })
        let buttonPrivate = this.Method.CreateButton.call(this, centerX, 280, 200, 45, 'Private', () => { console.log("Private") })

        // temporary map images
        let imageMap1 = this.add.image(centerX - 150, 350, "map1");
        let imageTemplate2 = this.add.image(centerX, 350, "template");
        let imageTemplate3 = this.add.image(centerX + 150, 350, "template");
        let boolLobbyPrivate = false; 
        let buttonCreateLobby = this.Method.CreateButton.call(this, centerX, 420, 150, 40, 'Create', () => { this.scene.start('MatchLobby') })

        let buttonTest1 = this.add.rectangle(100, 100, 100, 50, 0xFF0000).setInteractive();
        let buttonTest2 = this.add.rectangle(100, 200, 100, 50, 0xFF0000).setInteractive();
        let buttonTest3 = this.add.rectangle(100, 300, 100, 50, 0xFF0000).setInteractive();

        let buttonArray = [buttonTest1, buttonTest2, buttonTest3];

        buttonTest1.on('pointerup', () => {
            this.test(arrayLobbyMap, 0, buttonArray);
        });
        buttonTest2.on('pointerup', () => {
            this.test(arrayLobbyMap, 1, buttonArray);
        });
        buttonTest3.on('pointerup', () => {
            this.test(arrayLobbyMap, 2, buttonArray);
        });
    }

    test(Select, arrayNumber, buttonArray) {
        if (Select[arrayNumber] == false) {
            for (let i = 0; i < Select.length; ++i) {
                Select[i] = false;
                buttonArray[i].setFillStyle(0xFF0000);
            }
            Select[arrayNumber] = true;
            buttonArray[arrayNumber].setFillStyle(0x00FF00);
        }
        else {
            Select[arrayNumber] = false;
            buttonArray[arrayNumber].setFillStyle(0xFF0000);
        }
        console.log(Select);
    }
}