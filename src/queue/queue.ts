// Qeueu methods to implement
// Enqueue
// Dequeue
// Peek
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
//#region Doubly linked list
class Node<T> {
    value: T;
    next: Node<T> | null = null;
    previous: Node<T> | null = null;

    constructor(value: T, next: Node<T> | null, previous: Node<T> | null) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }
}
class DoublyLinkedList<T> {
    head: Node<T> = null;
    tail: Node<T> = null;
    length: number = 0;

    insertHead(value: T): void {
        this.length++;
        if(this.head === null) {
            const node = new Node<T>(value, null, null);
            this.head = node;
            this.tail = node;
            return;
        }
        const node = new Node<T>(value, this.head, null);
        this.head = node;
    }

    insertTail(value: T): void {
        this.length++;
        if(this.head === null) {
            const node = new Node<T>(value, null, null);
            this.head = node;
            this.tail = node;
            return;
        }
        const node = new Node<T>(value, null, this.tail);
        this.tail.next = node;
        this.tail = node;
    }

    removeHead(): T | null {
        if(this.head === null) {
            return null;
        }
        this.length--;
        const removed = this.head;
        this.head = this.head.next;
        if(this.head !== null) {
            this.head.previous = null;
        }
        return removed.value;
    }

    removeTail(): T | null {
        if(this.head === null) {
            return null;
        }
        this.length--;
        const removed = this.tail;
        this.tail = this.tail.previous;
        this.tail.next = null;
        return removed.value;
    }

    insert(index: number, value: T): void {
        if(this.head === null || (index < 0 || index > this.length - 1)) {
            return;
        }
        if(index === 0) {
            this.insertHead(value);
            return;
        }
        let iter = this.head;
        let i = 0;
        while(iter !== null) {
            if(i === index - 1) {
                const node = new Node<T>(value, iter.next, iter);
                iter.next = node;
                node.next.previous = node;
                this.length++;
            }
            iter = iter.next;
            i++;
        }
    }

    remove(index: number, value: T): T | null {
        if(this.head === null || (index < 0 || index > this.length - 1)) {
            return null;
        }
        if(index === 0) {
            return this.removeHead();
        }
        if(index === this.length - 1) {
            return this.removeTail();
        }
        let iter = this.head;
        let i = 0;
        while(iter !== null) {
            if(i === index - 1) {
                const removed = iter.next;
                iter.next = iter.next.next;
                iter.next.previous = iter;
                this.length--;
                return removed.value;
            }
            iter = iter.next;
            i++;
        }
        return null;
    }

    indexOf(value: T): number {
        if(this.head === null) {
            return -1;
        }
        let iter = this.head;
        let i = 0;
        while(iter !== null) {
            if(iter.value === value) {
                return i;
            }
            iter = iter.next;
            i++;
        }
        return -1;
    }

    elementAt(index: number): T | null {
        if(this.head === null || (index < 0 || index > this.length - 1)) {
            return null;
        }
        let iter = this.head;
        let i = 0;
        while(iter !== null) {
            if(i === index) {
                return iter.value;
            }
            iter = iter.next;
            i++;
        }
        return null;
    }

    toString(): string {
        let builder = "[";
        let iter = this.head;
        while(iter !== null) {
            builder += ` ${iter.value}`;
            iter = iter.next;
        }
        builder += " ]";
        return builder;
    }
}
//#endregion
//#region Queue
class Queue<T> {
    list: DoublyLinkedList<T> | null = null;

    constructor() {
        this.list = new DoublyLinkedList<T>();
    }

    enqueue(value: T): void {
        this.list.insertTail(value);
    }

    dequeue(): T {
        return this.list.removeHead();
    }

    peek(): T {
        return this.list.elementAt(0);
    }

    toString(): string {
        return this.list.toString();
    }

    size(): number {
        return this.list.length;
    }
}
//#endregion

//#region Test
function main() {
    let queue = new Queue<string>();
    console.log(queue.size(), queue.toString());
    queue.enqueue("Let's");
    queue.enqueue("check");
    queue.enqueue("out");
    queue.enqueue("a");
    queue.enqueue("queue");
    queue.enqueue("that");
    queue.enqueue("probably");
    queue.enqueue("doesn't");
    queue.enqueue("work");
    queue.enqueue("lol");
    console.log(queue.size(), queue.toString());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
}

main();
//#endregion
})();