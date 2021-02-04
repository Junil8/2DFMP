

import { MenuMethods } from '../MenuMethods.js';
export class Settings extends Phaser.Scene {

    constructor() {
        super({ key: "Settings" });

    }

    Method = new MenuMethods;

    create() {

        let centerX = this.cameras.main.width / 2;
        let scrollContainer = this.add.container(0, 0);


        


        // Tilføjer sidens knapper/text etc til en container. Den bliver brugt til at "scrolle" på siden.
        scrollContainer.add(this.CreateSettingsHeader(centerX));
        scrollContainer.add(this.Method.CreateSettingsMusic.call(this,300,500));
        scrollContainer.add(this.CreateScrollbar());
        scrollContainer.add(this.CreateSettingsTexts());
        scrollContainer.add(this.CreateSettingsButtons(centerX, 190, 55));

        console.log(scrollContainer.exists(scrollbarArray[0]));
        // Bagrunden checker om mousewheel bliver brugt. hvis det overholder if statement rykkes alle objekter som er tilføjet i scrollContainer
        // deltaY er den værdig som mousewheel er på.
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            if (deltaY < 0 && scrollContainer.y < 0) scrollContainer.y -= deltaY * 15;// Scroll up
            else if (deltaY > 0 && scrollContainer.y > -220) scrollContainer.y -= deltaY * 15; // Scroll down
            

        });
    }

    CreateScrollbar(){
        let border = this.add.rectangle(575, 410, 3, 490, 0x99948d);
        let button = this.add.image(575,170,'checkpointwhite');
        let scrollbarArray = [border, button];
        return scrollbarArray;
    }
    
    // Laver en overskrift, border samt return knap til mainmenu
    // Bliver samlet i et array og tilføjes til scrollContainer i Create()
    CreateSettingsHeader(x) {
        let textHeading = this.add.text(x, 50, 'Settings', { font: "bold 48px Monospace" }).setOrigin(0.5);
        let buttonReturn = this.Method.CreateButton.call(this, x, 110, 200, 45, 'Return', () => { this.scene.start('MainMenu') });
        let border = this.add.rectangle(x, 150, 300, 2, 0x595652);
        let headerArray = [textHeading, border, buttonReturn[0], buttonReturn[1]];
        return headerArray;
    }
    // Laver text beskrivelser til venstre for knapperne. 
    // Bliver tilføjet til scrollContainer i Create()
    CreateSettingsTexts() {
        let textBody = ("Up\nDown\nLeft\nRight\nJump\nPunch\nKick\nBlock");
        let textBodyStyling = this.add.text(210, 235, textBody, { font: "bold 22px Monospace", lineSpacing: 35, align: 'right' });
        return textBodyStyling;
    }
    // Laver alle knapper. sætter position efter x & y samt mellemrum mellem knapper med yGap.
    // Samler alle knapper i et array som bliver tilføjet til scrollContainer i Create()
    CreateSettingsButtons(x, y, yGap) {
        let buttonUp = this.Method.CreateButton.call(this, x, y += yGap, 200, 45, 'Arrow Up', () => { alert('Up') });
        let buttonDown = this.Method.CreateButton.call(this, x, y += yGap, 200, 45, 'Arrow Down', () => { alert('Down') });
        let buttonLeft = this.Method.CreateButton.call(this, x, y += yGap, 200, 45, 'Arrow Left', () => { alert('Left') });
        let buttonRight = this.Method.CreateButton.call(this, x, y += yGap, 200, 45, 'Arrow Right', () => { alert('Right') });
        let buttonJump = this.Method.CreateButton.call(this, x, y += yGap, 200, 45, 'Space', () => { alert('Jump') });
        let buttonPunch = this.Method.CreateButton.call(this, x, y += yGap, 200, 45, 'A', () => { alert('Punch') });
        let buttonKick = this.Method.CreateButton.call(this, x, y += yGap, 200, 45, 'S', () => { alert('Kick') });
        let buttonBlock = this.Method.CreateButton.call(this, x, y += yGap, 200, 45, 'D', () => { alert('Block') });
        let buttonArray = [buttonUp[0], buttonUp[1], buttonDown[0], buttonDown[1], buttonLeft[0], buttonLeft[1], buttonRight[0], buttonRight[1],
        buttonJump[0], buttonJump[1], buttonPunch[0], buttonPunch[1], buttonKick[0], buttonKick[1], buttonBlock[0], buttonBlock[1],];
        return buttonArray;
    }



}