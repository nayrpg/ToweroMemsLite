export class Entity {
    static nextId = 0
    static newEntity() : number {
        return Entity.nextId++;
    }
}