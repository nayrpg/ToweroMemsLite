import 'phaser'
import { ColliderBoxHandler } from '../components/ColliderBox';
import {SceneEditorTool, SceneEditorToolTypes, } from './SceneEditorTool';
import { SceneEditorToolBelt } from './SceneEditorToolBelt'

export class MysticPlugin extends Phaser.Plugins.BasePlugin {
    static singleton: MysticPlugin 
    scene: Phaser.Scene;
    text: Phaser.GameObjects.Text;
    clickDownPos: [integer, integer];
    tool: SceneEditorTool;
    boxHandler: ColliderBoxHandler;

    public constructor (pluginManager) {
        super(pluginManager);
        MysticPlugin.singleton = this;
    }
    /**
     * preload
     */
    public preload(scene: Phaser.Scene) {
        this.scene = scene;
        this.scene.physics.add.
        this.boxHandler = new ColliderBoxHandler();
        return;
    }
    /**
     * create
     */
    public create(scene: Phaser.Scene) {
        this.text = scene.add.text(250, 16, '', null);
        SceneEditorToolBelt.switchTool(this, SceneEditorToolTypes.Rectangle);
        this.boxHandler._create();
    }
    /**
     * update
     */
    public update(scene: Phaser.Scene) {
        SceneEditorToolBelt.handleToolUpdate(this);

        const mouse = this.game.input.activePointer
        this.text.text = "x: " + mouse.x + " y: " + mouse.y
    }
}