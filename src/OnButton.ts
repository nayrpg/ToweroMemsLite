import 'phaser'
import { MysticScene } from './scene_editor/MysticScene';
import { MysticPlugin } from './scene_editor/MysticPlugin';

export class OnButton {
    static workingScene: Phaser.Scene
    static game: Phaser.Game
    public static flipOn() {
        const config = {
            type: Phaser.AUTO,
            backgroundColor: '#125555',
            width: 800,
            height: 600,
            physics: {
                        default: 'matter',
                        matter: {
                            gravity: { y: .3 },
                            debug: true
                        }
                    },
            plugins: {
                global: [
                    { key: 'MysticPlugin', plugin: MysticPlugin, start: false, mapping: 'editor' }
                ]
            },
            scene: MysticScene
        };

        OnButton.game = new Phaser.Game(config);
    }
}