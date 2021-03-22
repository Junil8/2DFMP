import { MenuMethods } from '../SceneClasses/MenuMethods.js';
import { TeamClass } from '../SceneClasses/TeamClass.js';
export class MatchLobby extends Phaser.Scene {

    Method = new MenuMethods;
    Team1 = new TeamClass();
    Team2 = new TeamClass();

    constructor() {
        super({ key: "MatchLoby" });
    }

    init(data) {
        this.player = data._Player;
        this.private = data._Private;
        this.map = data._Map;
        console.log(this.player + "\n" + this.private + "\n" + this.map + "\n")
    }

    create() {

        let centerX = this.cameras.main.width / 2;

        // Header
        let textTeam1 = this.add.text(50,25,'Team 1', { font: "bold 24px monospace"});
        let textTeam2 = this.add.text(450,25,'Team 2', { font: "bold 24px monospace"});
        let buttonJoin1 = this.Method.CreateButton.call(this, 275, 38, 125, 40 , 'Join', () => { console.log("Start") });
        let buttonJoin2 = this.Method.CreateButton.call(this, 675, 38, 125, 40 , 'Join', () => { console.log("Start") });
        let borderTopLeft  = this.add.rectangle(centerX - 200,75,375,3,0x595652);
        let borderTopRight  = this.add.rectangle(centerX + 200,75,375,3,0x595652);
        let header = {}

        // Middle 
        
        // Footer
        let textLobbyCode = this.add.text(50,400,'Lobby Code: 231289', { font: "bold 24px monospace"});
        let buttonReturn = this.Method.CreateButton.call(this, 525, 410, 125, 40, 'Return', () => { this.scene.start('MainMenu') });
        let buttonReady = this.Method.CreateButton.call(this, 675, 410, 125, 40 , 'Ready', () => { console.log("Start") });
        let borderBotLeft  = this.add.rectangle(centerX - 200,375,375,3,0x595652);
        let borderBotRight  = this.add.rectangle(centerX + 200,375,375,3,0x595652);
        let footer = {};

        this.Team1.Create.call(this);
        
    }
}