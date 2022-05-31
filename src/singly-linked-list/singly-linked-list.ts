// Methods to implement
// Traversal
// Insertion
// Deletion
// Merging (of two or more lists)

(function() {
//#region Linked List
class node<T> {
    value: T;
    next: node<T> | null = null;

    constructor(value: T | null) {
        this.value = value;
        this.next = null;
    }
}

class linkedList<T> {
    head: node<T> | null = null;

    constructor(nodes: T[] | null = null) {
        if(nodes === null) {
            return;
        }
        let iter: node<T> | null = null;
        for(let i = 0; i < nodes.length; i++) {
            const bodyNode = new node(nodes[i]);
            if(this.head === null) {
                this.head = bodyNode;
                iter = this.head;
                continue;
            }
            iter.next = bodyNode;
            iter = bodyNode;
        }
    }

    traversalPrint(): void {
        if(this.head === null) {
            return;
        }
        let stringBuilder = "List elements:";
        let iter: node<T> = this.head;
        while(iter !== null) {
            stringBuilder += ` ${iter.value}`;
            iter = iter.next;
        }
        console.log(stringBuilder);
    }

    append(value: T): void {
        if(this.head === null) {
            this.head = new node<T>(value);
            return;
        }

        let iter: node<T> = this.head;
        while(iter.next !== null) {
            iter = iter.next;
        }
        iter.next = new node<T>(value);
    }

    remove(value: T): node<T> | null {
        if(this.head === null) {
            return null;
        }
        if(this.head !== null && this.head.value === value) {
            return this.head;
        }
        let iterPrev: node<T> = this.head;
        let iterNext: node<T> = this.head.next;
        while(iterNext !== null) {
            if(iterNext.value == value) {
                iterPrev.next = iterNext.next;
                return iterNext;
            }
            iterPrev = iterNext;
            iterNext = iterNext.next;
        }
        return null;

    }

    length(): void {
        if(this.head === null) {
            console.log("Length: 0");
            return;
        }
        let iter: node<T> = this.head;
        let length = 0;
        while(iter !== null) {
            iter = iter.next;
            length++;
        }
        console.log(`Length: ${length}`);
        return;
    }

    merge(list: linkedList<T>): void {
        if(list.head === null) {
            return;
        }
        if(this.head === null) {
            this.head = list.head;
        }
        let iter: node<T> = this.head;
        while(iter.next !== null) {
            iter = iter.next;
        }
        iter.next = list.head;
    }

    reverse(): void {
        if(this.head === null) {
            return;
        }
        let iterPrev: node<T> | null = null; // x
        let iterCurr: node<T> | null = this.head; // y
        let iterNext: node<T> | null = this.head;
        while(iterCurr !== null) {
            iterNext = iterNext.next;
            iterCurr.next = iterPrev;
            iterPrev = iterCurr;
            iterCurr = iterNext;
        }
        this.head = iterPrev;
    }

    // Not done
    zipper(list: linkedList<T>) {
        if(list.head === null) {
            return;
        }
        if(this.head === null) {
            return list.head;
        }
        let baseIter: node<T> | null = this.head;
        let addIter: node<T> | null = list.head;
        let tail: node<T> | null = null;
        let isAdd: boolean = true;
        while(baseIter !== null || addIter !== null) {
            if(isAdd) {
                let temp: node<T> = baseIter.next;
                baseIter.next = addIter;
                tail = addIter;
                baseIter = temp;
                isAdd = !isAdd;
            } else {
                let temp: node<T> = addIter.next;
                addIter.next = baseIter;
                tail = baseIter
                addIter = temp;
                isAdd = !isAdd;
            }
        }

        if(baseIter !== null) {
            tail.next = baseIter;
        }

        if(addIter !== null) {
            tail.next = addIter;
        }
    }
}
//#endregion



//#region Test
function main() {
    let testList = new linkedList<number>();
    testList.length();
    testList.append(3);
    testList.append(7);
    testList.append(0);
    testList.append(5);
    testList.length(); // should print 4
    testList.traversalPrint(); // should print 3,7,0,5
    testList.remove(0);
    testList.traversalPrint(); // should print 3,7,5
    testList.length(); // should print 3
    testList.remove(11);

    let newTestList = new linkedList<number>([10, 8, 111, 24]);
    newTestList.length(); // should print 4
    newTestList.traversalPrint(); // should print 10, 8, 111, 24
    testList.merge(newTestList);
    testList.length(); // should print 7
    testList.traversalPrint(); // should print 3, 7, 5, 10, 8, 111, 24
    testList.reverse();
    testList.traversalPrint();

    let zipListBase = new linkedList<string>(["This", "a", "test"]);
    let zipListAdd = new linkedList<string>(["is", "short", "."]);
    zipListBase.zipper(zipListAdd);
    zipListBase.traversalPrint();

    let zipListBaseUneven = new linkedList<string>(["This", "a", "test"]);
    let zipListAddUneven = new linkedList<string>(["is", "short", "to", "see", "how", "uneven", "works", "."]);
    zipListBase.zipper(zipListAdd);
    zipListBase.traversalPrint();
}

main();
//#endregion
})();
