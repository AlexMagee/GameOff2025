export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.spritesheet('entities', 'assets/entities.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('waves', 'assets/waves.png', { frameWidth: 320, frameHeight: 320 });

        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
    }

    create() {
        this.waves = this.add.tileSprite(640, 360, 320, 320, 'waves');

        this.background = this.add.tileSprite(640, 360, 320, 320, 'background');

        this.loot = [
            this.add.sprite(640 - 16, 200 + 16, 'entities', 4),
            // this.add.sprite(132, 100, 'entities', 5)
        ];

        this.player = this.add.sprite(164, 100, 'entities');

        this.player.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('entities', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });

        this.moveTimer = 0;
        
        // Fix character in level
        // this.player.x = Math.min(800 - 16, Math.max(480 + 16, this.player.x));
        this.player.y = Math.max(200 + 16, Math.min(520 - 16, this.player.y));
    }

    update() {
        this.loot.forEach((l) => {
            l.y += 0.25;
            l.y = Math.min(456 - 16, l.y);
        })

        this.waves.tilePositionY -= 0.25;

        const position = [this.player.x, this.player.y];
        if(this.input.keyboard.addKey("W").isDown) {
            this.player.y -= 4;
            if(this.player.x > 544 - 16 && this.player.x < 736 + 16 && this.player.y < 424 + 16) {
                this.player.y = Math.max(424 + 16, this.player.y);
            } else {
                this.player.y = Math.max(200 + 16, this.player.y);
            }
        }
        if(this.input.keyboard.addKey("S").isDown) {
            this.player.y += 4;
            this.player.y = Math.min(520 - 16, this.player.y);
        }
        if(this.input.keyboard.addKey("D").isDown) {
            this.player.x += 4;
            if(this.player.y < 424 + 16) {
                if(this.player.x > 544 - 16 && this.player.x < 736 + 16) {
                    this.player.x = Math.min(544 - 16, this.player.x);
                }
            }
        }
        if(this.input.keyboard.addKey("A").isDown) {
            this.player.x -= 4;
            if(this.player.y < 424 + 16) {
                if(this.player.x > 544 - 16 && this.player.x < 736 + 16) {
                    this.player.x = Math.max(736 + 16, this.player.x);
                }
            }
        }

        this.player.x = Math.min(800 - 16, Math.max(480 + 16, this.player.x));
        this.player.y = Math.max(200 + 16, Math.min(520 - 16, this.player.y));
        
        if((position[0] == this.player.x || position[1] == this.player.y) && !this.player.anims.isPlaying
        ) {
            this.player.play('running');
        }
        if(position[0] == this.player.x && position[1] == this.player.y) {
            this.player.stop('running');
        }
    }
    
}
