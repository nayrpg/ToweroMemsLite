import { Entity } from "./Entity";
import { SparseSet } from "./SparseSet";
export interface Component{
    entity: number
}
export abstract class ComponentHandler {
    private entities: SparseSet
    private components: Component[]
    constructor() {
        this.components = [];
        this.entities = new SparseSet();
    }
    _create() {
        for(const component of this.components) {
            this.create(component)
        }
    }
    _preload() {
        for(const component of this.components) {
            this.preload(component)
        }
    }
    _update() {
        for(const component of this.components) {
            this.update(component)
        }
    }
    getComponent(entity: number) : Component {
       const index = this.entities.checkFor(entity);
       return index < 0 ? null : this.components[index];
    }
    addLoadedComponent(entity: number, component: Component) {
        if (entity === null) {
            entity = Entity.newEntity();
            component.entity = entity;
        }
        // console.log("Entity: " + entity);
        // console.log("Component: " + component);

        const index = this.entities.insert(entity, [this.components], [component]);
    }

    addComponent(entity: number, component: Component) {
        if (entity === null) {
            entity = Entity.newEntity();
            component.entity = entity;
        }
        // console.log("Entity: " + component["entity"]);
        // console.log("Component: " + component);

        const index = this.entities.insert(entity, [this.components], [component]);
        this.preload(component);
        this.create(component);
    }
    abstract create(component: Component);
    abstract preload(component: Component);
    abstract update(component: Component);
}