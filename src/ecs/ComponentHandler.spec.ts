import { equal, notEqual } from "assert";
import { Component, ComponentHandler } from "./ComponentHandler";
import { Entity } from "./Entity";
interface TestComponent extends Component{
    preloadRun: boolean
    createRun: boolean
    updateRun: boolean
    preloadFirst: boolean
}
class TestComponentHandler extends ComponentHandler {
    onRemoveRun: boolean = false
    addTestComponent(ent: Entity = null) : Entity {
        const newComp: TestComponent = {
            entity: ent,
            preloadRun: false,
            createRun: false,
            updateRun: false,
            preloadFirst: false,
        };
        return super.addComponent(ent, newComp as Component);
    }
    addLoadedTestComponent(ent: Entity = null) : Entity {
        const newComp: TestComponent = {
            entity: ent,
            preloadRun: false,
            createRun: false,
            updateRun: false,
            preloadFirst: false,
        };
        return super.addLoadedComponent(ent, newComp as Component);
    }

    preload(comp: Component) {
        const testComp = comp as TestComponent
        testComp.preloadRun = true;
        testComp.preloadFirst = !(testComp.createRun || testComp.createRun);
        return;
    }
    create(comp: Component) {
        const testComp = comp as TestComponent
        testComp.createRun = true;
        return;
    }
    update(comp: Component) {
        const testComp = comp as TestComponent
        testComp.updateRun = true;
        return;
    }
    onRemove(comp: Component) {
        const testComp = comp as TestComponent
        this.onRemoveRun = true;
        return;
    }
}

describe("The ComponentHandler parent type", () => {
    it("should be extended", () => {
        const test = new TestComponentHandler();
    });
    it("should be able to add the component to the entity", () => {
        const test = new TestComponentHandler();
        const ent = test.addTestComponent()
        notEqual(test.getComponent(ent), null);
    });
    it("should run the preload and then create when the component is added at run-time", () => {
        const test = new TestComponentHandler();
        const ent = test.addTestComponent()
        const component = test.getComponent(ent);
        notEqual(component, null);
        if (component === null) {
            return;
        }
        const testComp: TestComponent = component as TestComponent;
        equal(testComp.preloadRun, true);
        equal(testComp.createRun, true);
        equal(testComp.preloadFirst, true);
        equal(testComp.updateRun, false);
    });
    it("should not run the preload and then create when the component is added at load-time", () => {
        const test = new TestComponentHandler();
        const ent = test.addLoadedTestComponent()
        const component = test.getComponent(ent);
        notEqual(component, null);
        if (component === null) {
            return;
        }
        const testComp: TestComponent = component as TestComponent;
        equal(testComp.preloadRun, false);
        equal(testComp.createRun, false);
        equal(testComp.preloadFirst, false);
        equal(testComp.updateRun, false);
    });
    it("should run each stage as called(preload, create, update) when addLoadedCompent is called", () => {
        const test = new TestComponentHandler();
        const ent = test.addLoadedTestComponent()
        const ent2 = test.addLoadedTestComponent()
        const component = test.getComponent(ent);
        notEqual(component, null);
        if (component === null) {
            return;
        }
        const component2 = test.getComponent(ent);
        notEqual(component2, null);
        if (component2 === null) {
            return;
        }
        const testComp: TestComponent = component as TestComponent;
        const testComp2: TestComponent = component2 as TestComponent;
        equal(testComp.preloadRun, false);
        equal(testComp.createRun, false);
        equal(testComp.preloadFirst, false);
        equal(testComp.updateRun, false);
        equal(testComp2.preloadRun, false);
        equal(testComp2.createRun, false);
        equal(testComp2.preloadFirst, false);
        equal(testComp2.updateRun, false);
        test._preload();
        equal(testComp.preloadRun, true);
        equal(testComp.createRun, false);
        equal(testComp.preloadFirst, true);
        equal(testComp.updateRun, false);
        equal(testComp2.preloadRun, true);
        equal(testComp2.createRun, false);
        equal(testComp2.preloadFirst, true);
        equal(testComp2.updateRun, false);
        test._create();
        equal(testComp.preloadRun, true);
        equal(testComp.createRun, true);
        equal(testComp.preloadFirst, true);
        equal(testComp.updateRun, false);
        equal(testComp2.preloadRun, true);
        equal(testComp2.createRun, true);
        equal(testComp2.preloadFirst, true);
        equal(testComp2.updateRun, false);
        test._update();
        equal(testComp.preloadRun, true);
        equal(testComp.createRun, true);
        equal(testComp.preloadFirst, true);
        equal(testComp.updateRun, true);
        equal(testComp2.preloadRun, true);
        equal(testComp2.createRun, true);
        equal(testComp2.preloadFirst, true);
        equal(testComp2.updateRun, true);
    });
    it("should be able to add a component to an existing entity at load-time", () => {
        const test = new TestComponentHandler();
        const ent = Entity.newEntity();
        test.addLoadedTestComponent(ent);
        const component = test.getComponent(ent);
        notEqual(component, null);
        if (component === null) {
            return;
        }
        const testComp: TestComponent = component as TestComponent;
        equal(testComp.preloadRun, false);
        equal(testComp.createRun, false);
        equal(testComp.preloadFirst, false);
        equal(testComp.updateRun, false);
    });
    it("should be able to add a component to an existing entity at run-time", () => {
        const test = new TestComponentHandler();
        const ent = Entity.newEntity();
        test.addTestComponent(ent);
        const component = test.getComponent(ent);
        notEqual(component, null);
        if (component === null) {
            return;
        }
        const testComp: TestComponent = component as TestComponent;
        equal(testComp.preloadRun, true);
        equal(testComp.createRun, true);
        equal(testComp.preloadFirst, true);
        equal(testComp.updateRun, false);
    });
    it("should be able to remove a component after adding it", () => {
        const test = new TestComponentHandler();
        const ent = Entity.newEntity();
        test.addTestComponent(ent);
        let component = test.getComponent(ent);
        notEqual(component, null);
        if (component === null) {
            return;
        }
        const testComp: TestComponent = component as TestComponent;
        equal(testComp.preloadRun, true);
        equal(testComp.createRun, true);
        equal(testComp.preloadFirst, true);
        equal(testComp.updateRun, false);
        test.onRemoveRun = false;
        test.removeComponent(ent);
        component = test.getComponent(ent)
        equal(component, null);
        equal(test.onRemoveRun, true);
    });
})