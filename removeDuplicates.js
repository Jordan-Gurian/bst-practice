module.exports = function removeDuplicates(array) {
    let prev;
    let cur;
    let tempArr = array;
    for (let i = 0; i < array.length; i++) {
        cur = array[i];
        if (prev === cur) {
            tempArr.splice(i, 1);
        } 
        prev = cur;
    }
    return tempArr;
}