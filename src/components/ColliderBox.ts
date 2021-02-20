import { ComponentHandler } from "../ecs/ComponentHandler";

export class ColliderBox extends ComponentHandler {
    constructor() {
        super();
    }
    addCollider(ent: number, pos: [number, number], dim: [number, number]) {
        const collider = {entity: ent, position: pos, dimensions: dim};
        this.addComponent(ent, collider);
    }
    update() {
        return
    }
    preload() {
        return
    }
    create() {
        return
    }
}