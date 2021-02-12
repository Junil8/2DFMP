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

        let buttonTest = this.add.rectangle(275,170,40,40, 0xFFFFFF);
        let buttonTest2 = this.add.rectangle(275,225,40,40, 0xFFFFFF);
        let buttonTest3 = this.add.rectangle(275,280,40,40, 0xFFFFFF);
        
    }

  
    // Test(x,y,w,h) {
    //     let buttonTest = this.add.rectangle(x,y,w,h, 0xFFFFFF).setInteractive();
    //     let buttonSelected = false;

    //     buttonTest.on('pointerup', () => {
    //         if (buttonSelected == false) {
    //             buttonSelected = true;
    //             buttonTest.setFillStyle(0x00FF00);
    //      
    //         }
    //         else {
    //             buttonSelected = false;
    //             buttonTest.setFillStyle(0xFF0000);
    //           
    //         }
    //     });
    // }
}