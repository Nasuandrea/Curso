/* Lista de tareas con arrays
1. Agregar tarea a la lista
2. Eliminar tarea de la lista (primera o última)
3. Mostrar todas las tareas
*/

// Sintaxis de un array

//01. Forma de crearlo: 
//Creamos una variable1. Entre [] metemos los elementos separados por comas, puede ser de strings, numeros, mixto...

let frutas = ["manzana", "pera","sandía"];
let numeros = new Array(1,2,3,4);
let mixto= [1,"texto",true,null];

// 02. Acceso. El orden del array empieza en 0

console.log(frutas[0]); // mostraría el que está en la primera posición porque empieza a contar en 0
console.log(mixto[3]); // mostraría el que está en la 4ª posicion 

// 03. Modificaciones 

let colores = ["rojo", "verde","amarillo" , "azul", "naranja"];

// Accedemos por índice

console.log(colores[3]);
console.log(colores[1]);

// Modificar elementos : para modificar un array hay q decirle que localice el valor a modificar (su índice) y poner el nuevo valor:

colores[3] = "gris"; // nombre de la variable[índice del elemento a modificar] = nuevo valor;

console.log(colores[3]);

// Longitud del array -> cuantos elementos tiene el array

console.log(colores.length);

// Añadir elementos a un array existente

colores.push("mango"); // .push(nuevoElemento) añade al final
colores[5] = "violeta"; //sustituimos mango por violeta
console.log(colores);

colores.unshift("magenta") // .unshift(nuevoElemento) añade al principio
console.log(colores);

// Eliminar elementos: Para no perder el valor eliminado creamos una nueva variable(array) sin el elemento del array:

let ultimo = [].concat(colores); // Crea una copia del array colores en la variable ultimo
ultimo.pop(); //.pop() Elimina el ultimo elemento del array ultimo
console.log("lista sin el ultimo color: " + ultimo);
console.log("Lista completa: "+colores);

// Eliminar el primero

let primero = colores.shift();
console.log("He eliminado el color: " + primero);
console.log(colores);



//Atajo teclado fn + ' (cuando tenga seleccionada un texto lo) comenta con comilla simple

// Métodos de Arrays
colores.sort(); //Ordena
console.log(colores)
colores.map(col => "color "+ col);
console.log(colores);
/**
function ordenar(a,b){a-b};
(a,b)=>a-b; */

let listaColores = colores.join();
console.log(listaColores);
console.log(typeof(listaColores));