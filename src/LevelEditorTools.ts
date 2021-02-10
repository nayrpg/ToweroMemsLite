import 'phaser'
import { SceneEditor } from './SceneEditor';
import { SceneEditorPlugin } from './SceneEditorPlugin';

export class LevelEditorTools {
    workingScene: Phaser.Scene
    game: Phaser.Game
    public constructor() {
        const config = {
            type: Phaser.AUTO,
            backgroundColor: '#125555',
            width: 800,
            height: 600,
            physics: {
                        default: 'arcade',
                        arcade: {
                            gravity: { y: 300 },
                            debug: false
                        }
                    },
            plugins: {
                global: [
                    { key: 'SceneEditorPlugin', plugin: SceneEditorPlugin, start: false, mapping: 'editor' }
                ]
            },
            scene: SceneEditor
        };

        this.game = new Phaser.Game(config);
    }
    public accessScene () {
        console.log("Scene "+this.game.scene.scenes);
    }
}