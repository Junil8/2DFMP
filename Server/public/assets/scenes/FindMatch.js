import { MenuMethods } from '../SceneClasses/MenuMethods.js';
export class FindMatch extends Phaser.Scene {

    constructor() {
        super({ key: "FindMatch" });
    }

    preload() {
        // This was an attempt to create html forms on top of phaser canvas.  
        // This.load.html('LobbyCode', './assets/TextInput/LobbyCode.html');
        // Let formLobbyCode = this.add.dom( centerX - 70, 270).createFromCache('LobbyCode');
    }

    Method = new MenuMethods;
    create() {

        let centerX = this.cameras.main.width / 2;

        // Creates text, borders and buttons. 
        // The buttons are made from the CreateButton method, found in \2DFMP\Server\public\assets\SceneClasses\MenuMethods.js
        let textHeading = this.add.text(centerX, 50, 'Find Match', { font: "bold 48px Monospace" }).setOrigin(0.5);
        let buttonReturn = this.Method.CreateButton.call(this, centerX, 130, 240, 45, 'Return', () => { this.scene.start('MainMenu') })
        let borderTop = this.add.rectangle(centerX, 165, 300, 2, 0x595652);
        let button1v1 = this.Method.CreateButton.call(this, centerX, 200, 240, 45, 'Find 1v1', () => { this.scene.start('MatchLobby') })
        let button2v2 = this.Method.CreateButton.call(this, centerX, 255, 240, 45, 'Find 2v2', () => { this.scene.start('MatchLobby') })
        let borderbot = this.add.rectangle(centerX, 290, 300, 2, 0x595652);

        // Creates a button that when pressed creates a prompt meant for a lobby code. 
        let buttonLobbyCode = this.Method.CreateButton.call(this, centerX, 325, 200, 45, 'LobbyCode...', () => {
            let LobbyCode = prompt("Indtast lobby code");
            console.log(LobbyCode);
        });
      
        let buttonJoin = this.Method.CreateButton.call(this, centerX + 70, 385, 100, 45, 'Join', () => { this.scene.start('Match') })
    }
}