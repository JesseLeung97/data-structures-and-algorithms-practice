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

    _parent(idx: number): T | null {
        const parentIdx = this._parentIdx(idx);
        if(this._outOfBounds(idx)) {
            return null;
        }
        return this._heapNodes[parentIdx];
    }

    _leftChild(idx: number): T | null {
        const leftChildIdx = (idx * 2) + 1;
        if(this._outOfBounds(leftChildIdx)) {
            return null;
        }
        return this._heapNodes[leftChildIdx];
    }

    _rightChild(idx: number): T | null {
        const rightChildIdx = (idx * 2) + 2;
        if(this._outOfBounds(rightChildIdx)) {
            return null;
        }
        return this._heapNodes[rightChildIdx];
    }

    insert(element: T) {
        this._size++;
        let idx = this._size;
        while(this._comparator(element, this._heapNodes[this._parentIdx(idx)]) < 1) {
            const parentIdx = this._parentIdx(idx);
            const temp = this._heapNodes[parentIdx];
            this._heapNodes[parentIdx] = element;
            this._heapNodes[idx] = temp;
            idx = parentIdx;
        }
    }

    heapify(elements: T[]) {


    }
    
}
//#endregion

//#region Test
//#endregion
})();