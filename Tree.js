const Node = require('./Node');
const buildTree = require('./buildTree');

module.exports = class Tree {
    constructor(array) {
        this.array = array;
        this.root = buildTree(array);
    }

    insert(value) {
        let currentNode = this.root;
        let prevNode = this.root;
        let right = false;
        while (currentNode != null) {
            prevNode = currentNode;
            if (currentNode.value < value) {
                currentNode = currentNode.right;
                right = true;
            } else {
                currentNode = currentNode.left;
                right = false;
            }
        }
        if (right) {
            prevNode.right = new Node(value);
        } else {
            prevNode.left = new Node(value);
        }
    }

    deleteItem(value) {
        let currentNode = this.root;
        let prevNode = this.root;
        let right = false;
        while (currentNode.value != value) {
            prevNode = currentNode;
            if (currentNode.value < value) {
                currentNode = currentNode.right;
                right = true;
            } else {
                currentNode = currentNode.left;
                right = false;
            }
        }
        if (currentNode.numChildren() === 0) {
            if (right) {
                prevNode.right = null;
            } else {
                prevNode.left = null;
            }
            return
        }
        else if (currentNode.numChildren() === 1) {
            if (currentNode.left === null) {
                if (right) {
                    prevNode.right = currentNode.right;
                } else {
                    prevNode.left = currentNode.right;
                }
            } else {
                if (right) {
                    prevNode.right = currentNode.left;
                } else {
                    prevNode.left = currentNode.left;
                }
            }
            return
        } else {
            const leftVal = this.leftMostValue(currentNode.right);
            this.deleteItem(leftVal);
            currentNode.value = leftVal;
        }
    }

    leftMostValue(node) {
        let currentNode = node;
        while (currentNode.left != null) {
            currentNode = currentNode.left;
        }
        return currentNode.value;
    }

    find(value) {
        let currentNode = this.root;
        while (currentNode != null ) {
            if (currentNode.value === value) {
                return currentNode;
            }
            if (currentNode.value < value) {
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.left;
            }
        }
        return null
    }

    levelOrder(callback = undefined) {
        let currentNode = this.root;
        let queueArr = [currentNode];
        let index = 0;

        while (index < queueArr.length) {
            if (queueArr[index].left != null) {
                queueArr.push(queueArr[index].left);
            }
            if (queueArr[index].right != null) {
                queueArr.push(queueArr[index].right);
            }
            if (callback) {
                callback(queueArr[index]);
            }
            index += 1;
        }
        return queueArr.map((node) => node.value);
    }

    preOrder(callback = undefined) {
        let stackArr = [this.root];
        let outputArr = [this.root];
        let left = [0];
        let right = [0];
        let currentNode;
        
        while (stackArr.length > 0) {
            currentNode = stackArr.slice(-1)[0];
            if (callback && !left[left.length - 1] && !right[right.length - 1] ) {
                callback(currentNode); 
            }
            if (currentNode.left != null && left[left.length - 1] === 0) {
                stackArr.push(currentNode.left);
                outputArr.push(currentNode.left);
                left[left.length - 1] += 1;
                left.push(0);
                right.push(0);
            }
            else if (currentNode.right != null && 
                right[right.length - 1] === 0) {
                stackArr.push(currentNode.right);
                outputArr.push(currentNode.right);
                right[right.length - 1] += 1;
                left.push(0);
                right.push(0);
            } else {
                stackArr.pop();
                left.pop();
                right.pop();
            }
        }
        return outputArr.map((node) => node.value);
    }

    inOrder(node = this.root, callback = undefined, arr=[]) {
        if (node === null) {
            return 
        }
        this.inOrder(node.left, callback, arr);
        if (callback) {
            callback(node);
        }
        arr.push(node.value);
        this.inOrder(node.right, callback, arr)
        return arr;
    }

    postOrder(node = this.root, callback = undefined, arr=[]) {
        if (node === null) {
            return 
        }
        this.postOrder(node.right, callback, arr)
        this.postOrder(node.left, callback, arr);
        if (callback) {
            callback(node);
        }
        arr.push(node.value);
        return arr;
    }

    height(node) {
        let sumL;
        let sumR;
        if (node === null) {
            return -1
        }

        sumL = this.height(node.left) + 1;
        sumR = this.height(node.right) + 1;    
        return Math.max(sumL, sumR);
    }

    depth(node) {
        let currentNode = this.root;
        let steps = 0;
        while (currentNode != null ) {
            if (currentNode.value === node.value) {
                return steps;
            }
            if (currentNode.value < value) {
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.left;
            }
            steps += 1;
        }
        return null
    }

    isBalanced(node=this.root) {
        let heightR;
        let heightL;

        if (node === null) {
            return true
        }

        heightR = this.height(node.right);
        heightL = this.height(node.left);

        return Math.abs(heightR - heightL) <= 1 && 
        this.isBalanced(node.right) && 
        this.isBalanced(node.left);
    }

    rebalance() {
        if (!this.isBalanced()) {
            this.array = this.inOrder();
            this.root = buildTree(this.array);
        }
    }

}