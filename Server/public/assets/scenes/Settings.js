

import { MenuMethods } from '../SceneClasses/MenuMethods.js';
export class Settings extends Phaser.Scene {

    constructor() {
        super({ key: "Settings" });

    }

    Method = new MenuMethods;

    create() {

        let centerX = this.cameras.main.width / 2;
        let scrollContainer = this.add.container(0, 0);

        // Creates the content of the settings page: 
        // headerArray is an array of text and buttons created in the CreateSettingsHeader method.
        // musicArray is an array of elements, used to create the sound slider. The method is found in \2DFMP\Server\public\assets\SceneClasses\MenuMethods.js 
        // textBodyStyling is the text to the left of the buttonArray. It describes the buttons purpose. Created by the CreateSettingsTexts method
        // buttonArray is an array of buttons used to "change" the players input. Created by the CreateSettingsButtons method
        let headerArray = this.CreateSettingsHeader(centerX);
        let musicArray = this.Method.CreateSettingsMusic.call(this, 300, 500);
        let textBodyStyling = this.CreateSettingsTexts();
        let buttonArray = this.CreateSettingsButtons(centerX, 190, 55);

        // Adds the page content to the scroll container
        scrollContainer.add(headerArray);
        scrollContainer.add(musicArray);
        scrollContainer.add(textBodyStyling);
        scrollContainer.add(buttonArray);

        // Checks if the mousewheel is used while the mouse is over the scene.
        // If you scroll this way, the scrollContainer Y position is changed, together with all its objects. 
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            if (deltaY < 0 && scrollContainer.y < 0) scrollContainer.y -= deltaY * 15; // Scroll up 
            else if (deltaY > 0 && scrollContainer.y > -220) scrollContainer.y -= deltaY * 15; // Scroll down 
        });
    }

    // Creates the header text, border and return button(to MainMenu) 
    // All variables are put into the headerArray and returned. This is used in the headerArray variable inside the create method 
    CreateSettingsHeader(x) {
        let textHeading = this.add.text(x, 50, 'Settings', { font: "bold 48px Monospace" }).setOrigin(0.5);
        let buttonReturn = this.Method.CreateButton.call(this, x, 110, 200, 45, 'Return', () => { this.scene.start('MainMenu') });
        let border = this.add.rectangle(x, 150, 300, 2, 0x595652);
        let headerArray = [textHeading, border, buttonReturn[0], buttonReturn[1]];
        return headerArray;
    }

    // Creates text which describes player input. This is used in the textBodyStyling variable inside the create method 
    CreateSettingsTexts() {
        let textBody = ("Up\nDown\nLeft\nRight\nJump\nPunch\nKick\nBlock");
        let textBodyStyling = this.add.text(210, 235, textBody, { font: "bold 22px Monospace", lineSpacing: 35, align: 'right' });
        return textBodyStyling;
    }

    // Creates all buttons used to change player input. The buttons are made with the CreateButton method found in \2DFMP\Server\public\assets\SceneClasses\MenuMethods.js
    // x & y for the position, the yGap number adds to y, Which "scales" the y position so buttons never touch.
    // All buttons are put into the buttonArray, which is used in the buttonArray variable inside the create method 
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