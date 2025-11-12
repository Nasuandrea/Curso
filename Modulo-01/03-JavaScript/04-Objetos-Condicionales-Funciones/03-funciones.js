// Funciones: Realizar tareas, reutilizar, organizar y estructurar código.

//Declaración de funciones
function sumar(a,b){
    return a+b;
}

let resultado = sumar(10,20);
console.log(resultado);

//Expresión
const multiplicar = function (a,b){
    return a*b;
}
let producto = multiplicar(4,5);

//Funciones flecha
const dividir = (a,b) => a/b;
let resto= dividir(10,2);