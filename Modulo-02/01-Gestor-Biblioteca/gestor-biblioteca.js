class GestorBiblioteca {}

const libros = [
  {
    titulo: "El señor de los anillos",
    autor: "Tolkien",
    prestado: false,
    fechaInicioPrestamo: "",
    fechaFinPrestamo: "",
  },
    {
    titulo: "Las dos torres",
    autor: "Tolkien",
    prestado: false,
    fechaInicioPrestamo: "",
    fechaFinPrestamo: "",
  }
];
let titulo;
let autor;
let prestado = false;
let fechaInicioPrestamo;
let fechaFinPrestamo;
let div = document.getElementById("info");

function registrarLibro() {
  titulo = prompt("Título del libro: ");
  autor = prompt("Autor: ");
  libros.forEach((l) => {
    if (l.titulo === titulo && l.autor === autor) {
      alert("Ese libro ya esta registrado");
      return registrarLibro();
    } else {
      libros.push((l.titulo = titulo), (l.autor = autor), l.prestado=false, l.fechaFinPrestamo="", l.fechaInicioPrestamo="");
    }
  });
}

function buscarPorTitulo() {
  titulo = prompt("Título a buscar: ");
    let tituloBuscado = titulo.toLowerCase();
    let filtro = libros.filter((libro) =>
      libro.titulo.toLowerCase().includes(tituloBuscado)
    );
    if (tituloBuscado){
      filtro.forEach((f)=> div.innerHTML =`
        El libro buscado es:<br> Autor: ${f.autor}<br> Título: ${f.titulo};`);
    }else{
      div.innerHTML="EL libro buscado no existe";
    }
}

function prestarLibro(){
  
}