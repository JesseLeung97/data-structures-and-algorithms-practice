// Methods to implement
// Insertion
// Removal
// Poll
// Peek
// Index of

(function() {
//#region Binary heap (min)
class BinaryHeap<T> {
    _size: number = 0;
    _capacity: number = 0;
    _heapNodes: T[] | null = null;
    _comparator: (elem1: T, elem2: T) => -1 | 0 | 1;

    // Utility for creating static array
    // _Array<T>(length: number): T[] {
    //     return Object.seal(Array<T>(length).fill(null));
    // }

    _DynamicArray<T>(length: number): T[] {
        return Array<T>(length).fill(null);
    }

    constructor(elements: T[], comparator: (elem1: T, elem2: T) => -1 | 0 | 1 ) {
        this._capacity = elements.length;
        this._comparator = comparator;
        this._heapNodes = this._DynamicArray<T>(elements.length);
        this.heapify(this._heapNodes);
        elements.forEach(elem => this.insert(elem));
    }

    _outOfBounds(idx: number): boolean {
        if(idx < 0 || idx > length - 1) {
            return true;
        }
        return false;
    }

    _parentIdx(idx: number): number {
        const parentIdx = (idx - 1) / 2;
        if(this._outOfBounds(parentIdx)) {
            return -1;
        }
        return parentIdx
    }

    _leftChildIdx(idx: number): number {
        const leftChildIdx = (idx * 2) + 1;
        if(this._outOfBounds(leftChildIdx)) {
            return -1;
        }
        return leftChildIdx;
    }

    _rightChildIdx(idx: number): number {
        const rightChildIdx = (idx * 2) + 2;
        if(this._outOfBounds(rightChildIdx)) {
            return -1;
        }
        return rightChildIdx;
    }

    _isLess(idx1: number, idx2: number): boolean {
        const elem1 = this._heapNodes[idx1];
        const elem2 = this._heapNodes[idx2];
        return this._comparator(elem1, elem2) <= 0;
    }

    _swap(idx1: number, idx2: number) {
        const temp = this._heapNodes[idx2];
        this._heapNodes[idx2] = this._heapNodes[idx1];
        this._heapNodes[idx1] = temp;
    }

    insert(element: T) {
        this._size++;
        let idx = this._size;
        this._heapNodes[idx] = element;
        this._bubbleUp(idx);
    }

    _bubbleUp(idx: number): void {
        let parent = this._parentIdx(idx);
        while(idx > 0 && this._isLess(idx, parent)) {
            this._swap(idx, parent);
            idx = parent;
            parent = this._parentIdx(idx);
        }
    }

    heapify(elements: T[]) {


    }
    
}
//#endregion

//#region Test
//#endregion
})();