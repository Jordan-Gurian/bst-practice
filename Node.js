module.exports = class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    numChildren() {
        if (this.left === null && this.right === null) {
            return 0;
        }
        else if (this.left != null && this.right != null) {
            return 2;
        }
        return 1;
    }
}