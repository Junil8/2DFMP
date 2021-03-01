import { MenuMethods } from '../MenuMethods.js';
export class MatchLobby extends Phaser.Scene {



    constructor() {
        super({ key: "MatchLoby" });
    }

    init(data) {
        this.player = data._Player;
        this.private = data._Private;
        this.map = data._Map;
        console.log(this.player + "\n" + this.private + "\n" + this.map + "\n" )
    }

    Method = new MenuMethods;

    create() {

        let centerX = this.cameras.main.width / 2;

        //let textHeading = this.add.text(centerX, 50, 'Match Lobby', { font: "bold 48px Monospace" }).setOrigin(0.5);
        let buttonReturn = this.Method.CreateButton.call(this, centerX, 130, 240, 45, 'Return', () => { this.scene.start('MainMenu') })

        
        let Team1 = {
            teamName: null,
            joinButton: null,
            borderTop: null,
            textcolor: null,
            colorbutton: null,
            borderBot: null,
        };
        let Team2 = {

        };
        let footer = { }








    }



}