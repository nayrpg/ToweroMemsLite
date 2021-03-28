import 'phaser'
import {MysticPlugin} from './MysticPlugin'
export class MysticScene extends Phaser.Scene {

    mystic: MysticPlugin;
    public constructor(sceneFileLocation: string, config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config);
    }
    // TODO: remove all scene creation and updating from this class and have the MysticPlugin do it
    preload () {
        this.mystic = MysticPlugin.singleton;
        this.mystic.preload(this);
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('sky', 'src/games/firstgame/assets/sky.png');
        this.load.image('ground', 'src/games/firstgame/assets/platform.png');
        this.load.image('star', 'src/games/firstgame/assets/star.png');
        this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
    create () {
        this.mystic.create(this);
    }
    update () {
        this.mystic.update(this);
    }
}


