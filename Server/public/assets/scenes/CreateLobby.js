import { MenuMethods } from '../MenuMethods.js';
export class CreateLobby extends Phaser.Scene {

    constructor() {
        super({ key: "CreateLobby" });

    }

    Method = new MenuMethods;

    create() {

        let centerX = this.cameras.main.width / 2;

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
        let buttonCreateLobby = this.Method.CreateButton.call(this, centerX, 420, 150, 40, 'Create', () => { this.scene.start('Match') })

        let buttonTest1 = this.add.rectangle(100, 100, 100, 50, 0xFFFFFF);

        let arrayLobbyPlayers = ["1v1", "2v2"];
        let boolLobbyPrivate = false; 
        let arrayLobbyMap = ["map1", "map2", "map3"]


        this.kage(buttonTest1);

    }

    kage(TestVar) {

        switch(TestVar){
            case "1v1":
            break;
            case "2v2":
            break;
        }



        // if (buttonSelected == false) buttonSelected = true;
        // else buttonSelected = false;
        // buttonTest1.setFillStyle(0x00FF00);
    }














    // buttonTest.setFillStyle(0x00FF00);
    // buttonTest.setFillStyle(0xFF0000);

}