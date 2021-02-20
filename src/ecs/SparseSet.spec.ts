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
    set.insert(1,[],[]);
    set.insert(5,[],[]);
    set.insert(2,[],[]);
    equal(set.checkFor(5)  >= 0, true);
    equal(set.checkFor(2)  >= 0, true);
    equal(set.checkFor(1)  >= 0, true);
    equal(set.checkFor(0)  >= 0, false);
    return set;
}
function addWithPartner() : [SparseSet, any[]] {
    const set = makeSparseSetInst();
    const partnerDense: number [] = []
    set.insert(1,[partnerDense],[3]);
    set.insert(5,[partnerDense],[5]);
    set.insert(2,[partnerDense],[7]);
    const find5 =  set.checkFor(5);
    const find2 =  set.checkFor(2);
    const find1 =  set.checkFor(1);
    equal(find5 >= 0, true);
    equal(partnerDense[find5], 5)
    equal(find2 >= 0, true);
    equal(partnerDense[find2], 7)
    equal(find1 >= 0, true);
    equal(partnerDense[find1], 3)
    equal(set.checkFor(0)  >= 0, false);
    return [set, partnerDense];
}
function addNegItems() : SparseSet {
    const set = makeSparseSetInst();
    set.insert(1,[],[]);
    set.insert(-5,[],[]);
    equal(set.checkFor(-5)  >= 0, false);
    equal(set.checkFor(1)  >= 0, true);
    equal(set.checkFor(0)  >= 0, false);
    return set;
}
function removeAddedItems() : SparseSet {
    const set = addItems();
    set.remove(2,[]);
    set.remove(1,[]);
    equal(set.checkFor(5)  >= 0, true);
    equal(set.checkFor(2)  >= 0, false);
    equal(set.checkFor(1)  >= 0, false);
    equal(set.checkFor(0)  >= 0, false);
    return set;
}
function removeWithPartner() : [SparseSet, any[]] {
    const [set, partnerDense] = addWithPartner();
    set.remove(2,[partnerDense]);
    set.remove(1,[partnerDense]);
    const find5 =  set.checkFor(5);
    const find2 =  set.checkFor(2);
    const find1 =  set.checkFor(1);
    equal(find5 >= 0, true);
    equal(partnerDense[find5], 5)
    equal(find2 >= 0, false);
    equal(partnerDense.includes(7), false)
    equal(find1 >= 0, false);
    equal(partnerDense.includes(3), false)
    equal(set.checkFor(0)  >= 0, false);
    return [set, partnerDense];
}
describe("Sparse Set Implementation", () => {
  it("should be able to make an instance", makeSparseSetInst);
  it("should be able to add to the set", addItems);
  it("should not be able to add negative values to the set", addNegItems);
  it("should be able to remove from the set", removeAddedItems);
  it("should be able to add to the set and partner dense array", addWithPartner);
  it("should be able to remove from the set and partner dense array", removeWithPartner);
});