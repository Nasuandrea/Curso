// GestorBiblioteca
// Libros, usuarios, prestamo
// Base de datos

class GestorBiblioteca {
  //Registrar libro
  static async registrarLibro(datosLibro) {
    console.log("Registrando libro: ", datosLibro.titulo);
    console.log("Datos del libro: ", datosLibro);
    return {
      mensaje: "Libro registrado(simulación)",
      datos: datosLibro,
    };
  }
  // Buscar libros por titulo
  static async buscarPorTitulo(titulo) {
    console.log("Buscando libros con título: " + titulo);
    //Simulamos resultados de búsqueda
    return [
      { titulo: "Cien años de soledad", autor: "Gabriel García Márquez" },
      {
        titulo: "El amor en tiempos del cólera",
        autor: "Gabriel García Márquez",
      },
    ];
  }
}
