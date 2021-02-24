import { MenuMethods } from '../MenuMethods.js';
export class FindMatch extends Phaser.Scene {

    constructor() {
        super({ key: "FindMatch" });
    }

    preload() {
        this.load.html('LobbyCode', './assets/TextInput/LobbyCode.html');
    }

    Method = new MenuMethods;
    create() {

        let centerX = this.cameras.main.width / 2;

        let textHeading = this.add.text(centerX, 50, 'Find Match', { font: "bold 48px Monospace" }).setOrigin(0.5);
        let buttonReturn = this.Method.CreateButton.call(this, centerX, 130, 240, 45, 'Return', () => { this.scene.start('MainMenu') })

        let borderTop = this.add.rectangle(centerX, 165, 300, 2, 0x595652);
        let button1v1 = this.Method.CreateButton.call(this, centerX, 200, 240, 45, 'Find 1v1', () => { this.scene.start('MatchLobby') })
        let button2v2 = this.Method.CreateButton.call(this, centerX, 255, 240, 45, 'Find 2v2', () => { this.scene.start('MatchLobby') })
        let borderbot = this.add.rectangle(centerX, 290, 300, 2, 0x595652);

        // let formLobbyCode = this.add.dom( centerX - 70, 270).createFromCache('LobbyCode');
        let buttonLobbyCode = this.Method.CreateButton.call(this, centerX, 325, 200, 45, 'LobbyCode...', () => {
            let LobbyCode = prompt("Indtast lobby code");
            console.log(LobbyCode);
        });
      
        let buttonJoin = this.Method.CreateButton.call(this, centerX + 70, 385, 100, 45, 'Join', () => { this.scene.start('Match') })
    }
}