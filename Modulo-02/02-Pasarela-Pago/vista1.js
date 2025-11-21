// ==================== VISTA - INTERFAZ DE USUARIO ====================

class VistaPasarela {
    constructor() {
        this.metodoSeleccionado = null;
        this.inicializarEventos();
    }

    inicializarEventos() {
        // Navegación entre secciones
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.mostrarSeccion(e.target.dataset.section);
            });
        });

        // Selección de método de pago
        document.querySelectorAll('.method-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.seleccionarMetodoPago(e.currentTarget.dataset.method);
            });
        });

        // Procesar pago
        document.getElementById('btnProcesarPago').addEventListener('click', () => {
            this.procesarPago();
        });

        // Validación en tiempo real de inputs
        this.inicializarValidaciones();
    }

    mostrarSeccion(seccionId) {
        // Actualizar botones de navegación
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${seccionId}"]`).classList.add('active');

        // Mostrar sección correspondiente
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(seccionId).classList.add('active');

        // Actualizar contenido dinámico
        if (seccionId === 'historial') {
            this.actualizarHistorial();
        } else if (seccionId === 'estadisticas') {
            this.actualizarEstadisticas();
        }
    }

    seleccionarMetodoPago(metodo) {
        this.metodoSeleccionado = metodo;

        // Actualizar UI de selección
        document.querySelectorAll('.method-option').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`[data-method="${metodo}"]`).classList.add('active');

        // Mostrar formulario correspondiente
        document.querySelectorAll('.payment-form').forEach(form => {
            form.classList.add('hidden');
        });
        document.getElementById(`form-${metodo}`).classList.remove('hidden');

        // Habilitar botón de procesar
        document.getElementById('btnProcesarPago').disabled = false;
    }

    obtenerDatosPago() {
        const monto = parseFloat(document.getElementById('montoPago').value);
        const descripcion = document.getElementById('descripcionPago').value;

        let datosMetodo;
        switch (this.metodoSeleccionado) {
            case 'tarjeta':
                datosMetodo = {
                    numero: document.getElementById('numeroTarjeta').value.replace(/\s/g, ''),
                    nombre: document.getElementById('nombreTarjeta').value,
                    fechaVencimiento: document.getElementById('fechaVencimiento').value,
                    cvv: document.getElementById('cvv').value
                };
                break;
            case 'paypal':
                datosMetodo = {
                    correo: document.getElementById('emailPayPal').value,
                    contraseña: document.getElementById('passwordPayPal').value
                };
                break;
            case 'transferencia':
                datosMetodo = {
                    numeroCuenta: document.getElementById('numeroCuenta').value,
                    nombreBanco: document.getElementById('nombreBanco').value,
                    titular: document.getElementById('titularCuenta').value
                };
                break;
        }

        return { monto, descripcion, datosMetodo };
    }

    async procesarPago() {
        const btnProcesar = document.getElementById('btnProcesarPago');
        const resultadoDiv = document.getElementById('resultadoPago');
        
        // Mostrar loading
        btnProcesar.disabled = true;
        btnProcesar.innerHTML = '⏳ Procesando...';
        resultadoDiv.classList.add('hidden');

        try {
            // Obtener datos del formulario
            const { monto, descripcion, datosMetodo } = this.obtenerDatosPago();
            
            // Validaciones básicas
            if (!monto || monto <= 0) {
                throw new Error('El monto debe ser mayor a 0');
            }

            if (!descripcion) {
                throw new Error('La descripción es requerida');
            }

            // Delegar al controlador
            await controlador.procesarPago(monto, this.metodoSeleccionado, datosMetodo, descripcion);
            
        } catch (error) {
            this.mostrarError(error.message);
        } finally {
            // Restaurar botón
            btnProcesar.disabled = false;
            btnProcesar.innerHTML = '🔄 Procesar Pago';
        }
    }

    mostrarResultadoPago(resultado) {
        const resultadoDiv = document.getElementById('resultadoPago');
        const pago = resultado.pago;
        
        resultadoDiv.className = `resultado ${pago.estado}`;
        resultadoDiv.classList.remove('hidden');

        if (pago.estado === 'exitoso') {
            resultadoDiv.innerHTML = `
                <h3>✅ ¡PAGO EXITOSO!</h3>
                <p><strong>Transacción:</strong> ${pago.transaccion}</p>
                <p><strong>Monto:</strong> $${pago.monto}</p>
                <p><strong>Método:</strong> ${this.formatearMetodo(pago.metodo)}</p>
                <p><strong>Fecha:</strong> ${pago.fecha} ${pago.hora}</p>
                <p><strong>ID de pago:</strong> ${pago.id}</p>
                <p class="mt-2">${resultado.mensaje}</p>
            `;
        } else {
            resultadoDiv.innerHTML = `
                <h3>❌ PAGO FALLIDO</h3>
                <p><strong>Motivo:</strong> ${resultado.mensaje}</p>
                <p><strong>Monto:</strong> $${pago.monto}</p>
                <p><strong>Método:</strong> ${this.formatearMetodo(pago.metodo)}</p>
                <p><strong>Fecha:</strong> ${pago.fecha} ${pago.hora}</p>
                <p><strong>ID de pago:</strong> ${pago.id}</p>
            `;
        }

        // Actualizar otras secciones
        this.actualizarHistorial();
        this.actualizarEstadisticas();
    }

    mostrarError(mensaje) {
        const resultadoDiv = document.getElementById('resultadoPago');
        resultadoDiv.className = 'resultado fallido';
        resultadoDiv.classList.remove('hidden');
        resultadoDiv.innerHTML = `
            <h3>❌ ERROR</h3>
            <p>${mensaje}</p>
        `;
    }

    actualizarHistorial() {
        const historial = controlador.obtenerHistorial();
        const listaHistorial = document.getElementById('listaHistorial');

        if (historial.length === 0) {
            listaHistorial.innerHTML = `
                <div class="text-center">
                    <p>No hay pagos registrados</p>
                    <p class="mt-2">¡Realiza tu primer pago!</p>
                </div>
            `;
            return;
        }

        listaHistorial.innerHTML = historial.map(pago => `
            <div class="pago-item ${pago.estado}">
                <div class="pago-info">
                    <h4>${pago.descripcion}</h4>
                    <div class="pago-detalles">
                        <strong>$${pago.monto}</strong> • ${this.formatearMetodo(pago.metodo)} • ${pago.fecha} ${pago.hora}
                        ${pago.transaccion ? `<br><small>Transacción: ${pago.transaccion}</small>` : ''}
                    </div>
                </div>
                <div class="pago-estado estado-${pago.estado}">
                    ${pago.estado === 'exitoso' ? '✅ Exitosa' : '❌ Fallida'}
                </div>
            </div>
        `).join('');
    }

    actualizarEstadisticas() {
        const estadisticas = controlador.obtenerEstadisticas();
        const estadisticasDiv = document.getElementById('estadisticasContenido');

        estadisticasDiv.innerHTML = `
            <div class="estadistica-card">
                <div class="estadistica-label">Total de Pagos</div>
                <div class="estadistica-valor">${estadisticas.total}</div>
            </div>
            <div class="estadistica-card">
                <div class="estadistica-label">Pagos Exitosos</div>
                <div class="estadistica-valor" style="color: #28a745;">${estadisticas.exitosos}</div>
            </div>
            <div class="estadistica-card">
                <div class="estadistica-label">Pagos Fallidos</div>
                <div class="estadistica-valor" style="color: #dc3545;">${estadisticas.fallidos}</div>
            </div>
            <div class="estadistica-card">
                <div class="estadistica-label">Tasa de Éxito</div>
                <div class="estadistica-valor" style="color: #17a2b8;">${estadisticas.tasaExito}</div>
            </div>
        `;
    }

    formatearMetodo(metodo) {
        const metodos = {
            'TarjetaCredito': '💳 Tarjeta',
            'PayPal': '📧 PayPal',
            'TransferenciaBancaria': '🏦 Transferencia'
        };
        return metodos[metodo] || metodo;
    }

    inicializarValidaciones() {
        // Validación de número de tarjeta con formato
        document.getElementById('numeroTarjeta').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
            if (value.length > 16) value = value.substr(0, 16);
            
            // Agregar espacios cada 4 dígitos
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            e.target.value = value;
        });

        // Validación de fecha de vencimiento
        document.getElementById('fechaVencimiento').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 4) value = value.substr(0, 4);
            
            if (value.length > 2) {
                value = value.substr(0, 2) + '/' + value.substr(2);
            }
            e.target.value = value;
        });

        // Solo números para CVV
        document.getElementById('cvv').addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substr(0, 3);
        });
    }
}