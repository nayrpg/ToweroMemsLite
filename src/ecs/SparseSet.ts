export class SparseSet {
    sparse: object
    sparseLength: number
    dense: number[]
    constructor() {
        this.sparse = {};
        this.sparseLength = 0;
        this.dense = [];
    }
    insert(item: number, partnerDenseArrays: any[][], insValues: any[]) {
        if (item < 0 || this.checkFor(item) > 0) {
            return;
        }
        this.stretchSparse(item);
        this.sparse[item]=this.dense.length
        this.dense.push(item);

        partnerDenseArrays.forEach((array, index)=>{
            array.push(insValues[index]);
        });
        // console.log(this.dense);
        // console.log(this.sparse);
    }
    checkFor(item: number) : number {
        if(item >= 0 && item < this.sparseLength &&
            this.dense[this.sparse[item]] === item) {
            return this.sparse[item];
        } else {
            return -1;
        }
    }
    stretchSparse(accessedItem: number) {
        if (this.sparseLength < accessedItem + 1) {
            this.sparseLength = accessedItem + 1;
        }
    }
    remove(removeItem: number, partnerDenseArrays: any[][]) {
        if (this.checkFor(removeItem) < 0) {
            return
        }
        const n = this.sparse[removeItem];
        this.dense[n] = this.dense[this.dense.length - 1];
        this.sparse[this.dense[n]] = n;
        this.dense.pop();

        partnerDenseArrays.forEach((array, index)=>{
            array[n] = array[array.length - 1];
            array.pop();
        });
        // console.log(this.dense);
        // console.log(this.sparse);
    }
}