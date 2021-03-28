import { ComponentHandler, Component } from "../ecs/ComponentHandler";
import { MysticPlugin } from "../scene_editor/MysticPlugin";
import { PositionUtils, OriginPosition } from "../display/PositionUtils";

interface ColliderBox extends Component {
    position: [number, number],
    dimensions: [number, number],
    rectangle: MatterJS.BodyType,
}
export class ColliderBoxHandler extends ComponentHandler {
    pause: boolean
    constructor() {
        super();
        this.pause = false;
        const curScene = MysticPlugin.singleton.scene;
        curScene.matter.world.setBounds();
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
        curCollider.rectangle = curScene.matter.add.rectangle(topLeft[0], topLeft[1], curCollider.dimensions[0],curCollider.dimensions[1]);
        if (!this.pause) {
            curScene.matter.pause();
            this.pause = true;
        } else {
            curScene.matter.resume();
            this.pause = false;
        }
        return;
    }
    update() {
        return;
    }
    onRemove() {
        return;
    }
} 