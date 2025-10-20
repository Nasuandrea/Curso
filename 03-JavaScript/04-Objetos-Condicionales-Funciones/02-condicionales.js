// if , else if, else

let edad = 18;

// Condicion: ser menor de edad -> si se cumple, no puede comprar alcohol;
if (edad < 18) {
  console.log("Eres menor de edad, no puedes comprar alcohol");
} else if (edad === 18) {
  console.log("Justo llegaste a tu mayoría de edad");
} else {
  console.log("Eres mayor de edad, bebe!!!");
}

// Switch
let dia = "lunes";

switch (dia) {
  case "lunes": {
    console.log("Inicio de semana!");
    break;
  }
  case "viernes": {
    console.log("Inicio del fin de semana!");
    break;
  }
  case "domingo": {
    console.log("Fin de semana!");
    break;
  }
}

//Operador ternario
let temperatura = 20;
let estado = temperatura > 30 ? "caluroso" : "agradable";
console.log(estado);

//Ejercicio combinado
let usuario = {
  nombre: "Carlos",
  edad: 16,
  tienePermiso: false,
};

//Si el usuario es mayor de edad o tiene permiso: acceso permitido

if(usuario.edad >= 18 || usuario.tienePermiso){
    console.log("Acceso permitido");
}else{
    console.log("Acceso denegado - Necesita ser mayor de edad o tener permiso");
}
