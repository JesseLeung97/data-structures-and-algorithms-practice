// Methods to implement
// Traversal
// Insertion
// Deletion
// Merging (of two or more lists)
(function() {
//#region Doubly linked list
class node<T> {
    value: T;
    next: node<T> | null = null;
    previous: node<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

class doubleLinkedList<T> {
    head: node<T> | null = null;

    constructor(elements: T[] | null = null) {
        if(elements === null) {
            return;
        }
        let iter: node<T> | null = null;
        elements.forEach(elem => {
            if(this.head === null) {
                this.head = new node<T>(elem);
                iter = this.head;
                return;
            }
            const newNode: node<T> = new node<T>(elem);
            iter.next = newNode;
            newNode.previous = iter;
            iter = newNode;
        });
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
        let iterPrev: node<T> = this.head;
        let iterCurr: node<T> = this.head.next;
        while(iterCurr !== null) {
            if(iterCurr.value === value) {
                iterPrev.next = iterCurr.next;
                iterCurr.next.previous = iterPrev;
                return iterCurr;
            }
            iterPrev = iterCurr;
            iterCurr = iterCurr.next;
        }

        return null;
    }

    traversalPrint(): void {
        let stringBuilder = "List items:";
        let iter: node<T> = this.head;
        while(iter !== null) {
            stringBuilder += ` ${iter.value}`;
            iter = iter.next;
        }
        console.log(stringBuilder);
    }

    length(): void {
        let length = 0;
        let iter: node<T> = this.head;
        while(iter !== null) {
            length++;
            iter = iter.next;
        }
        console.log(`Length: ${length}`);
    }

    merge(list: doubleLinkedList<T>): void {
        if(list.head === null) {
            return;
        }
        if(this.head === null) {
            this.head = list.head;
            return;
        }
        let iter: node<T> = this.head;
        while(iter.next !== null) {
            iter = iter.next;
        }
        iter.next = list.head;
        return;
    }

    reverse(): void {
        if(this.head === null) {
            return;
        }
        let temp: node<T> | null = null;
        let iter: node<T> | null = this.head;
        while(iter !== null) {
            iter.previous = iter.next;
            iter.next = temp;
            temp = iter;
            iter = iter.previous;
        }
        this.head = temp;
    }
}
//#endregion

//#region Test
function main() {
    let testList = new doubleLinkedList<number>();
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

    let newTestList = new doubleLinkedList<number>([10, 8, 111, 24]);
    newTestList.length(); // should print 4
    newTestList.traversalPrint(); // should print 10, 8, 111, 24
    testList.merge(newTestList);
    testList.length(); // should print 7
    testList.traversalPrint(); // should print 3, 7, 5, 10, 8, 111, 24
    testList.reverse();
    testList.traversalPrint();
}

main();
//#endregion
})()
