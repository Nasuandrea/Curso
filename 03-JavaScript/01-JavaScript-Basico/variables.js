// 3  Formas de crer variables:

let nombreVariable = "Valor de la variable"; //let Puede cambiar su valor
const nombreConstante = "Valor de la constante"; //const No puede cambiar su valor
var nombreVariableVieja = "Valor de la variable vieja"; //var Forma antigua, no se recomienda su uso

let nombrePersona = "Juan"; // String (Cadena de texto)  - usa comillas dobles o simples
let edadPersona = 30; // Number - números enteros o decimales, no usa comillas

nombrePersona = "Pedro"; // Cambia el valor de la variable nombre de Juan a Pedro.

let nombreUsuario; // Undefined - variable declarada pero sin valor asignado
nombreUsuario = "Maria"; // Ahora se le asigna un valor a la variable nombreUsuario

//Buenas prácticas para nombrar variables y constantes:
// 1. Usar camelCase para nombrar variables y constantes (ejemplo: nombreUsuario, edadPersona)
// 2. Usar nombres descriptivos que indiquen el propósito de la variable o constante
// 3. No usar espacios ni caracteres especiales (solo letras, números y guiones bajos)
// 4. No comenzar con números
// 5. Evitar usar palabras reservadas del lenguaje (como let, const, var, if, else, etc.)

// let 1nombreUsuario; // Incorrecto: no puede comenzar con un número

console.log(nombreVariable); // Muestra el valor de la variable llamada nombreVariable en la consola
console.log(nombreConstante); // Muestra el valor de la constante llamada nombreConstante en la consola 
console.log(nombreUsuario); // Muestra el valor de la variable llamada nombreUsuario en la consola
console.log("Para mostrar en consola usando node: escribir en terminal 'node variables.js'"); // Muestra un mensaje en la consola


// Constantes
// Una constante es un tipo de variable cuyo valor no puede cambiar una vez asignado.
// Se declara usando la palabra clave 'const' en lugar de 'let' o 'var'.

const edadUsuario = 25; // Declaración de una constante llamada edadUsuario con valor 25
console.log(edadUsuario); // Muestra el valor de la constante edadUsuario en la consola
//edadUsuario = 30; // Esto generaría un error porque no se puede cambiar el valor de una constante

/* Datos personales */

let nombre = "Andrea";
let apellido = "Collazo";
const anhoNacimiento = 1988;
let ciudadActual = "Vigo";

// Mostrar en consola los datos personales
console.log("Nombre:", nombre);
console.log("Apellido:", apellido);
console.log("Año de Nacimiento:", anhoNacimiento);
console.log("Ciudad Actual:", ciudadActual);

// Crea un programa que muestre la edad, sexo, nombre, asignatura, dni
let edad = 37;
let sexo = "Femenino";
let nombreAlumno = "Andrea";
let asignatura = "JavaScript";
let dni = "12345678A";

console.log("Edad:", edad , "Sexo:", sexo, "Nombre:", nombreAlumno, "Asignatura:", asignatura, "DNI:", dni);