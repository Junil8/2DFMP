import { MenuMethods } from '../MenuMethods.js';
export class MatchLobby extends Phaser.Scene {

    constructor() {
        super({ key: "MatchLoby" });
    }

    Method = new MenuMethods;

    create() {
        let centerX = this.cameras.main.width / 2;
        

        let textHeading = this.add.text(centerX, 50, 'Match Lobby', { font: "bold 48px Monospace" }).setOrigin(0.5);

        let buttonReturn = this.Method.CreateButton.call(this, centerX, 130, 240, 45, 'Return', () => { this.scene.start('MainMenu') })

    }



}