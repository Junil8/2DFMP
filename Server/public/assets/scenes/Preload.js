export class Preload extends Phaser.Scene {

    constructor() {
        super({ key: "Preload" });
    }

    preload() {
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;

        this.add.image(width / 2, height / 2, 'title');
        
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        let percentText = this.make.text({
            x: width - 10,
            y: height - 10,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(1, 1);
        
        let assetText = this.make.text({
            x: 10,
            y: height - 10,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0, 1);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        // Character Adventure
        this.load.aseprite('adventure', './assets/graphic/2dfmp/characters/adventure/adventure.png', './assets/graphic/2dfmp/characters/adventure/adventure.json');

        this.load.image('blue_adventure_icon', './assets/graphic/2dfmp/characters/adventure/blue_adventure_icon.png');
        this.load.image('cyan_adventure_icon', './assets/graphic/2dfmp/characters/adventure/cyan_adventure_icon.png');
        this.load.image('green_adventure_icon', './assets/graphic/2dfmp/characters/adventure/green_adventure_icon.png');
        this.load.image('lime_adventure_icon', './assets/graphic/2dfmp/characters/adventure/lime_adventure_icon.png');
        this.load.image('orange_adventure_icon', './assets/graphic/2dfmp/characters/adventure/orange_adventure_icon.png');
        this.load.image('pink_adventure_icon', './assets/graphic/2dfmp/characters/adventure/pink_adventure_icon.png');
        this.load.image('red_adventure_icon', './assets/graphic/2dfmp/characters/adventure/red_adventure_icon.png');
        this.load.image('yellow_adventure_icon', './assets/graphic/2dfmp/characters/adventure/yellow_adventure_icon.png');

        // Effects
        this.load.aseprite('effects', './assets/graphic/2dfmp/effects/effects.png', './assets/graphic/2dfmp/effects/effects.json');

        // GUI
        this.load.image('checkmark', './assets/graphic/2dfmp/gui/checkmark.png');
        this.load.image('checkpoint', './assets/graphic/2dfmp/gui/checkpoint.png');
        this.load.image('checkpointwhite', './assets/graphic/2dfmp/gui/checkpointwhite.png');
        this.load.image('health', './assets/graphic/2dfmp/gui/health.png');
        this.load.image('node', './assets/graphic/2dfmp/gui/node.png');
        this.load.image('template', './assets/graphic/2dfmp/gui/Template.png')
        this.load.image('map1', './assets/graphic/2dfmp/gui/Map1.png')
        this.load.image('map2', './assets/graphic/2dfmp/gui/Map2.png')
        this.load.image('map3', './assets/graphic/2dfmp/gui/Map3.png')

        // Tiles
        this.load.image('caves_of_gallet', './assets/graphic/2dfmp/tiles/caves_of_gallet.png');

        // Maps
        this.load.tilemapTiledJSON('test_map', './assets/maps/test_map.json');
    }

    create() {
        this.anims.createFromAseprite('adventure');

        this.scene.start('CreateLobby');
    }

    update() {}
}