import 'phaser';
import {StartLevel} from './StartLevel';

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
    scene: StartLevel
};

const game = new Phaser.Game(config);
