// Methods to implement
// Insertion
// Removal
// Poll
// Peek
// Index of

(function() {
//#region Binary heap (min)
class BinaryHeap<T> {
    size: number = 0;
    heap: T[] | null = null;
    comparator: (elem1: T, elem2: T) => -1 | 0 | 1;

    _StaticArray(size: number): T[] {
        return Object.seal(new Array<T>(size).fill(null));
    }

    constructor(capacity: number, comparator: (elem1: T, elem2: T) => -1 | 0 | 1) {
        this.heap = this._StaticArray(capacity);
        this.comparator = comparator;
    }

    _isLess(i: number, j: number): boolean {
        return this.comparator(this.heap[i], this.heap[j]) <= 0;
    }

    _outOfBounds(i: number): boolean {
        return i < 0 || i >= this.size;
    }

    _parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    _left(i: number): number {
        return 2 * i + 1;
    }

    _right(i: number): number {
        return 2 * i + 2;
    }

    _swap(i: number, j: number): void {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    _bubbleUp(i: number): void {
        let parent = this._parent(this.size - 1);
        if(this._outOfBounds(parent)) {
            return;
        }
        while(i > 0 && this._isLess(i, parent)) {
            this._swap(i, parent);
            i = parent;
            parent = this._parent(i);
        }
    }

    _bubbleDown(i: number): void {
        while(true) {
            let left = this._left(i);
            let right = this._right(i);
            let smallest = left;
            if(right < this.size && this._isLess(right, left)) {
                smallest = right;
            }
            if(i >= this.size || this._isLess(i, smallest)) {
                break;
            }
            this._swap(i, smallest);
            i = smallest;
        }
    }

    insert(elem: T): void {
        this.size++;
        this.heap[this.size - 1] = elem;
        this._bubbleUp(this.size - 1);
    }

    removeAt(index: number): T | null {
        if(this.size < 0) {
            return null;
        }
        this._swap(index, this.size - 1);
        const removed = this.heap[this.size - 1];
        this.size--;
        if(index === this.size) {
            this.heap[this.size] = null;
            return removed;
        }
        const temp = this.heap[index];
        this._bubbleDown(index);
        if(this.heap[index] === temp) {
            this._bubbleUp(index);
        }
        this.heap[this.size] = null;
        return removed;
    }

    indexOf(elem: T): number {
        for(let i = 0; i < this.size; i++) {
            if(this.heap[i] === elem) {
                return i;
            }
        }
        return -1;
    }

    isMinHeap(i: number): boolean {
        if(i >= this.size) {
            return true;
        }
        const left = this._left(i);
        const right = this._right(i);
        if(left < this.size && this._isLess(left, i)) {
            return false;
        }
        if(right < this.size && this._isLess(right, i)) {
            return false;
        }
        return this.isMinHeap(left) && this.isMinHeap(right);
    }

    elementAt(index: number): T | null {
        if(this._outOfBounds(index)) {
            return null;
        }
        return this.heap[index];
    }
}
//#endregion
//#region  Priority Queue
class PriorityQueue<T> {
    heap: BinaryHeap<T> | null = null;
    
    constructor(capacity: number, comparator: (elem1: T, elem2: T) => -1 | 0 | 1) {
        this.heap = new BinaryHeap<T>(capacity, comparator);
    }

    size(): number {
        return this.heap.size;
    }

    indexOf(elem: T): number {
        return this.heap.indexOf(elem);
    }

    add(elem: T): void {
        this.heap.insert(elem);
    }

    poll(): T | null {
        return this.heap.removeAt(0);
    }

    peek(): T | null {
        return this.heap.elementAt(0);
    }

    remove(elem: T): T | null {
        const index = this.heap.indexOf(elem);
        return this.heap.removeAt(index);
    }

}
//#endregion
//#region Test
function main() {
    let comparator = (a: number, b: number): -1 | 0 | 1 => {
        return ((
            1 * (a > b ? 1 : 0) + 
            0 * (a === b ? 1 : 0) - 
            1 * (b > a ? 1 : 0)) as -1 | 0 | 1) ;
    }
    let queue = new PriorityQueue(10, comparator);
    queue.add(10);
    console.log("peek: ", queue.peek()); // 10
    queue.add(19);
    console.log("peek: ", queue.peek()); // 10
    queue.add(2);
    console.log("peek: ", queue.peek()); // 2
    queue.add(0);
    console.log("peek: ", queue.peek()); // 0
    queue.add(7);
    console.log("peek: ", queue.peek()); // 0
    console.log("size: ", queue.size()); // 5
    console.log("peek: ", queue.peek()); // 0
    console.log("poll: ", queue.poll()); // 0
    console.log(queue.heap.heap);
    console.log("poll: ", queue.poll()); // 2
    console.log(queue.heap.heap);
    console.log("remove: ", queue.remove(10));
    console.log(queue.heap.heap);
    console.log("poll: ", queue.poll()); // 7
    queue.add(9);
    queue.add(9);
    console.log("size: ", queue.size()); // 3
    console.log("peek: ", queue.peek()); // 9
    console.log("poll: ", queue.poll()); // 9
    console.log("poll: ", queue.poll()); // 19
}
main();
//#endregion
})();