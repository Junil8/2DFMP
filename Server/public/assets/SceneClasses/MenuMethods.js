export class MenuMethods {

    constructor() { }

    // Creates a rectangle and text.
    // text is aligned inside the rectangle. 
    // the rectangle listens for mouse events. if clicked the button runs a functions if given one.
    // returns the text and rectangle as one array.
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
            if (typeof func == 'function') { func(); }
        });

        let ButtonDone = [button, buttonText]
        return ButtonDone;
    }

    // Prototype: Not finished!!!
    // this is for display purpose, the "slider" is draggable and changes "volume" by doing so.
    CreateSettingsMusic(sliderXMin, sliderXMax) {

        let sliderXDifference = sliderXMax - sliderXMin;
        let sliderPosition;

        let node = this.add.image(275, 185, 'node');
        let border = this.add.rectangle(400, 190, 200, 4, 0x99948d);
        let slider = this.add.rectangle(sliderXMax, 190, 12, 17, 0xFFFFFF).setStrokeStyle(1, 0x595652).setInteractive();

        this.input.setDraggable(slider);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (dragX <= sliderXMax && dragX >= sliderXMin) gameObject.x = dragX;

            sliderPosition = slider.x - sliderXMin;
            console.log(Math.floor(sliderPosition) * 100 / sliderXDifference + " %");
        });
        let musicArray = [node, border, slider];
        return musicArray;
    }
}