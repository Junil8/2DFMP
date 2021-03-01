import { MenuMethods } from '../MenuMethods.js';
export class CreateLobby extends Phaser.Scene {

    constructor() {
        super({ key: "CreateLobby" });

    }

    Method = new MenuMethods;

    create() {
        // center of page
        let centerX = this.cameras.main.width / 2;

        // Page header 
        let textHeading = this.add.text(centerX, 40, 'Create Lobby', { font: "bold 48px Monospace" }).setOrigin(0.5);
        let buttonReturn = this.Method.CreateButton.call(this, centerX, 100, 240, 45, 'Return', () => { this.scene.start('MainMenu') })
        let borderTop = this.add.rectangle(centerX, 135, 300, 2, 0x595652);

        // Buttons for lobby settings
        let button1v1 = this.Method.CreateButton.call(this, centerX, 170, 200, 45, '1v1 Match', () => { this.checkSelect(lobbyPlayer, '_player1v1', checkmarkPlayer, '_check1v1') });
        let button2v2 = this.Method.CreateButton.call(this, centerX, 225, 200, 45, '2v2 Match', () => { this.checkSelect(lobbyPlayer, '_player2v2', checkmarkPlayer, '_check2v2') });
        let buttonPrivate = this.Method.CreateButton.call(this, centerX, 280, 200, 45, 'Private', () => { this.checkSelect(lobbyPrivate, '_private', checkmarkPrivate, '_checkPrivate') });

        // Map images
        let imageMap1 = this.createSelectableImage(centerX - 150, 350, "map1", () => { this.checkSelect(lobbyMap, '_map1', checkmarkMap, '_checkMap1') });
        let imageMap2 = this.createSelectableImage(centerX, 350, "template", () => { this.checkSelect(lobbyMap, '_map2', checkmarkMap, '_checkMap2') });
        let imageMap3 = this.createSelectableImage(centerX + 150, 350, "template", () => { this.checkSelect(lobbyMap, '_map3', checkmarkMap, '_checkMap3') });

        // checkboxes for lobby settings
        let checkbox1v1 = this.add.rectangle(centerX - 125, 170, 30, 30, 0xFFFFFF).setStrokeStyle(1, 0x595652);
        let checkbox2v2 = this.add.rectangle(centerX - 125, 225, 30, 30, 0xFFFFFF).setStrokeStyle(1, 0x595652);
        let checkboxPrivate = this.add.rectangle(centerX - 125, 280, 30, 30, 0xFFFFFF).setStrokeStyle(1, 0x595652);

        // adds and hides checkmarks 
        let checkmark1v1 = this.add.image(centerX - 125, 170, 'checkmark').setVisible(false);
        let checkmark2v2 = this.add.image(centerX - 125, 225, 'checkmark').setVisible(false);
        let checkmarkprivate = this.add.image(centerX - 125, 280, 'checkmark').setVisible(false);
        let checkmarkMap1 = this.add.rectangle(centerX - 150, 350, 140, 80, 0x00FF00, 0.2).setVisible(false);
        let checkmarkMap2 = this.add.rectangle(centerX, 350, 140, 80, 0x00FF00, 0.2).setVisible(false);
        let checkmarkMap3 = this.add.rectangle(centerX + 150, 350, 140, 80, 0x00FF00, 0.2).setVisible(false);

        // Checkmark objects is used in checkSelect function to show / hide checkmarks.
        let checkmarkPlayer = { _check1v1: checkmark1v1, _check2v2: checkmark2v2 };
        let checkmarkPrivate = { _checkPrivate: checkmarkprivate };
        let checkmarkMap = { _checkMap1: checkmarkMap1, _checkMap2: checkmarkMap2, _checkMap3: checkmarkMap3 };

        // Objects used in checkSelect function to manage which buttons are pressed
        let lobbyPlayer = { _player1v1: false, _player2v2: false };
        let lobbyPrivate = { _private: false };
        let lobbyMap = { _map1: false, _map2: false, _map3: false };

        // button that checks if the lobby criteria is met, then starts lobby if fitting.
        let buttonCreateLobby = this.Method.CreateButton.call(this, centerX, 420, 150, 40, 'Create', () => { this.checkLobbyCriteria(lobbyPlayer, lobbyPrivate, lobbyMap); })
    }

    checkSelect(lobbyObj, LobbyProp, checkmarkObj, checkmarkProp) {
        if (lobbyObj[LobbyProp] == false) {
            Object.keys(lobbyObj).forEach(element => {
                lobbyObj[element] = false;
            });
            Object.keys(checkmarkObj).forEach(element => {
                checkmarkObj[element].setVisible(false);
            });
            lobbyObj[LobbyProp] = true;
            checkmarkObj[checkmarkProp].setVisible(true);
        }
        else {
            lobbyObj[LobbyProp] = false;
            checkmarkObj[checkmarkProp].setVisible(false);
        }
    };

    checkLobbyCriteria(checkPlayer, checkPrivate, checkMap) {
        let selectedPlayer = null;
        let selectedPrivate = null;
        let selectedMap = null;
        Object.keys(checkPlayer).forEach(element => {
            if (checkPlayer[element] == true) selectedPlayer = element;
        });
        Object.keys(checkPrivate).forEach(element => {
            if (checkPrivate[element] == true) selectedPrivate = element;
        });
        Object.keys(checkMap).forEach(element => {
            if (checkMap[element] == true) selectedMap = element;
        });
        console.log("checkPlayer: " + selectedPlayer + " checkPrivate: " + selectedPrivate + " checkMap: " + selectedMap)
        if (selectedPlayer, selectedMap != null) this.scene.start('MatchLobby', { _Player: selectedPlayer, _Private: selectedPrivate, _Map: selectedMap })
        else alert("You need to select the number of players, and a map to create a lobby");
    }

    createSelectableImage(x, y, picture, func) {
        let image = this.add.image(x, y, picture).setInteractive();
        image.on('pointerup', () => { if (typeof func == 'function') func(); });
        return image;
    }

}