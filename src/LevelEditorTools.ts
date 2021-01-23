import 'phaser'
import { BlankScene } from './BlankScene';

export class LevelEditorTools {
    workingScene: Phaser.Scene
    game: Phaser.Game
    constructor() {
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
            scene: BlankScene
        };

        this.game = new Phaser.Game(config);
        this.workingScene = this.game.scene.getScene('BlankScene'); 
        console.log("Scene "+this.game.scene);
    }
}