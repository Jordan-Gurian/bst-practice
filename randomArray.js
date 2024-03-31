module.exports = function randomArray(size, min, max) {
    let array = [];

    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * (max - min)) + min);
    }

    return array
} 