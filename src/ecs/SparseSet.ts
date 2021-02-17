export class SparseSet {
    sparse: Object
    sparseLength: number
    dense: number[]
    constructor() {
        this.sparse = {};
        this.sparseLength = 0;
        this.dense = [];
    }
    insert(item: number) {
        if (this.checkFor(item) || item < 0) {
            return;
        }
        this.stretchSparse(item);
        this.sparse[item]=this.dense.length
        this.dense.push(item);
    }
    checkFor(item: number) : boolean {
        return item >= 0 && item < this.sparseLength ? this.dense[this.sparse[item]] === item : false;
    }
    stretchSparse(accessedItem: number) {
        if (this.sparseLength < accessedItem + 1) {
            this.sparseLength = accessedItem + 1;
        }
    }
    remove(removeItem: number) {
        if (!this.checkFor(removeItem)) {
            return
        }
        const n = this.sparse[removeItem];
        this.dense[n] = this.dense[this.dense.length - 1];
        this.sparse[this.dense[n]] = n;
        this.dense.pop();
        // console.log(this.dense);
        // console.log(this.sparse);
    }
}