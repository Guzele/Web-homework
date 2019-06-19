//Made by Guzel Garifullina

function rgb(r,g,b) {
    r = convertToDec (r);
    g = convertToDec (g);
    b = convertToDec (b);
    console.log (`rgb(${r}, ${g}, ${b})`)


}

function convertToDec(x) {
    if (x < 0){
        return 0;
    }
    if (x > 255)
        return 255;
    return x;

}

rgb (-2, 45, 400);