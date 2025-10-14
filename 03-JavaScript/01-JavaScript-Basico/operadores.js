// Podemos ejecutar Operacopnes matemáticas

// Básicas: suma, resta, multiplicación y división

// Definir dos variables numéricas
let a = 55;
let b = 32;

// Suma ( + )
let suma = a + b;

// Resta ( - )
let resta = a - b;

// Multiplicación ( * )
let multiplicacion = a * b;

// División ( / )
let division = a / b;

// Resto o módulo ( % ) - devuelve el resto de una división
let resto = a % b;

// Raíz cuadrada ( Math.sqrt() ) - función matemática para calcular la raíz cuadrada
let raizCuadradaA = Math.sqrt(a);
let raizCuadradaB = Math.sqrt(b);

// Incremento ( ++ ) - aumenta el valor de una variable en 1
a++; // Ahora a vale 56
b++; // Ahora b vale 33

// Decremento ( -- ) - disminuye el valor de una variable en 1
a--; // Ahora a vuelve a valer 55
b--; // Ahora b vuelve a valer 32

let contador = 5;
contador++; // Ahora contador vale 6
contador--; // Ahora contador vuelve a valer 5

console.log("Contador inicial: ",contador); // Muestra 5
// Operadores de asignación compuesta ( +=, -=, *=, /=, %= )

// Suma y asigna
contador += 3; // Equivale a contador = contador + 3, ahora contador vale 8
console.log("Contador incrementado en 3: ",contador); // Muestra 8

// Resta y asigna
contador -= 2; // Equivale a contador = contador - 2, ahora contador vale 6
console.log("Contador decrementado en 2: ",contador); // Muestra 6

// Multiplica y asigna
contador *= 4; // Equivale a contador = contador * 4, ahora contador vale 24
console.log("Contrador multiplicado por 4: ",contador); // Muestra 24

// Divide y asigna
contador /= 3; // Equivale a contador = contador / 3, ahora contador vale 8
console.log("Contador dividido entre 3: ",contador); // Muestra 8

// Resto y asigna
contador %= 5; // Equivale a contador = contador % 5, ahora contador vale 3
console.log("Contador % 5: ",contador); // Muestra 3

// Mostrar resultados en consola
console.log("Suma: ", suma);
console.log("Resta: ", resta);
console.log("Multiplicación: ", multiplicacion);
console.log("División: ", division);
console.log("Resto/Módulo: ", resto);
console.log("Raíz cuadrada de a: ", raizCuadradaA);
console.log("Contador final: ", contador);


// Comparaciones 

a==b;   // Igualdad             (==)    false porque 55 no es igual a 32
a!=b;   // Desigualdad          (!=)    true porque 55 no es igual a 32
a>b;    // Mayor que            (>)     true porque 55 es mayor que 32
a<b;    // Menor que            (<)     false porque 55 no es menor que 32
a<=b;   // Menor o igual que    (<=)    false porque 55 no es menor ni igual que 32
a>=b;   // Mayor o igual que    (>=)    true porque 55 es mayor que 32

let c = "55";

a==c; // Igualdad               (==)    true compara el valor pero no el tipo
a===c; // Igualdad estricta     (===)   false compara valor y tipo: 55 (number) no es igual a "55" (string)
a!==c; // Desigualdad estricta  (!==)   true compara valor y tipo: 55 (number) no es igual a "55" (string)
