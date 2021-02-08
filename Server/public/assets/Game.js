import { Boot } from './scenes/Boot.js';

const RATIO = self.screen.width / self.screen.height;
const WIDTH = 800;
const HEIGHT = WIDTH / RATIO;

self.PhaserConfig = {
    type: Phaser.CANVAS,
    backgroundColor: '#21263f',
    width: WIDTH,
    height: HEIGHT,
    title: '2DFMP',
    version: '0.0.1',
    parent: "PhaserId",
    dom: {createContainer: true},
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 1
            },
            debug: true
        }
    },
    plugins: {
      scene: [
        {
          plugin: PhaserMatterCollisionPlugin,
          key: "matterCollision",
          mapping: "matterCollision"
        }
      ]
    },
    render: {
        pixelArt: true
    },
    scene: Boot
}