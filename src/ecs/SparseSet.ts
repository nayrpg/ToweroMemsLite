export class SparseSet {
    sparse: number[]
    dense: number[]
    constructor() {
        this.sparse = [];
        this.dense = [];
    }
    insert(item: number) {
        this.stretchSparse(item);
        this.sparse[item]=this.dense.length
        this.dense.push(item);
    }
    checkFor(item: number) : boolean {
        return item > 0 && item < this.sparse.length ? this.dense[this.sparse[item]] == item : false;
    }
    stretchSparse(accessedItem: number) {
        for (let i = this.sparse.length; i < accessedItem+1; i++) {
            this.sparse.push(null);
        }
    }
}