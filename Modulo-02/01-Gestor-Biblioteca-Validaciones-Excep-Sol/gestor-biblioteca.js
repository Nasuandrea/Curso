// GestorBiblioteca
// Libros, usuarios, prestamo
// Base de datos

class GestorBiblioteca {
  //Registrar libro
  //método estático: sin crear una instancia (sin crear los datos en si) de la clase
  //Async permite usar await para operaciones asincronas (simuladas)
  static async registrarLibro(datosLibro) {
    console.log("Registrando libro: ", datosLibro.titulo);

    //Validaciones básicas
    if (!datosLibro.titulo) {
      throw new Error("El título es obligatorio");
    }
    if (!datosLibro.autor) {
      throw new Error("El autor es obligatorio");
    }
    //Ahora que validamos que hay autor y titulo creamos objeto libro
    //Instanciamos la clase libro con los datos proporcionados
    const libro = new Libro(datosLibro);
    console.log("Libro creado: ", libro.describir());

    //Simulación de guardado en bbdd
    (await libro) - guardar();
    return {
      mensaje: "Libro registrado correctamente",
      libro: libro,
    };

    //Por ahora mostramos solo lo que recibimos
    console.log("Datos del libro: ", datosLibro);
    //Simulamos que funciona aunque no guarda realmente
    return {
      mensaje: "Libro registrado(simulación)",
      datos: datosLibro,
    };
  }
  // Buscar libros por titulo
  static async buscarPorTitulo(titulo) {
    console.log("Buscando libros con título: " + titulo);

    //Validar entrada
    if (!titulo || titulo.trim() === "") {
      throw new Error("El término de búsqueda no puede estar vacío");
    }

    //Delegamos la busqueda a la clase BaseDatos
    const resultados = await BaseDatos.buscarLibros(titulo);
    console.log(`Encontrados ${resultados.lenght} resultados`);
    //Simulamos resultados de búsqueda
    return;
    resultados;
    /*[
      { titulo: "Cien años de soledad", 
        autor: "Gabriel García Márquez" },
      {titulo: "El amor en tiempos del cólera",
        autor: "Gabriel García Márquez",
      },
    ];*/
  }
  //R003 Realizar prestamos del libro
  static async prestarLibro(idLibro, idUsuario, fechaDevolucion) {
    console.log("procesando préstamo del libro...");
    if (!idLibro || !idUsuario || !fechaDevolucion) {
      throw new Error("Faltan datos necesarios para el préstamo");
    }
    //Buscar libro y usuario
    //Estas operaciones serian asincronas en un sistema realç
    const libro = await Libro.buscarPorId(idLibro);
    const usuario = await Usuario.buscarPorId(idUsuario);
    console.log(`Libro: ${libro.titulo}`);
    console.log(`Usuario: ${usuario.nombre}`);

    if (!libro.disponible) {
      throw new Error("El libro no esta disponible para préstamo");
    }

    //Crear registo de prestamo
    const prestamo = new Prestamo({
      libro: idLibro,
      usuario: idUsuario,
      fechaDevolucion: new Date(fechaDevolucion),
    });

    //Actualizo el estado del libro
    libro.marcarComoPrestado();
    await libro.guardar();

    //Guardar préstamo
    await prestamo.guardar();
    console.log("préstamo registrado con exito");
    return prestamo;
  }
} //Probar si funciona
/*
async function pruebaSimple(){
    console.log("Prueba 1 - Registrar libro");
    const resultado = await GestorBiblioteca.registrarLibro({titulo:"mi primer libro", autor:"yo misma"});

    console.log("resultado: ", resultado);

    console.log("\n Prueba 2 - Buscar libro");
    const busqueda = await GestorBiblioteca.buscarPorTitulo("amor");
    console.log("Resultados búsqueda", busqueda)
}
pruebaSimple();
*/

/* Clase (class): es una plantilla o plano para crear objetos, definiendo un conjunto de propiedades y métodos que los objetos "instancias" de esa clase heredarán. Permiten organizar el codigo en un paradigma de programacion orientada a objetos(POO) y facilitan la reutiliacion del comportamiento y características compartidas.
Cada objeto creado a partir de una clase se denomina instancia y tiene su propio estado
*/
class libro {
  /*Propiedades del libro: 
  id único basado en la fecha de registro
  titulo del libro(obligatorio)
  autor (obligatorio)
  isbn (opcional)
  estado de disponibilidad
  Fecha de registro
  */
  constructor(datosLibro) {
    this.id = "libro_" + Date.now();
    this.titulo = datosLibro.titulo;
    this.autor = datosLibro.autor;
    this.isbn = datosLibro.isbn;
    this.disponible = true;
    this.fechaRegistro = new Date();
  }
  //Método: describir el libro
  //retomo una descripcion legible del libro
  describir() {
    return `"${this.titulo}" por ${this.autor} ${
      this.disponible ? "(Disponible)" : "(Prestado)"
    }`;
  }

  //Método : marcar como prestado
  //cambiar disponibilidad
  marcarComoPrestado() {
    this.disponible = false;
    console.log(`Libro "${this.titulo}" marcado como prestado`);
  }

  //Método: marcar como disponible
  marcarComoDisponible() {
    this.disponible = true;
    console.log(`Libro "${this.titulo}" marcado como disponible`);
  }

  //Método: simulación guardar en BBDD
  async guardar() {
    // Simulación operacion asincrona con tiempo en guardarse
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`libro guardado: ${this.titulo}`);
        resolve(this);
      }, 100);
    });
  }

  //Método: buscar por id del libro

  static async buscarPorId(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        //simulamos un libro de ejemplo
        const libro = new Libro({
          titulo: "Cien años de soledad",
          autor: "Gabriel García Márquez",
        });
        libro.id = id;
        resolve(libro);
      }, 100);
    });
  }
}

class Usuario {
  cosntructor(datosUsuario) {
    this.id = "usuario_" + Date.now();
    this.nombre = datosUsuario.nombre;
    this.email = datosUsuario.email;
    this.telefono = datosUsuario.telefono || "";
  }
  describir() {
    return `${this.nombre} - ${this.email}`;
  }

  //Método para buscar usuario por id
  static async buscarPorId(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        //simulamos un usuario de ejemplo
        const usuario = new Usuario({
          nombre: "Juan Gonzalez Martinez",
          email: "jgonzalezmartinez@email.com",
        });
        usuario.id = id;
        resolve(usuario);
      }, 100);
    });
  }
}

//Clase prestamo - Representa un prestamo del libro
class Prestamo {
  constructor(datosPrestamo) {
    this.id = "prestamo_" + Date.now();
    this.libro = datosPrestamo.libro;
    this.usuario = datosPrestamo.usuario;
    this.fechaPrestamo = new Date();
    this.fechaDevolucion = datosPrestamo.fechaDevolucion;
    this.estado = "activo";
  }
  describir() {
    return `Préstamo ${this.id} Libro ${this.libro} al usuario: ${this.usuario}
  (Devolucion prevista: ${this.fechaDevolucion})`;
  }
//Método simulado guardar préstamo
async guardar(){
     // Simulación operacion asincrona con tiempo en guardarse
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Libro prestado: ${this.libro} al usuario: ${this.usuario}`);
        resolve(this);
      }, 100);
    });
}
}
