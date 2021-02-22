import { Entity } from "./Entity";
import { SparseSet } from "./SparseSet";
export interface Component{
    entity: Entity
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
    getComponent(entity: Entity) : Component {
       const index = this.entities.checkFor(entity as number);
       return index < 0 ? null : this.components[index];
    }
    addLoadedComponent(entity: Entity = null, component: Component) : Entity {
        if (entity === null) {
            entity = Entity.newEntity();
            component.entity = entity;
        }
        // console.log("Entity: " + entity);
        // console.log("Component: " + component);

        const index = this.entities.insert(entity as number, [this.components], [component]);
        return entity;
    }

    addComponent(entity: Entity = null, component: Component) : Entity {
        if (entity === null) {
            entity = Entity.newEntity();
            component.entity = entity;
        }
        // console.log("Entity: " + component["entity"]);
        // console.log("Component: " + component);

        const index = this.entities.insert(entity as number, [this.components], [component]);
        this.preload(component);
        this.create(component);
        return entity;
    }
    abstract create(component: Component);
    abstract preload(component: Component);
    abstract update(component: Component);
}