// =============================================
// SISTEMA DE GESTIÓN DE BIBLIOTECA - VERSIÓN FINAL
// =============================================

// CLASE PRINCIPAL: GESTOR DE BIBLIOTECA
// Responsable de orquestar todas las operaciones del sistema
class GestorBiblioteca {
    
    // RF001: REGISTRAR NUEVOS LIBROS
    // Método estático: Puede llamarse sin crear una instancia de la clase
    // async: Permite usar await para operaciones asíncronas (simuladas)
    static async registrarLibro(datosLibro) {
        console.log("📗 Intentando registrar libro:", datosLibro.titulo);
        
        // VALIDACIONES BÁSICAS - Fáciles de entender para desarrolladors
        if (!datosLibro.titulo) {
            throw new Error("❌ El título es obligatorio");
        }
        if (!datosLibro.autor) {
            throw new Error("❌ El autor es obligatorio");
        }
        
        // CREACIÓN DEL OBJETO LIBRO
        // Instanciamos la clase Libro con los datos proporcionados
        const libro = new Libro(datosLibro);
        console.log("✅ Libro creado:", libro.describir());
        
        // SIMULACIÓN DE GUARDADO EN BASE DE DATOS
        await libro.guardar();
        
        return {
            mensaje: "📚 Libro registrado exitosamente",
            libro: libro
        };
    }
    
    // RF002: BUSCAR LIBROS POR TÍTULO
    static async buscarPorTitulo(titulo) {
        console.log("🔍 Buscando libros con título:", titulo);
        
        // Validación de entrada
        if (!titulo || titulo.trim() === "") {
            throw new Error("❌ El término de búsqueda no puede estar vacío");
        }
        
        // Delegamos la búsqueda a la clase BaseDatos
        const resultados = await BaseDatos.buscarLibros(titulo);
        
        console.log(`✅ Encontrados ${resultados.length} resultados`);
        return resultados;
    }
    
    // RF003: REALIZAR PRÉSTAMO DE LIBRO
    static async prestarLibro(idLibro, idUsuario, fechaDevolucion) {
        console.log("📚 Procesando préstamo de libro...");
        
        // VALIDACIONES INICIALES
        if (!idLibro || !idUsuario || !fechaDevolucion) {
            throw new Error("❌ Faltan datos necesarios para el préstamo");
        }
        
        // BUSCAR LIBRO Y USUARIO
        // Estas operaciones serían asíncronas en un sistema real
        const libro = await Libro.buscarPorId(idLibro);
        const usuario = await Usuario.buscarPorId(idUsuario);
        
        console.log(`📖 Libro: ${libro.titulo}`);
        console.log(`👤 Usuario: ${usuario.nombre}`);
        
        // VERIFICAR DISPONIBILIDAD
        if (!libro.disponible) {
            throw new Error("❌ El libro no está disponible para préstamo");
        }
        
        // CREAR REGISTRO DE PRÉSTAMO
        const prestamo = new Prestamo({
            libro: idLibro,
            usuario: idUsuario,
            fechaDevolucion: new Date(fechaDevolucion)
        });
        
        // ACTUALIZAR ESTADO DEL LIBRO
        libro.marcarComoPrestado();
        await libro.guardar();
        
        // GUARDAR PRÉSTAMO
        await prestamo.guardar();
        
        console.log("✅ Préstamo registrado exitosamente");
        return prestamo;
    }
}

// CLASE LIBRO - Representa un libro en el sistema
class Libro {
    // CONSTRUCTOR - Se ejecuta al crear una nueva instancia
    constructor(datosLibro) {
        // PROPIEDADES DEL LIBRO:
        this.id = "libro_" + Date.now();  // ID único basado en timestamp
        this.titulo = datosLibro.titulo;  // Título del libro (obligatorio)
        this.autor = datosLibro.autor;    // Autor del libro (obligatorio)
        this.isbn = datosLibro.isbn || ""; // ISBN (opcional)
        this.disponible = true;           // Estado de disponibilidad
        this.fechaRegistro = new Date();  // Fecha de registro automática
    }
    
    // MÉTODO: DESCRIBIR LIBRO
    // Retorna una descripción legible del libro
    describir() {
        return `"${this.titulo}" por ${this.autor} ${this.disponible ? '(Disponible)' : '(Prestado)'}`;
    }
    
    // MÉTODO: MARCAR COMO PRESTADO
    // Cambia el estado de disponibilidad
    marcarComoPrestado() {
        this.disponible = false;
        console.log(`📕 Libro "${this.titulo}" marcado como prestado`);
    }
    
    // MÉTODO: MARCAR COMO DISPONIBLE
    marcarComoDisponible() {
        this.disponible = true;
        console.log(`📗 Libro "${this.titulo}" marcado como disponible`);
    }
    
    // MÉTODO SIMULADO: GUARDAR EN BASE DE DATOS
    async guardar() {
        // Simulamos una operación asíncrona con setTimeout
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`💾 Libro guardado: ${this.titulo}`);
                resolve(this);
            }, 100);
        });
    }
    
    // MÉTODO ESTÁTICO: BUSCAR POR ID (simulado)
    static async buscarPorId(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulamos un libro de ejemplo
                const libro = new Libro({
                    titulo: "Cien años de soledad",
                    autor: "Gabriel García Márquez"
                });
                libro.id = id;
                resolve(libro);
            }, 100);
        });
    }
}

// CLASE USUARIO - Representa un usuario del sistema
class Usuario {
    constructor(datosUsuario) {
        this.id = "usuario_" + Date.now();
        this.nombre = datosUsuario.nombre;
        this.email = datosUsuario.email;
        this.telefono = datosUsuario.telefono || "";
    }
    
    describir() {
        return `${this.nombre} (${this.email})`;
    }
    
    // MÉTODO ESTÁTICO SIMULADO: BUSCAR USUARIO POR ID
    static async buscarPorId(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const usuario = new Usuario({
                    nombre: "Ana García",
                    email: "ana@ejemplo.com"
                });
                usuario.id = id;
                resolve(usuario);
            }, 100);
        });
    }
}

// CLASE PRÉSTAMO - Representa un préstamo de libro
class Prestamo {
    constructor(datosPrestamo) {
        this.id = "prestamo_" + Date.now();
        this.libro = datosPrestamo.libro;           // ID del libro prestado
        this.usuario = datosPrestamo.usuario;       // ID del usuario
        this.fechaPrestamo = new Date();            // Fecha automática del préstamo
        this.fechaDevolucion = datosPrestamo.fechaDevolucion; // Fecha esperada de devolución
        this.estado = "activo";                     // Estado del préstamo
    }
    
    describir() {
        return `Préstamo #${this.id}: Libro ${this.libro} para usuario ${this.usuario} (Devolución: ${this.fechaDevolucion.toLocaleDateString()})`;
    }
    
    // MÉTODO SIMULADO: GUARDAR PRÉSTAMO
    async guardar() {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`💾 Préstamo guardado: ${this.id}`);
                resolve(this);
            }, 100);
        });
    }
}

// CLASE BASE DE DATOS - Simula operaciones de base de datos
class BaseDatos {
    // MÉTODO ESTÁTICO: BUSCAR LIBROS (simulado)
    static async buscarLibros(terminoBusqueda) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulamos resultados de búsqueda
                const resultados = [
                    new Libro({
                        titulo: "Cien años de soledad",
                        autor: "Gabriel García Márquez",
                        isbn: "978-8437604947"
                    }),
                    new Libro({
                        titulo: "El amor en los tiempos del cólera", 
                        autor: "Gabriel García Márquez",
                        isbn: "978-0307389732"
                    }),
                    new Libro({
                        titulo: "Crónica de una muerte anunciada",
                        autor: "Gabriel García Márquez",
                        isbn: "978-8437604948"
                    })
                ].filter(libro => 
                    libro.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase())
                );
                
                resolve(resultados);
            }, 200);
        });
    }
}

// =============================================
// FUNCIONES DE PRUEBA Y DEMOSTRACIÓN
// =============================================

// FUNCIÓN DE PRUEBA COMPLETA
// Demuestra todas las funcionalidades del sistema
async function demostrarSistemaCompleto() {
    console.log("🚀 INICIANDO DEMOSTRACIÓN DEL SISTEMA DE BIBLIOTECA\n");
    
    try {
        // PRUEBA 1: REGISTRAR NUEVO LIBRO
        console.log("1. 📗 REGISTRANDO NUEVO LIBRO");
        const libroRegistrado = await GestorBiblioteca.registrarLibro({
            titulo: "El principito",
            autor: "Antoine de Saint-Exupéry",
            isbn: "978-0156012195"
        });
        console.log("✅ Resultado:", libroRegistrado.mensaje);
        console.log("📖 Libro:", libroRegistrado.libro.describir(), "\n");
        
        // PRUEBA 2: BUSCAR LIBROS
        console.log("2. 🔍 BUSCANDO LIBROS POR TÍTULO");
        const resultadosBusqueda = await GestorBiblioteca.buscarPorTitulo("amor");
        console.log("✅ Resultados de búsqueda:");
        resultadosBusqueda.forEach((libro, index) => {
            console.log(`   ${index + 1}. ${libro.describir()}`);
        });
        console.log();
        
        // PRUEBA 3: REALIZAR PRÉSTAMO
        console.log("3. 📚 REALIZANDO PRÉSTAMO DE LIBRO");
        const fechaDevolucion = new Date();
        fechaDevolucion.setDate(fechaDevolucion.getDate() + 14); // 2 semanas después
        
        const prestamo = await GestorBiblioteca.prestarLibro(
            "libro_123",
            "usuario_456", 
            fechaDevolucion
        );
        console.log("✅ Préstamo realizado:", prestamo.describir(), "\n");
        
    } catch (error) {
        // MANEJO DE ERRORES - Importante para desarrolladors
        console.error("❌ Error durante la demostración:", error.message);
    }
    
    console.log("🎯 DEMOSTRACIÓN COMPLETADA");
}

// FUNCIÓN DE PRUEBA SIMPLE (para desarrolladors)
async function pruebaParadesarrolladors() {
    console.log("🎓 PRUEBA SIMPLE PARA desarrollador \n");
    
    // Ejemplo básico que cualquier desarrollador puede entender
    const libroSimple = new Libro({
        titulo: "Mi primer libro",
        autor: "Yo Mismo"
    });
    
    console.log("📖 Libro creado:", libroSimple.describir());
    console.log("🆔 ID:", libroSimple.id);
    console.log("📅 Fecha registro:", libroSimple.fechaRegistro.toLocaleDateString());
}

// =============================================
// EJECUCIÓN DEL PROGRAMA
// =============================================

// Ejecutar demostración completa
demostrarSistemaCompleto();

// Pequeña pausa antes de la prueba simple
setTimeout(() => {
    console.log("\n" + "=".repeat(50) + "\n");
    pruebaParadesarrolladors();
}, 2000);