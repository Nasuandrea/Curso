// Tipos de datos en JavaScript
// 1. String (Cadena de texto), siempre entre comillas dobles o simples
let ejemploString = "Esto es una cadena de texto";
let saludo = 'Hola';

// 2. Number (Números), enteros o decimales, sin comillas
let ejemploNumber = 42; // Número entero puede ser positivo o negativo
let ejemploDecimal = 3.14; // Número decimal
// ejemplo:
let temperatura = -5; 

// 3. Boolean (Booleano), solo puede ser true (verdadero) o false (falso)
let ejemploBooleanTrue = true;
let ejemploBooleanFalse = false;
let esMayorDeEdad = true;
let tienePermiso = false;

// 4. Undefined (Indefinido), variable declarada pero sin valor asignado
let ejemploUndefined; // No tiene valor asignado
console.log(ejemploUndefined); // Muestra 'undefined' en la consola

// 5. Null (Nulo), representa la ausencia intencional de cualquier valor
let valorVacio = null; // valor intencionalmente vacío, no confundir con undefined

// Para saber tipo de dato usamos typeof
console.log(typeof ejemploString); // Muestra 'string'
console.log(typeof ejemploNumber); // Muestra 'number'
console.log(typeof ejemploDecimal); // Muestra 'number'
console.log(typeof esMayorDeEdad); // Muestra 'boolean'
console.log(typeof tienePermiso); // Muestra 'boolean'
console.log(typeof ejemploUndefined); // Muestra 'undefined'
console.log(typeof valorVacio); // Muestra 'object' (esto es un comportamiento histórico de JavaScript)