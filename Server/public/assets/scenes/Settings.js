import { MenuMethods } from '../MenuMethods.js';
export class Settings extends Phaser.Scene {

    constructor() {
        super({ key: "Settings" });

    }

    Method = new MenuMethods;

    create() {

        // 0x21263f
        try {
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var firkant = this.add.rectangle(width / 2, height / 10, width, height, 0xFFFFFF).setInteractive();


            var scrollContainer = this.add.container(0, 0);
            var overskrift = this.add.text(50, 30, 'Settings', { font: "bold 48px Monospace" });
            var border = this.Method.CreateBorder.call(this, 165, 95, 250, 2);
            var knap = this.Method.CreateButton.call(this, 165, 300, 200, 45, 'Return', () => { scrollContainer.y++; });
            scrollContainer.add([overskrift, border, knap[0], knap[1]]);

            try {
                this.bringToTop(scrollContainer);
            }
            catch (Error) {
                console.error(Error), console.log("WTF");
            }
            firkant.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
                console.log("Cool");
                console.log("Cool!");
                if (deltaX > 0) { scrollContainer.y += deltaX * 5; }
                else if (deltaX < 0) { scrollContainer.y += deltaX * 5; }

            });
        }
        catch (Error) {
            console.error(Error), console.log("WTF");
        }
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