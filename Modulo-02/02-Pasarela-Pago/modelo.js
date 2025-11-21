// ==================== MODELO - PASARELA DE PAGOS ====================

class Pago {
    constructor(id, monto, metodo, descripcion) {
        this.id = id;
        this.monto = monto;
        this.metodo = metodo;
        this.descripcion = descripcion;
        this.estado = 'pendiente';
        this.fecha = new Date();
        this.numeroTransaccion = null;
    }

    marcarExitoso(numeroTransaccion) {
        this.estado = 'exitoso';
        this.numeroTransaccion = numeroTransaccion;
        console.log(`✅ Pago ${this.id} procesado exitosamente`);
    }

    marcarFallido() {
        this.estado = 'fallido';
        console.log(`❌ Pago ${this.id} falló`);
    }

    obtenerInfo() {
        return {
            id: this.id,
            monto: this.monto,
            metodo: this.metodo,
            descripcion: this.descripcion,
            estado: this.estado,
            fecha: this.fecha.toLocaleDateString('es-ES'),
            hora: this.fecha.toLocaleTimeString('es-ES'),
            transaccion: this.numeroTransaccion
        };
    }
}

class TarjetaCredito {
    constructor(numero, nombre, fechaVencimiento, cvv) {
        this.numero = numero;
        this.nombre = nombre;
        this.fechaVencimiento = fechaVencimiento;
        this.cvv = cvv;
    }

    validar() {
        const errores = [];

        if (!this.numero || this.numero.length !== 16 || !/^\d+$/.test(this.numero)) {
            errores.push('El número de tarjeta debe tener 16 dígitos');
        }

        if (!this.nombre || this.nombre.length < 3) {
            errores.push('El nombre debe tener al menos 3 caracteres');
        }

        if (!this.fechaVencimiento || !/^\d{2}\/\d{2}$/.test(this.fechaVencimiento)) {
            errores.push('La fecha de vencimiento debe tener formato MM/AA');
        }

        if (!this.cvv || this.cvv.length !== 3 || !/^\d+$/.test(this.cvv)) {
            errores.push('El CVV debe tener 3 dígitos');
        }

        return errores;
    }

    procesarPago(monto) {
        console.log(`💳 Procesando pago de ${monto} con tarjeta...€`);
        
        // Simular procesamiento
        return new Promise((resolve) => {
            setTimeout(() => {
                const numeroTransaccion = 'TXN_' + Date.now();
                const exito = Math.random() > 0.2; // 20% de fallo
                
                resolve({
                    exito: exito,
                    numeroTransaccion: exito ? numeroTransaccion : null,
                    mensaje: exito ? 'Pago aprobado por el banco' : 'Fondos insuficientes'
                });
            }, 2000); // Simular 2 segundos de procesamiento
        });
    }
}

class PayPal {
    constructor(correo, contraseña) {
        this.correo = correo;
        this.contraseña = contraseña;
    }

    validar() {
        const errores = [];

        if (!this.correo || !this.correo.includes('@')) {
            errores.push('El correo de PayPal no es válido');
        }

        if (!this.contraseña || this.contraseña.length < 6) {
            errores.push('La contraseña debe tener al menos 6 caracteres');
        }

        return errores;
    }

    procesarPago(monto) {
        console.log(`📧 Procesando pago de ${monto} con PayPal...€`);
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const numeroTransaccion = 'PP_' + Date.now();
                const exito = Math.random() > 0.15;
                
                resolve({
                    exito: exito,
                    numeroTransaccion: exito ? numeroTransaccion : null,
                    mensaje: exito ? 'Pago exitoso vía PayPal' : 'Error en la cuenta de PayPal'
                });
            }, 1500);
        });
    }
}

class TransferenciaBancaria {
    constructor(numeroCuenta, nombreBanco, titular) {
        this.numeroCuenta = numeroCuenta;
        this.nombreBanco = nombreBanco;
        this.titular = titular;
    }

    validar() {
        const errores = [];

        if (!this.numeroCuenta || this.numeroCuenta.length < 5) {
            errores.push('El número de cuenta no es válido');
        }

        if (!this.nombreBanco) {
            errores.push('El nombre del banco es requerido');
        }

        if (!this.titular) {
            errores.push('El nombre del titular es requerido');
        }

        return errores;
    }

    procesarPago(monto) {
        console.log(`🏦 Procesando transferencia de ${monto}...€`);
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const numeroTransaccion = 'TRF_' + Date.now();
                const exito = Math.random() > 0.05;
                
                resolve({
                    exito: exito,
                    numeroTransaccion: exito ? numeroTransaccion : null,
                    mensaje: exito ? 'Transferencia bancaria exitosa' : 'Error en la transferencia'
                });
            }, 3000);
        });
    }
}

class PasarelaPagos {
    constructor() {
        this.pagos = [];
        this.contadorId = 1;
    }

    async procesarPago(monto, metodoPago, descripcion) {
        console.log(`🔄 INICIANDO PROCESO DE PAGO...`);

        // Validar el método de pago
        const erroresValidacion = metodoPago.validar();
        if (erroresValidacion.length > 0) {
            throw new Error(`Errores de validación: ${erroresValidacion.join(', ')}`);
        }

        // Crear registro de pago
        const pago = new Pago(this.contadorId++, monto, metodoPago.constructor.name, descripcion);
        this.pagos.push(pago);

        // Procesar el pago
        const resultado = await metodoPago.procesarPago(monto);

        // Actualizar estado del pago
        if (resultado.exito) {
            pago.marcarExitoso(resultado.numeroTransaccion);
        } else {
            pago.marcarFallido();
        }

        return {
            pago: pago.obtenerInfo(),
            mensaje: resultado.mensaje
        };
    }

    obtenerHistorial() {
        return this.pagos.map(pago => pago.obtenerInfo()).reverse(); // Más recientes primero
    }

    obtenerEstadisticas() {
        const total = this.pagos.length;
        const exitosos = this.pagos.filter(p => p.estado === 'exitoso').length;
        const fallidos = this.pagos.filter(p => p.estado === 'fallido').length;

        return {
            total: total,
            exitosos: exitosos,
            fallidos: fallidos,
            tasaExito: total > 0 ? (exitosos / total * 100).toFixed(1) + '%' : '0%'
        };
    }
}