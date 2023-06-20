function add(a, b) {
    let resul=a+b;
    return resul;
}

function subtract(a, b) {
    let resul=a-b;
    return resul;
}

function multiply(a, b) {
    let resul=a*b;
    return resul;
}

function divide(a, b) {
    if (b===0){
        return "No se puede dividir por 0"
    } 
    let resul=(a/b);
    return resul;
    
}

function pow(a) { // Resuelvo bug de funcion pow
    let resul=a**2;
    return resul;
}

export default {
    add: add,
    sub: subtract,
    mul: multiply,
    div: divide,
    pow: pow
}
