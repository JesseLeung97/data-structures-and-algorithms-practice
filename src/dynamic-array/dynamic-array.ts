// Methods to implement
// Size
// Access
// Search
// Insertion
// Deletion
// Appending
(function() {
//#region Dynamic array
class DyanmicArray<T> {
    elements: T[] | null;
    length: number = 0;
    _capacity: number = 0;
    _resizeCapacity = 0.8;
    _resizeFactor = 2;

    constructor(capacity: number = -1, inputElements: T[] | null = null) {
        if(capacity < 0) {
            return;
        }
        if(inputElements === null) {
            this.length = capacity;
            this._capacity = capacity * this._resizeFactor;
            this.elements = this._Array(capacity);
        } else {
            this.length = capacity;
            this._capacity = capacity * this._resizeFactor;
            this.elements = this._Array(this._capacity);
            for(let i = 0; i < inputElements.length; i++) {
                this.elements[i] = inputElements[i];
            }
        }
    }

    // For making a static array in JS
    _Array<T>(length: number): T[] {
        return Object.seal(Array<T>(length).fill(null));
    }

    get(index: number): T {
        return this.elements[index];
    }

    set(index: number, value: T): void {
        this.elements[index] = value;
    }

    // O(1) time.  Length is stored so it can be eaily returned
    size(): number {
        return this.length;
    }

    // O(n) time.  Might search the entire list and not find the element
    indexOf(value: T): number {
        for(let i = 0; i < this.elements.length; i++) {
            if(this.elements[i] === value) {
                return i;
            }
        }
        return -1;
    }

    _resizeArray() {
        this._capacity *= this._resizeFactor;
        let copyArray = this._Array<T>(this._capacity * this._resizeFactor);
        for(let i = 0; i < this.length; i++) {
            copyArray[i] = this.elements[i];
        }
        this.elements = copyArray;
        this.length += 1;
    }

    _needToResize(): boolean {
        if(this.length + 1 > (this._capacity * this._resizeCapacity)) {
            return true;
        }
        return false;
    }

    // O(1) time.  As the number of elements gets unimaginably huge, the number of times a resize is necessary is exeecingly low
    append(value: T): void {
        if(this._needToResize()) {
            this._resizeArray();
        }
        this.elements[this.length] = value;
        this.length += 1;
        
    }

    insert(value: T, index: number): void {
        if(index < 0 || index > this.length - 1) {
            return;
        }
        if(this._needToResize()) {
            this._resizeArray();
        }
        for(let i = this.length; i > index; i--) {
            this.elements[i] = this.elements[i-1];
        }
        this.elements[index] = value;
    }

    deleteIndex(index: number): T {
        if(index < 0 || index > this.length - 1) {
            return null;
        }
        let deletedValue = this.elements[index];
        this.elements[index] = null;
        let i = index;
        for(i; i < this.length; i++) {
            this.elements[i] = this.elements[i+1];
        }
        this.elements[i - 1] = null;
        this.length -= 1;
        return deletedValue;
    }

    deleteValue(value: T): T {
        let i = 0;
        while(i < this.length && this.elements[i] !== value) {
            i++;
        }
        if(i === this.length) {
            return null;
        }
        return this.deleteIndex(i);
    }

    deleteAll(): void {
        let emptyArray = this._Array<T>(this._capacity);
        this.elements = emptyArray;
    }

    printArray(): void {
        let stringBuilder = "Array: [";
        this.elements.forEach(elem => {
            stringBuilder += ` ${elem}`;
        });
        stringBuilder += "]";
        console.log(stringBuilder);
    }
}
//#endregion
//#region Test
function main() {
    let testArray = new DyanmicArray<number>(3);
    testArray.printArray();
    testArray.append(3);
    testArray.append(7);
    testArray.append(813);
    testArray.printArray();
    console.log(testArray.deleteValue(3));
    testArray.printArray();
    testArray.deleteAll();

    let testArrayFilled = new DyanmicArray<number>(undefined, [5, 6, 1002, 435, 667, 124]);
    testArrayFilled.printArray();
}

main();
//#endregion
})();