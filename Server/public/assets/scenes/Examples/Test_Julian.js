export class Test_Julian extends Phaser.Scene {

    // this is a test scene. I made this following the template of the Example.js scene to get an idea of how phaser works. - Julian

    
    player;
    stars;
    platforms;
    cursors;
    movingPlatform;
    directionX = "";
    directionY = "";

    constructor() {
        super({ key: 'Test_Julian', active: true });
    }

    preload() {
        this.load.image('sky', './assets/graphic/example/sky.png');
        this.load.image('ground', './assets/graphic/example/platform.png');
        this.load.image('star', './assets/graphic/example/star.png');
        this.load.spritesheet('dude', './assets/graphic/2dfmp/characters/Adventure.png', { frameWidth: 50, frameHeight: 37 });
    }

    create() {   // Background:
        this.add.image(400, 300, 'sky');
        // Platform:
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 250, 'ground');
        this.movingPlatform = this.physics.add.image(400, 400, 'ground').setScale(0.7);
        this.movingPlatform.setImmovable(true);
        this.movingPlatform.body.allowGravity = false;
        this.movingPlatform.setVelocityX(50);

        // Player:
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setScale(2);
        this.player.setCollideWorldBounds(true);
        //this.player.setBounce(0.3);

        // Player Animation:
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('dude', { start: 625, end: 630 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'still',
            frames: this.anims.generateFrameNumbers('dude', { start: 240, end: 243 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('dude', { start: 864, end: 865 }),
            frameRate: 7,
            repeat: -1
        })
        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('dude', { start: 144, end: 145 }),
            frameRate: 7,
            repeat: -1
        })

        // Collider:
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.movingPlatform);

        // Player Input:
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.playerMoveCheck();
        this.platformMoveCheck();
        this.playerAnimation(this.directionX, this.directionY);
    }

    platformMoveCheck() {
        if (this.movingPlatform.x >= 500) this.movingPlatform.setVelocityX(-50);
        else if (this.movingPlatform.x <= 300) this.movingPlatform.setVelocityX(50);
    }

    playerMoveCheck() {
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
            this.directionY = "up";
        }
        if (this.player.body.velocity.y >= 60) this.directionY = "down";

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
            this.directionX = "left";
            this.player.flipX = true;
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
            this.directionX = "right";
            this.player.flipX = false;
        }
        else {
            this.player.setVelocityX(0)
            this.directionX = "still";
        }
    }

    playerAnimation(directionX, directionY) {
        if (directionX == "left" && this.player.body.touching.down) this.player.anims.play('run', true);
        else if (directionX == "right" && this.player.body.touching.down) this.player.anims.play('run', true);
        else if (this.player.body.touching.down) this.player.anims.play('still', true);

        if (!this.player.body.touching.down) {
            if (directionY == "up") this.player.anims.play('jump', true);
            else if (directionY == "down") this.player.anims.play('fall', true);
        }
    }
}