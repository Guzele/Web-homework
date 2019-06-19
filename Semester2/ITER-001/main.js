//Made by Guzel Garifullina

function* generate(max) {
    var step = 0;

    while (step < max) {
        ++step;
        yield (Number(Math.random().toFixed(2)) * 2).toFixed(2);
    }
}

class Iterator {
    constructor(max) { this.max = max }
    [Symbol.iterator]() { return generate(this.max) }
}



const it = new Iterator  (3);
console.log([... it]);