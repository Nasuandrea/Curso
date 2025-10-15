//Ejercicio 2: Conversión de temperatura (Celsius a Fahrenheit)

console.log("--------Ejercicio 2: Conversión de temperatura (Celsius a Fahrenheit)--------");

//Declaro la variable
let celsius;
let fahrenheit;

//PRIMERA FORMA DE HACERLO: SIN FUNCIONES
celsius = 25; //25 grados Celsius
fahrenheit = (celsius * 9/5) + 32;   
console.log(`${celsius}°C son ${fahrenheit.toFixed(2)}°F`);
fahrenheit = 77; //77 grados Fahrenheit
celsius = (fahrenheit - 32) * 5/9;   
console.log(`${fahrenheit}°F son ${celsius.toFixed(2)}°C`);


//OTRA FORMA DE HACERLO: CON FUNCIONES
//Creo las funciones
let conversionAFahrenheit = (celsius) => {
fahrenheit = (celsius * 9/5) + 32;   
console.log(`${celsius}°C son ${fahrenheit.toFixed(2)}°F`); 
}

let conversionACelsius = (fahrenheit) => {
celsius = (fahrenheit - 32) * 5/9;   
console.log(`${fahrenheit}°F son ${celsius.toFixed(2)}°C`); 
}

//Llamo a las funciones
conversionAFahrenheit(25); //25 grados Celsius a Fahrenheit
conversionACelsius(77); //77 grados Fahrenheit a Celsius