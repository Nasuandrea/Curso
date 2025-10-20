//Creación del objeto persona

let persona = {
  nombre: "Maria",
  edad: 30,
  profesion: "Desarrolladora",
  //método
  saludar: function () {
    return `Hola yo soy ${this.nombre} y tengo ${this.edad} años`;
  },
};
console.log(persona.edad);
console.log(persona.saludar());


// Creación del objeto coche : toyota, corolla, 2022, está encendido

let coche = {
    marca : "Toyota",
    modelo : "Corolla",
    anhoMatricula : 2022,
    encender: function(){
        return "El coche está encendido"
    }
}
console.log("El " + coche.marca + " " + coche.modelo + " es del año: " + coche.anhoMatricula);
console.log(coche.encender());