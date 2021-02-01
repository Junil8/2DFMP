import { MenuMethods } from '../MenuMethods.js';
export class Settings extends Phaser.Scene {

    constructor() {
        super({ key: "Settings" });

    }

    Method = new MenuMethods;

    create() {
        this.add.text(50, 30, 'Settings', { font: "bold 48px Monospace" });
        this.Method.CreateBorder.call(this, 165, 95, 250, 2);
        this.Method.CreateButton.call(this, 165, 150, 200, 45, 'Movement', () => { this.CreateMovementButtons() });
        this.Method.CreateButton.call(this, 165, 200, 200, 45, 'Combat', () => { this.CreateCombatButtons() });
        this.Method.CreateButton.call(this, 165, 250, 200, 45, 'Sound', () => { this.testfunc(), testgroup.toggleVisible() });
        this.Method.CreateButton.call(this, 165, 300, 200, 45, 'Return', () => { this.scene.start('MainMenu') });


        // var testgroup = this.add.group();
        // var sprite = this.add.sprite(400, 300, 'Buttontest').setInteractive();
        // sprite.on('pointerover', () => {
        //     console.log("Hejsa");
        //     testgroup.toggleVisible()
        // });
        // testgroup.add(sprite);

        // var kage = this.add.text(400, 140, 'KAGE', { font: "bold 22px Monospace" });
        // var testgroup = this.add.group();
        // var XD = this.Method.CreateButton.call(this, 600, 150, 200, 45, 'Hey', () => { alert('hej') });
        // testgroup.add(XD[1]);


        try {
            var Ccontainer = this.add.container(0, 0);
            var test1 = this.add.sprite(500, 200, 'Buttontest');
            var test2 = this.add.sprite(500, 300, 'Buttontest');
            var test3 = this.add.sprite(500, 400, 'Buttontest');
            Ccontainer.add([test1, test2, test3]);
           // Ccontainer.visible = false;

        }
        catch (Error) {
            console.error(Error);
        }

    }

    update() {

    }

    testfunc() {
        console.log("test func kører")

    }

    CreateMovementButtons() {
        this.add.text(400, 140, 'UP', { font: "bold 22px Monospace" });
        this.Method.CreateButton.call(this, 600, 150, 200, 45, 'Arrow Up', () => { alert('Up') });

        this.add.text(400, 190, 'Down', { font: "bold 22px Monospace" });
        this.Method.CreateButton.call(this, 600, 200, 200, 45, 'Arrow Down', () => { alert('Down') });

        this.add.text(400, 240, 'Left', { font: "bold 22px Monospace" });
        this.Method.CreateButton.call(this, 600, 250, 200, 45, 'Arrow Left', () => { alert('Left') });

        this.add.text(400, 290, 'Right', { font: "bold 22px Monospace" });
        this.Method.CreateButton.call(this, 600, 300, 200, 45, 'Arrow Right', () => { alert('Right') });

        this.add.text(400, 340, 'Jump', { font: "bold 22px Monospace" });
        this.Method.CreateButton.call(this, 600, 350, 200, 45, 'Space', () => { alert('Jump') });

    }


    CreateCombatButtons() {
        this.add.text(400, 140, 'UP', { font: "bold 22px Monospace" });
        this.Method.CreateButton.call(this, 600, 150, 200, 45, 'Arrow Up', () => { alert('Up') })

        this.add.text(400, 190, 'Down', { font: "bold 22px Monospace" });
        this.Method.CreateButton.call(this, 600, 200, 200, 45, 'Arrow Down', () => { alert('Down') });

        this.add.text(400, 240, 'Left', { font: "bold 22px Monospace" });
        this.Method.CreateButton.call(this, 600, 250, 200, 45, 'Arrow Left', () => { alert('Left') });

        this.add.text(400, 290, 'Right', { font: "bold 22px Monospace" });
        this.Method.CreateButton.call(this, 600, 300, 200, 45, 'Arrow Right', () => { alert('Right') });

        this.add.text(400, 340, 'Jump', { font: "bold 22px Monospace" });
        this.Method.CreateButton.call(this, 600, 350, 200, 45, 'Space', () => { alert('Jump') });
    }


}