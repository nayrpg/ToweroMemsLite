import { ComponentHandler, Component } from "../ecs/ComponentHandler";
import { MysticPlugin } from "../scene_editor/MysticPlugin";
import { PositionUtils, OriginPosition } from "../display/PositionUtils";

interface ColliderBox extends Component {
    position: [number, number],
    dimensions: [number, number],
    rectangle: Phaser.GameObjects.Rectangle,
}
export class ColliderBoxHandler extends ComponentHandler {
    constructor() {
        super();
    }
    addCollider(ent: number, pos: [number, number], dim: [number, number]) {
        const collider: ColliderBox = {entity: ent, position: pos, dimensions: dim, rectangle: null};
        this.addComponent(ent, collider);
    }
    preload() {
        return;
    }
    create(component: Component) {
        let curCollider = component as ColliderBox;
        const curScene = MysticPlugin.singleton.scene;
        if (curScene === null) {
            throw Error("Scene should never be null when loading components");
        }
        const topLeft = PositionUtils.positionOfTopLeft(curCollider.position, curCollider.dimensions[0], curCollider.dimensions[1], OriginPosition.MidCenter);
        curCollider.rectangle = curScene.add.rectangle(topLeft[0], topLeft[1], curCollider.dimensions[0],curCollider.dimensions[1]);
        curCollider.rectangle.setStrokeStyle(1,0xffff00);
        curScene.physics.add.existing(curCollider.rectangle);
        curScene.
        let body = curCollider.rectangle.body as Phaser.Physics.Arcade.Body;
        body.collideWorldBounds=true;
        
        return;
    }
    update() {
        return;
    }
    onRemove() {
        return;
    }
}