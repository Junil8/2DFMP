export class MainMenu extends Phaser.Scene {

    constructor() {
        super({ key: "MainMenu" });
    }

    preload() {
        
    }

    create() {
        let button = this.add.rectangle(400, 200, 148, 32, 0xFFFFFF).setStrokeStyle(1, 0x595652);

        let selected_button = this.add.rectangle(400, 248, 148, 32, 0xcbdbfc).setStrokeStyle(1, 0x595652);

        let checkbox = this.add.rectangle(458, 296, 32, 32, 0xFFFFFF).setStrokeStyle(1, 0x595652);
    }

    update() {

    }
}