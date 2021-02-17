import { equal, notEqual } from "assert";
import { SparseSet } from "./SparseSet";
function makeSparseSetInst() : SparseSet {
    const set = new SparseSet();
    notEqual(set, undefined);
    notEqual(set, null);
    return set;
}
function addItems() : SparseSet {
    const set = makeSparseSetInst();
    set.insert(1);
    set.insert(5);
    set.insert(2);
    equal(set.checkFor(5), true);
    equal(set.checkFor(2), true);
    equal(set.checkFor(1), true);
    equal(set.checkFor(0), false);
    return set;
}
function addNegItems() : SparseSet {
    const set = makeSparseSetInst();
    set.insert(1);
    set.insert(-5);
    equal(set.checkFor(-5), false);
    equal(set.checkFor(1), true);
    equal(set.checkFor(0), false);
    return set;
}
function removeAddedItems() : SparseSet {
    const set = addItems();
    set.remove(2);
    set.remove(1);
    equal(set.checkFor(5), true);
    equal(set.checkFor(2), false);
    equal(set.checkFor(1), false);
    equal(set.checkFor(0), false);
    return set;
}
describe("Sparse Set Implementation", () => {
  it("should be able to make an instance", makeSparseSetInst);
  it("should be able to add to the set", addItems);
  it("should not be able to add negative values to the set", addNegItems);
  it("should be able to remove from the set", removeAddedItems);
});