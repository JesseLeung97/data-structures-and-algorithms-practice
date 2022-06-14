// Methods to implement
// Insertion
// Deletion
// Removal
// Search
// Traversal
// Inorder
// Preorder
// Postorder

(function() {
//#region Queue (taken from queue folder)
function StaticArray<T>(length: number): T[] {
    return Object.seal(Array<T>(length).fill(null));
}

class Queue<T> {
    array: Array<T> | null = null;
    front: number = 0;
    end: number = 0;

    constructor(maxQueueLength: number) {
        this.array = StaticArray<T>(maxQueueLength);
    }

    enqueue(value: T): void {
        if(this.end + 1 > this.array.length - 1) {
            this.end = 0;
            this.array[this.end] = value;
            return;
        }
        this.end += this.array[this.end] === null ? 0 : 1;
        this.array[this.end] = value;
    }

    dequeue(): T | null {
        const removed = this.array[this.front];
        this.array[this.front] = null;
        if(this.front + 1 > this.array.length - 1) {
            this.front = 0;
            return removed;
        }
        this.front += 1;
        return removed;
    }

    peek(): T | null {
        return this.array[this.front];
    }

    indexOf(value: T) {
        let i = this.front;
        let index = 0;
        while(i !== this.end) {
            if(this.array[i] === value) {
                return index;
            }
            if(i === this.array.length - 1) {
                i = 0;
            } else {
                i++;
            }
            index++;
        }
        return -1;
    }

    size(): number {
        if(this.front > this.end) {
            const frontToLength = this.array.length - 1 - this.front;
            return frontToLength + this.end;
        } else if (this.front < this.end) {
            return this.end + 1 - this.front;
        } else {
            return 0;
        }
    }

    toString(): string {
        let builder = "[";
        let i = this.front;
        while(i !== this.end) {
            builder += ` ${this.array[i]}`;
            if(i === this.array.length - 1) {
                i = 0;
            } else {
                i++;
            }
        }
        builder += ` ${this.array[this.end]}`;
        builder += " ]";
        return builder;
    }
}
//#endregion

//#region Binary search tree
class TreeNode<T> {
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;
    value: T;
    constructor(left: TreeNode<T> | null, right: TreeNode<T> | null, value: T) {
        this.left = left;
        this.right = right;
        this.value = value;
    }
}

// No duplicates allowed -- if the same value is found, nothing happens
class BinarySearchTree<T> {
    _comparator: (value1: T, value2: T) => -1 | 0 | 1;

    size: number = 0;
    root: TreeNode<T> | null = null;

    constructor(comparator: (value1: T, value2: T) => -1 | 0 | 1) {
        this._comparator = comparator;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    count(): number {
        return this.size;
    }

    add(elem: T): void {
        if(!this.contains(elem)) {
            this.root = this._add(this.root, elem);
            this.size++;
            return;
        }

    }

    _add(node: TreeNode<T> | null, elem: T): TreeNode<T> {
        if(node === null) {
            node = new TreeNode<T>(null, null, elem);
        } else {
            if(this._comparator(elem, node.value) < 0) {
                node.left = this._add(node.left, elem);
            } else {
                node.right = this._add(node.right, elem);
            }
        }
        return node;
    }

    remove(elem: T): T | null {
        if(this.contains(elem)) {
            const removed = this._remove(this.root, elem);
            this.size--;
            return removed.value;
        } else {
            return null;
        }
    }

    _remove(node: TreeNode<T> | null, elem: T): TreeNode<T> {
        if(node === null) return null;
        const comp = this._comparator(elem, node.value);
        if(comp < 0) {
            return this._remove(node.left, elem);
        } else if (comp > 0) {
            return this._remove(node.right, elem);
        } else {
            if(node.left === null) {
                const rightChild = node.right;
                node.value = null;
                node = null;
                return rightChild;
            } else if (node.right === null) {
                const leftChild = node.left;
                node.value = null;
                node = null;
                return leftChild;
            } else {
                // Smallest in right
                const rightChild = this._digLeft(node.right);
                node.value = rightChild.value;
                node.right = this._remove(node.right, rightChild.value);
            }
        }
    }

    _digLeft(node: TreeNode<T>): TreeNode<T> {
        let tempNode = node;
        while(tempNode.left !== null) {
            tempNode = tempNode.left;
        }
        return tempNode;
    }

    contains(elem: T): boolean {
        return this._contains(this.root, elem);
    }

    _contains(node: TreeNode<T>, elem: T): boolean {
        if(node === null) return false;
        const comp = this._comparator(elem, node.value);
        if(comp < 0) {
            return this._contains(node.left, elem);
        } else if (comp > 0) {
            return this._contains(node.right, elem);
        } else {
            return true;
        }
    }

    height(): number {
        return this._height(this.root);
    }

    _height(node: TreeNode<T>): number {
        if(node === null) return 0;
        return Math.max(this._height(node.left), this._height(node.right)) + 1;
    }

    traverse(order: "preOrder" | "inOrder" | "postOrder" | "levelOrder"): void {
        switch(order) {
            case "preOrder":
                console.log("Pre-order traversal: ");
                return this._preOrder(this.root);
            case "postOrder":
                console.log("Post-order traversal: ");
                return this._postOrder(this.root);
            case "levelOrder":
                console.log("Level-order traversal: ");
                return this._levelOrder(this.root);
            case "inOrder":
            default:
                console.log("In-order traversal: ");
                return this._inOrder(this.root);
        }
    }

    _preOrder(node: TreeNode<T>): void {
        if(node === null) return;
        console.log(` ${node.value} `);
        this._preOrder(node.left);
        this._preOrder(node.right);
    }

    _inOrder(node: TreeNode<T>): void {
        if(node === null) return;
        this._inOrder(node.left);
        console.log(` ${node.value} `);
        this._inOrder(node.right);
    }

    _postOrder(node: TreeNode<T>): void {
        if(node === null) return;
        this._postOrder(node.left);
        this._postOrder(node.right);
        console.log(` ${node.value} `);
    }
    
    _levelOrder(node: TreeNode<T>): void {
        if(node === null) return;
        let queue = new Queue<TreeNode<T>>(this.size);
        queue.enqueue(this.root);
        this._levelOrderRecurse(this.root, queue);
    }

    _levelOrderRecurse(node: TreeNode<T>, queue: Queue<TreeNode<T>>) {
        if(node === null) return;
        while(queue.size() > 0) {
            console.log(` ${queue.dequeue()} `);
            queue.enqueue(node.left);
            queue.enqueue(node.right);
        }
    }

}
//#endregion

//#region Test
function comparator(value1: number, value2: number): -1 | 0 | 1 {
    const diff = value1 - value2;
    if(diff < 0) {
        return -1;
    } else if (diff > 0) {
        return 1;
    } else {
        return 0;
    }
}

function main() {
    let bst = new BinarySearchTree<number>(comparator);
    bst.add(8);
    bst.add(4);
    bst.add(18);
    bst.add(1);
    bst.add(11);
    bst.add(17);
    bst.add(7);
    bst.count();
    bst.traverse("inOrder");
    bst.traverse("preOrder");
    bst.traverse("levelOrder");
}

main();
//#endregion
})();