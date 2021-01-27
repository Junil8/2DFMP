export class MenuMethods {

    constructor() { }
    // Creates a Title
    CreateTitle(x, y, string, font) {
        this.add.text(x, y, string, { font: font });
    }
    //Creates a Border
    CreateBorder(x, y, w, h) {
        this.add.rectangle(x, y, w, h, 0x595652);
    }
    /* !Muligvis ændres! 
    Hvis der skal bruges knapper som ikke bruger scener skal denne metode måske ændres! 
    */
    // Creates a button with text
    CreateButton(x, y, w, h, string, scene) {
        // Button & text colors
        let colorBase = 0xFFFFFF, colorOver = 0xcbdbfc, colorDown = 0xadbcde, colorBorder = 0x595652, colorText = 0x595652;
        // Creates a rectangle and makes it interactive
        let button = this.add.rectangle(x, y, w, h, colorBase).setStrokeStyle(2, colorBorder).setInteractive();
        // Creates text and centers it inside button
        let buttonText = this.add.text(button.x, button.y, string, { font: "bold 24px arial", color: colorText });
        Phaser.Display.Align.In.Center(buttonText, button);
        // Creates button events
        button.on('pointerover', function () {
            button.setFillStyle(colorOver);
        });
        button.on('pointerout', function () {
            button.setFillStyle(colorBase);
        });
        button.on('pointerdown', function () {
            button.setFillStyle(colorDown);
        });
        button.on('pointerup', function () {
            button.setFillStyle(colorOver);
            this.scene.start(scene);
        }, this);
    }
}