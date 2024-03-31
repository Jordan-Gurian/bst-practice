const mergeSort = require('./mergeSort');
const removeDuplicates = require('./removeDuplicates');
const Node = require('./Node');

module.exports = function buildTree(array) {
    if (array.length < 1) {
        return null;
    }
    array = mergeSort(array);
    array = removeDuplicates(array);
    const start = 0;
    const end = array.length - 1;
    let mid = Math.floor((start + end) / 2);
    if (mid < 0) {
        mid = 0;
    }
    const root = new Node(array[mid]);

    const leftArray = array.slice(start, mid);
    const rightArray = array.slice(mid + 1, end + 1);

    root.left = buildTree(leftArray);
    root.right = buildTree(rightArray);
    return root;
}