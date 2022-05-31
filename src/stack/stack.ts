// Stack methods to implement
// Push
// Pop
// Peek
// Pop all
// ToString
// Find
// Size

// Linked list methods to implement
// Insert head
// Insert tail
// Remove at head
// Remove at tail
// Insertion
// Removal

(function() {
//#region Linked list
class Node<T> {
    next: Node<T> | null = null;
    value: T

    constructor(value: T, next: Node<T> | null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList<T> {
    head: Node<T> | null = null;
    tail: Node<T> | null = null;

    insertHead(value: T): void {
        if(this.head === null) {
            const node = new Node<T>(value, null);
            this.head = node;
            this.tail = node;
            return;
        }
        const node = new Node(value, this.head);
        this.head = node;
    }

    insertTail(value: T): void {
        if(this.head === null) {
            const node = new Node<T>(value, null);
            this.head = node;
            this.tail = node;
            return;
        }
        const node = new Node<T>(value, null);
        this.tail.next = node;
        this.tail = node;
    }

    removeHead(): T | null {
        if(this.head === null) {
            return null;
        }
        const removed = this.head;
        this.head = this.head.next;
        return removed.value;
    }

    removeTail(): T | null {
        if(this.head === null) {
            return null;
        }
        let iter = this.head;
        while(iter.next !== this.tail) {
            iter = iter.next;
        }
        const removed = this.tail;
        this.tail = iter;
        return removed.value;
    }

    insert(index: number, value: T): void {
        if(this.head === null || index === 0) {
            this.insertHead(value);
        }
        let iter = this.head;
        let i = 0;
        while(i < index - 1 && iter !== null) {
            iter = iter.next;
            i++;
        }
        const node = new Node<T>(value, iter.next);
        iter.next = node;
    }

    remove(value: T): T | null {
        if(this.head === null) {
            return null;
        }
        let trailIter = this.head;
        let leadIter = this.head.next;
        while(leadIter != null) {
            if(leadIter.value === value) {
                const removed = leadIter;
                trailIter.next = leadIter.next;
                return removed.value;
            }
            trailIter = leadIter;
            leadIter = leadIter.next;
        }
        return null;
    }

    toString(): string {
        if(this.head === null) {
            return "";
        }
        let builder = "[";
        let iter = this.head;
        while(iter !== null) {
            builder += ` ${iter.value}`;
            iter = iter.next;
        }
        builder += " ]";
        return builder;
    }

    indexOf(value: T): number {
        if(this.head === null) {
            return -1;
        }
        let iter = this.head;
        let i = 0;
        while(iter !== this.tail) {
            if(iter.value === value) {
                return i;
            }
            iter = iter.next;
            i++;
        }
        return -1;
    }

    size(): number {
        if(this.head === null) {
            return 0;
        }
        let iter = this.head;
        let count = 0;
        while(iter !== null) {
            iter = iter.next;
            count++;
        }
        return count;
    }
}
//#endregion

//#region Stack
class Stack<T> {
    stack: LinkedList<T> | null = null;

    constructor() {
        this.stack = new LinkedList<T>();
    }

    push(value: T): void {
        this.stack.insertHead(value);
    }

    pop(): T | null {
        return this.stack.removeHead();
    }

    peek(): T | null {
        if(this.stack.head === null) {
            return null;
        }
        return this.stack.head.value;
    }

    toString(): string {
        return this.stack.toString();
    }

    indexOf(value: T): number {
        return this.stack.indexOf(value);
    }

    size(): number {
        return this.stack.size();
    }
}
//#endregion

//#region Test
function main() {
    let stack = new Stack<string>();
    stack.push("order");
    stack.push("reverse");
    stack.push("out");
    stack.push("checking");
    console.log("Stack: ", stack.toString());
    console.log("Size: ", stack.size());
    console.log("Index of 'out': ", stack.indexOf("out"));
    console.log(stack.pop());
    console.log(stack.pop());
    console.log(stack.pop());
    console.log(stack.pop());
    console.log("Stack: ", stack.toString());
    console.log("Size: ", stack.size());
    console.log("Index of 'out': ", stack.indexOf("out"));
}

main();
//#endregion
})();