function numToStars(numStars) {
    const arr = [];
    for (let i = 0; i < 5; i++) {
        if (i < numStars) {
            arr.push('★');
        } else {
            arr.push('☆');
        }
    }
    return arr.join('');
}

module.exports = {
    numToStars,
};