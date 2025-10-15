// Ejercicio 5: División de cuenta entre amigos

console.log("--------Ejercicio 5: División de cuenta entre amigos--------");

// Declaro las variables

let totalGasto = 1225.5;
let numeroAmigos = 5;
let pagoIVA = (totalGasto * 0.21).toFixed(2); // Calculo el IVA (21%) y limito a dos decimales
let totalConIVA = (totalGasto + pagoIVA*1).toFixed(2); // Calculo el total con IVA y limito a dos decimales
let pagoPorAmigo = (totalConIVA / numeroAmigos).toFixed(2); // Calculo lo que paga cada amigo y limito a dos decimales

//Imprimir en consola

console.log(`Total sin IVA: ${totalGasto}€`)
console.log(`Número de personas: ${numeroAmigos}`)
console.log(`IVA 21%: ${pagoIVA}€`)
console.log(`Total con IVA: ${totalConIVA}€`)
console.log(`Pago por persona: ${pagoPorAmigo}€`)