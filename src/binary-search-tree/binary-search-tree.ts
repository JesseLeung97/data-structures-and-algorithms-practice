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

    isEmpty(): boolean {
        return this.size === 0;
    }

    count(): number {
        return this.size;
    }

    add(elem: T): void {
        if(this.contains(elem)) {
            this.root = this._add(this.root, elem);
            this.size++;
            return;
        }

    }

    _add(node: TreeNode<T> | null, elem: T): TreeNode<T> {
        if(node === null) {
            node = new TreeNode<T>(null, null, elem);
        } else {
            if(this._comparator(elem, node.left.value) < 0) {
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

    }

    _preOrder(): void {

    }

    _inorder(): void {

    }

    _postOrder(): void {

    }

    _levelOrder(): void {
        
    }

}
//#endregion

//#region Test
//#endregion
})();