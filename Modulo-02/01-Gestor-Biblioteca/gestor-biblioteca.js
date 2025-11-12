class GestorBiblioteca {}

const libros = [
  {
    titulo: "",
    autor: "",
    prestado: false,
    fechaInicioPrestamo: "",
    fechaFinPrestamo: "",
  },
];
let titulo;
let autor;
let prestado = false;
let fechaInicioPrestamo;
let fechaFinPrestamo;

function registrarLibro() {
  titulo = prompt("Título del libro: ");
  autor = prompt("Autor: ");
  libros.forEach((l) => {
    if (l.titulo === titulo && l.autor === autor) {
      alert("Ese libro ya esta registrado");
      return registrarLibro();
    } else {
      libros.push((l.titulo = titulo), (l.autor = autor));
    }
  });
}

function buscarPorTitulo() {
  titulo = prompt("Título a buscar: ");
  libros.forEach((l) => {
    let tituloBuscado = titulo.toLowerCase();
    let filtro = libros.filter((libro) =>
      libros.titulo.toLowerCase().includes(tituloBuscado)
    );
    if (filtro){
        prompt("El libro buscado es: "+ l.autor + ", "+ l.titulo)
    }
  });
}
