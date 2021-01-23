import 'phaser'
import {PositionUtils, OriginPosition} from './PositionUtils'
export class StartLevel extends Phaser.Scene { 
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    stars: Phaser.Physics.Arcade.Group;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    movingPlatform: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    text: Phaser.GameObjects.Text
    clickDownPos: [integer, integer]
    
    constructor(config: string | Phaser.Types.Scenes.SettingsConfig){
        super(config);
    }
    preload ()
    {
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('sky', 'src/games/firstgame/assets/sky.png');
        this.load.image('ground', 'src/games/firstgame/assets/platform.png');
        this.load.image('star', 'src/games/firstgame/assets/star.png');
        this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
    create ()
    {
        this.add.image(400, 300, 'sky');

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(700, 100, 'ground');
        // platforms.create(750, 220, 'ground');

        this.movingPlatform = this.physics.add.image(400, 400, 'ground');

        (<Phaser.Physics.Arcade.Body>this.movingPlatform.body).allowGravity = false;
        this.movingPlatform.setImmovable(true);
        this.movingPlatform.setVelocityX(50);

        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child: Phaser.Types.Physics.Arcade.ImageWithDynamicBody) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.movingPlatform);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.stars, this.movingPlatform);

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.text = this.add.text(250, 16, '', null);
        this.input.on('pointerdown', function (pointer) {
            this.add.image(pointer.x, pointer.y, 'star', Phaser.Math.Between(0, 5));
            this.clickDownPos = [pointer.x, pointer.y];
        }, this);
        
        this.input.on('pointerup', function (pointer) {
            this.add.image(pointer.x, pointer.y, 'star', Phaser.Math.Between(0, 5));
            let width = pointer.x - this.clickDownPos[0];
            let height = pointer.y - this.clickDownPos[1];
            let drawPoint: [number, number] =
                [width<0 ? this.clickDownPos[0] : pointer.x, height<0 ? this.clickDownPos[1] : pointer.y];
            width = Math.abs(width);
            height = Math.abs(height);
            let topLeft = PositionUtils.positionOfTopLeft(drawPoint, width, height, OriginPosition.MidCenter)
            this.add.rectangle(topLeft[0], topLeft[1], width, height,  0x005500);
        }, this);
    }
    update () {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }

        if (this.movingPlatform.x >= 500)
        {
            this.movingPlatform.setVelocityX(-50);
        }
        else if (this.movingPlatform.x <= 300)
        {
            this.movingPlatform.setVelocityX(50);
        }
        let mouse = this.game.input.activePointer
        this.text.text = "x: " + mouse.x + " y: " + mouse.y
    }
    collectStar (player, star)
    {
        star.disableBody(true, true);
    }

}


