import 'phaser'
import { SceneEditor } from './scene_editor/SceneEditor';
import { SceneEditorPlugin } from './scene_editor/SceneEditorPlugin';

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

        OnButton.game = new Phaser.Game(config);
    }
}