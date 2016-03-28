module.exports = {
  distance: (a, b) => {
    return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2));
  },
  getRandom: (array, count) => {
    let result = new Array(count),
        len = array.length,
        taken = new Array(len);
    if (count > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (count--) {
        let x = Math.floor(Math.random() * len);
        result[count] = array[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
  },
  randomInterval: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
