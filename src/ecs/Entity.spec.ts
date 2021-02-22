import { equal, notEqual } from "assert";
import { SparseSet } from "./SparseSet";
export class Entity {
    static nextId = 0
    static newEntity() : number {
        return Entity.nextId++;
    }
}
describe("Entities", () => {
    it("should always be unique", ()=>{
        const set = new SparseSet();
        for (let i = 0; i < 16; i++) {
           const ent = new Entity();
           equal(set.checkFor(ent as number) < 0, true);
           set.insert(ent as number);
        }
    })
});