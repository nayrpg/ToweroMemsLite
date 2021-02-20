import 'phaser'
import { Scene } from 'phaser';
import { ColliderBox } from '../../components/ColliderBox';
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
    init (editPlug: MysticPlugin) {
        const scene = editPlug.scene;
        scene.input.on('pointerdown', function (pointer) {
            scene.add.image(pointer.x, pointer.y, 'star', Phaser.Math.Between(0, 5));
            editPlug.clickDownPos = [pointer.x, pointer.y];
            this.drawing = true;
        }, scene)
        scene.input.on('pointerup', function (pointer) {
            scene.add.image(pointer.x, pointer.y, 'star', Phaser.Math.Between(0, 5));
            let width = pointer.x - editPlug.clickDownPos[0];
            let height = pointer.y - editPlug.clickDownPos[1];
            const drawPoint: [number, number] =
                [width<0 ? editPlug.clickDownPos[0] : pointer.x, height<0 ? editPlug.clickDownPos[1] : pointer.y];
            width = Math.abs(width);
            height = Math.abs(height);
            const topLeft = PositionUtils.positionOfTopLeft(drawPoint, width, height, OriginPosition.MidCenter)
            scene.add.rectangle(topLeft[0], topLeft[1], width, height,  0x005500);
            editPlug.boxHandler.addCollider(null, drawPoint, [width, height])
            this.drawing = false
        }, scene);
        super.init(editPlug);
    }
    update(editPlug: MysticPlugin) {
        return;
    }
}