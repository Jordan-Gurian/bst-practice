const Tree = require('./Tree');
const prettyPrint = require('./prettyPrint');
const randomArray = require('./randomArray');

const array = randomArray(13, 0, 100);
const newTree = new Tree(array);
if (newTree.isBalanced()) {
    prettyPrint(newTree.root);
    console.log('way to go!');
} else {
    newTree.rebalance();
    console.log('ya messed up building the tree');
}

console.log(newTree.levelOrder());
console.log(newTree.preOrder());
console.log(newTree.postOrder());
console.log(newTree.inOrder());

let addArr = randomArray(7, 100, 200)
addArr.map((item) => newTree.insert(item))

if (newTree.isBalanced()) {
    console.log('wrong! it should be unbalanced now!');
} else {
    newTree.rebalance();
    if (newTree.isBalanced()) {
        prettyPrint(newTree.root);
        console.log('good job king, nailed it');   
    } else {
        console.log('close but not quite bud')
    }
}

console.log(newTree.levelOrder());
console.log(newTree.preOrder());
console.log(newTree.postOrder());
console.log(newTree.inOrder());