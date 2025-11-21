// ==================== CONTROLADOR - COORDINADOR ====================

class ControladorPasarela {
    constructor() {
        this.modelo = new PasarelaPagos();
        this.vista = new VistaPasarela();
    }

    async procesarPago(monto, tipoMetodo, datosMetodo, descripcion) {
        try {
            let metodoPago;

            // Crear el objeto de método de pago según el tipo
            switch (tipoMetodo) {
                case 'tarjeta':
                    metodoPago = new TarjetaCredito(
                        datosMetodo.numero,
                        datosMetodo.nombre,
                        datosMetodo.fechaVencimiento,
                        datosMetodo.cvv
                    );
                    break;

                case 'paypal':
                    metodoPago = new PayPal(
                        datosMetodo.correo,
                        datosMetodo.contraseña
                    );
                    break;

                case 'transferencia':
                    metodoPago = new TransferenciaBancaria(
                        datosMetodo.numeroCuenta,
                        datosMetodo.nombreBanco,
                        datosMetodo.titular
                    );
                    break;

                default:
                    throw new Error('Método de pago no válido');
            }

            // Procesar el pago a través del modelo
            const resultado = await this.modelo.procesarPago(monto, metodoPago, descripcion);

            // Mostrar resultado a través de la vista
            this.vista.mostrarResultadoPago(resultado);

            return resultado;

        } catch (error) {
            // Manejar errores y mostrar a través de la vista
            this.vista.mostrarError(error.message);
            throw error;
        }
    }

    obtenerHistorial() {
        return this.modelo.obtenerHistorial();
    }

    obtenerEstadisticas() {
        return this.modelo.obtenerEstadisticas();
    }
}