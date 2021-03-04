import 'phaser'
import { Scene } from 'phaser';
import { ColliderBoxHandler } from '../../components/ColliderBox';
import { PositionUtils, OriginPosition} from '../../display/PositionUtils'
import { MysticPlugin } from '../MysticPlugin'
import { SceneEditorTool, SceneEditorToolTypes } from '../SceneEditorTool'

export class RectangleTool extends SceneEditorTool {
    drawing: boolean;
    intermediateRect: Phaser.GameObjects.Image;
    public constructor () {
        super();
        this.type = SceneEditorToolTypes.Rectangle;
        this.drawing = false;
    }
    init () {
        const scene = MysticPlugin.singleton.scene;
        scene.input.on('pointerdown', function (pointer) {
            scene.add.image(pointer.x, pointer.y, 'star', Phaser.Math.Between(0, 5));
            MysticPlugin.singleton.clickDownPos = [pointer.x, pointer.y];
            this.drawing = true;
        }, scene)
        scene.input.on('pointerup', function (pointer) {
            scene.add.image(pointer.x, pointer.y, 'star', Phaser.Math.Between(0, 5));
            let width = pointer.x - MysticPlugin.singleton.clickDownPos[0];
            let height = pointer.y - MysticPlugin.singleton.clickDownPos[1];
            const drawPoint: [number, number] =
                [width<0 ? MysticPlugin.singleton.clickDownPos[0] : pointer.x, height<0 ? MysticPlugin.singleton.clickDownPos[1] : pointer.y];
            width = Math.abs(width);
            height = Math.abs(height);
            MysticPlugin.singleton.boxHandler.addCollider(null, drawPoint, [width, height]);
            this.drawing = false;
        }, scene);
        super.init(MysticPlugin.singleton);
    }
    update() {
        return;
    }
}