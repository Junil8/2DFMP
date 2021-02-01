export class MenuMethods {

    constructor() { }
    //Creates a Border
    CreateBorder(x, y, w, h) {
        this.add.rectangle(x, y, w, h, 0x595652);
    }
    // Creates a button with text
    CreateButton(x, y, w, h, string, func) {
        // Button & text colors
        let colorBase = 0xFFFFFF, colorOver = 0xcbdbfc, colorDown = 0xadbcde, colorBorder = 0x595652, colorText = 0x595652;
        // Creates a rectangle and makes it interactive
        let button = this.add.rectangle(x, y, w, h, colorBase).setStrokeStyle(1, colorBorder).setInteractive();
        // Creates text and centers it inside button
        let buttonText = this.add.text(button.x, button.y, string, { font: "bold 22px monospace", color: colorText });
        Phaser.Display.Align.In.Center(buttonText, button);
        // Creates button events
        button.on('pointerover', () => {
            button.setFillStyle(colorOver);
        });
        button.on('pointerout', () => {
            button.setFillStyle(colorBase);
        });
        button.on('pointerdown', () => {
            button.setFillStyle(colorDown);
        });
        button.on('pointerup', () => {
            button.setFillStyle(colorOver);
            if (typeof func == 'function') {
                func();
            }
        }, this);
    }

}