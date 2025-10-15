//Ejercicio 3: Calculadora de descuentos

console.log("--------Ejercicio 3: Calculadora de descuentos--------");

// Descuento del 30 por ciento, tiene que aparecer el precio original, el descuento y el precio final con el descuento aplicado.

// Declaro las variables
let precioOriginal = 120; // Precio original del producto
let porcentajeDescuento = 30; // Porcentaje de descuento
let descuento;
let precioFinal;

// Operaciones 
descuento = (precioOriginal * porcentajeDescuento / 100).toFixed(2); // Calculo el descuento y limito a dos decimales
precioFinal = (precioOriginal - descuento * 1).toFixed(2); // Calculo el precio final y limito a dos decimales

//Salida por pantalla
console.log(`Precio original: ${precioOriginal}€`);
console.log(`Descuento del: ${porcentajeDescuento}% = ${descuento}€`);
console.log(`Precio final con descuento: ${precioFinal}`);