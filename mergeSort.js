module.exports = function mergeSort(arr) {
    const arrLength = arr.length;
    if (arrLength > 1) {
        const mid = arrLength / 2;
        const left = mergeSort(arr.slice(0, mid))
        const right = mergeSort(arr.slice(mid, arrLength));
        return merge(left, right);
    }
    return arr
}

function merge(left, right) {
    let leftInd = 0;
    let rightInd = 0;
    
    while (leftInd < left.length && rightInd < right.length) {
        if (right[rightInd] <= left[leftInd]) {
            left.splice(leftInd, 0, right[rightInd]);
            rightInd += 1;
        } else {
            leftInd += 1;
        }
    }
    for (let i = rightInd; i < right.length; i++) {
        left.splice(left.length, 0, right[i]);
    }
    return left
}