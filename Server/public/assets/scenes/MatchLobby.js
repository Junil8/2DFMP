import { MenuMethods } from '../MenuMethods.js';
export class MatchLobby extends Phaser.Scene {



    constructor() {
        super({ key: "MatchLoby" });
    }

    init(data) {
        this.player = data._Player;
        this.private = data._Private;
        this.map = data._Map;
        console.log(this.player + "\n" + this.private + "\n" + this.map + "\n")
    }

    Method = new MenuMethods;

    create() {

        let centerX = this.cameras.main.width / 2;



        let textlobbyCode = this.add.text(50,390,'Lobby Code: 231289', { font: "bold 24px monospace"});
        let buttonReturn = this.Method.CreateButton.call(this, 450, 400, 175, 50, 'Return', () => { this.scene.start('MainMenu') });
        let buttonReady = this.Method.CreateButton.call(this, 650, 400, 175, 50, 'Ready', () => { console.log("Start") });
        let borderbotleft 

        let Team1 = {
            teamName: null,
            joinButton: null,
            borderTop: null,
            textcolor: null,
            colorbutton: null,
            borderBot: null,
        };

        let footer = {}








    }



}