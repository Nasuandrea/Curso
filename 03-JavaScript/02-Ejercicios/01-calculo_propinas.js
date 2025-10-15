//Calculadora propinas de un restaurante

console.log("--------Ejercicio 1: Calculadora propinas de un restaurante--------");

//Declaro las variables
let totalCuenta = 85.50;
let porcentajePropina = 15;

//Calculo la propina - Operaciones 
let propina = ((totalCuenta * porcentajePropina) / 100).toFixed(2); // toFixed(2) para limitar a dos decimales
let totalPagar = (totalCuenta + propina *1).toFixed(2); // toFixed(2) para limitar a dos decimales

//Muestro los resultados por consola
console.log(`Cuenta: ${totalCuenta}€`);
console.log(`Propina del ${porcentajePropina}%: ${propina}€`); 
console.log(`Total a pagar: ${totalPagar}€`);