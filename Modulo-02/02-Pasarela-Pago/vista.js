// Todos los formularios y botones que vemos - darle acción
//Interfaz de usuario
class VistaPasarela {
  constructor() {
    this.metodoSeleccionado = null;
    this.inicializarEventos();
  }

  inicializarEventos() {
    //navegación entre secciones
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.mostrarSeccion(e.target.dataset.section);
      });
    });

    //seleccion metodo de pago
    document.querySelectorAll(".method-option").forEach((option) => {
      option.addEventListener("click", (e) => {
        this.seleccionarMetodoPago(e.currentTarget.dataset.method);
      });
    });

    //Procesar el pago
    document.getElementById("btnProcesarPago").addEventListener("click", () => {
      this.procesarPago();
    });

    //Validación en tiempo real de inputs
    this.inicializarValidaciones();
  }

  //Mostrar secciones
  mostrarSeccion(seccionId) {
    //actualizar los botones de navegación
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    document
      .querySelector(`[data-section="${seccionId}"]`)
      .classList.add("active");

    //mostrar seccion correspondiente
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.remove("active");
    });
    document.getElementById(seccionId).classList.add("active");

    //Actualizamos contenido dinámico para que muestre cada pestaña
    if (seccionId === "historial") {
      this.actualizarHistorial();
    } else if (seccionId === "estadisticas") {
      this.actualizarEstadisticas();
    }
  }

  seleccionarMetodoPago(metodo) {
    this.metodoSeleccionado = metodo;

    //Actualizar la seleccion
    document.querySelectorAll(".method-option").forEach((option) => {
      option.classList.remove("active");
    });
    document
      .querySelector(`[data-method="${metodo}"]`).classList.add("active");
    //mostrar formulario correspondiente
    document.querySelectorAll("payment-forms").forEach((form) => {
      form.classList.add("hidden");
    });
    document.getElementById(`form-${metodo}`).classList.remove("hidden");
  }

  //Obtener datos pago
  obtenerDatosPago() {
    const monto = parseFloat(document.getElementById("montoPago").value);
    const descripcion = document.getElementById("descripcionPago").value;

    let datosMetodo;

    switch (this.metodoSeleccionado) {
      case "tarjeta":
        datosMetodo = {
          numero: document.getElementById("numeroTarjeta").value.replace(/\s/g, ""),
          nombre: document.getElementById("nombreTarjeta").value,
          fechaVencimiento: document.getElementById("fechaVencimiento").value,
          cvv: document.getElementById("cvv").value,
        };
        break;
      case "paypal":
        datosMetodo = {
          correo: document.getElementById("emailPayPal").value,
          contraseña: document.getElementById("passwordPayPal").value,
        };
        break;
      case "transferencia":
        datosMetodo = {
            numeroCuenta: document.getElementById('numeroCuenta').value,
            nombreBanco: document.getElementById('nombreBanco').value,
            titular: document.getElementById('titularCuenta').value, 
        };
        break;
    }
    
    return {
        monto, descripcion, datosMetodo
    }
}

  //Procesar pago y conexion con base
async procesarPago() {
    const btnProcesar = document.getElementById('btnProcesarPago');
    const resultadoDiv = document.getElementById('resultadoPago');

    //mostrar
    btnProcesar.disable = true;
    btnProcesar.innerHTML = 'Procesando...';
    resultadoDiv.classList.add('hidden');

    //manejar errores - validaciones concretas
    try{
        //obtener los datos del formulario
        const {monto, descripcion, datosMetodo} = this.obtenerDatosPago();

        //validaciones básicas
        if(!monto || monto <= 0){
            throw new Error ('El monto debe ser mayor a 0');
        }
        if(!descripcion){
            throw new Error('La descripción es obligatoria');
        }
        // Delegamos al controlador que revise cosas
        await controlador.procesarPago(monto, this.metodoSeleccionado, datosMetodo, descripcion);

    }catch(error){
        this.mostrarError(error.message)
    }
    //Restaurar el boton
    finally{
        btnProcesar.disable=false;
        btnProcesar.innerHTML = 'Procesar Pago'
    }
}

    mostrarResultadoPago(resultado){
        const resultadoDiv = document.getElementById('resultadoPAgo');
        const pago = resultado.pago;

        resultadoDiv.className=`resultado ${pago.estado}`; 
        resultadoDiv.classList.remove('hidden');

        //Condicional simple
        if(pago.estado === 'exitoso'){`
            resultadoDiv.innerHTML= 
            <h3>¡Pago exitoso!</h3>
            <p> Transacción ${pago.transaccion} </p>
            <p> Monto ${pago.monto}€ </p>
            <p> Método ${this.formatearMetodo(pago.metodo)} </p>
            <p> Fecha ${pago.fecha} </p>
            <p> Id pago ${pago.id} </p>
            <p>${resultado.mensaje}</p>
            `
        }
    }



}
