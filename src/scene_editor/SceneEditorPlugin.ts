import 'phaser'
import {SceneEditorTool, SceneEditorToolTypes, } from './SceneEditorTool';
import { SceneEditorToolBelt } from './SceneEditorToolBelt'

export class SceneEditorPlugin extends Phaser.Plugins.BasePlugin {
    scene: Phaser.Scene;
    text: Phaser.GameObjects.Text;
    clickDownPos: [integer, integer];
    tool: SceneEditorTool;

    public constructor (pluginManager) {
        super(pluginManager);
    }
    /**
     * preload
     */
    public preload(scene: Phaser.Scene) {
        return;
    }
    /**
     * create
     */
    public create(scene: Phaser.Scene) {
        this.scene = scene;
        this.text = scene.add.text(250, 16, '', null);
        SceneEditorToolBelt.switchTool(this, SceneEditorToolTypes.Rectangle);
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