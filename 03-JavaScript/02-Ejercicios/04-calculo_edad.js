//Ejercicio 4: Calculo de edad

console.log("--------Ejercicio 4: Calculo de edad--------");

let anhoActual;
let anhoNacimiento;
let edad;

//Calculo la edad
anhoActual = 2025;
anhoNacimiento = 1988;
edad = anhoActual - anhoNacimiento;
console.log(`Tienes ${edad} años.`);

//Con funciones
let calcularEdad = (anhoActual,anhoNacimiento)=> {
    edad = anhoActual - anhoNacimiento;
    console.log(`Tienes ${edad} años.`);
}

calcularEdad(2025,1988);


//Para obtener el año actual automáticamente
let anhoActualDate = new Date().getFullYear();
console.log(`El año actual es ${anhoActualDate}`);