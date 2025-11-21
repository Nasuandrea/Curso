// ==================== APLICACIÓN PRINCIPAL ====================

// Variable global para el controlador (para acceso desde la vista)
let controlador;

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando Pasarela de Pagos MVC...');
    
    // Inicializar el controlador
    controlador = new ControladorPasarela();
    
    // Cargar datos de ejemplo para demostración
    cargarDatosEjemplo();
    
    console.log('✅ Pasarela de Pagos MVC inicializada correctamente');
    console.log('📚 Patrón MVC en acción:');
    console.log('   - MODELO: Gestiona datos y reglas de negocio');
    console.log('   - VISTA: Maneja la interfaz de usuario');
    console.log('   - CONTROLADOR: Coordina modelo y vista');
});

// Función para cargar datos de ejemplo (opcional)
function cargarDatosEjemplo() {
    // Pre-llenar algunos campos para facilitar las pruebas
    document.getElementById('numeroTarjeta').value = '4111 1111 1111 1111';
    document.getElementById('nombreTarjeta').value = 'Juan Pérez';
    document.getElementById('fechaVencimiento').value = '12/25';
    document.getElementById('cvv').value = '123';
    
    document.getElementById('emailPayPal').value = 'usuario@ejemplo.com';
    document.getElementById('passwordPayPal').value = 'password123';
    
    document.getElementById('numeroCuenta').value = '123456789';
    document.getElementById('nombreBanco').value = 'Banco Ejemplo';
    document.getElementById('titularCuenta').value = 'Juan Pérez';
    
    document.getElementById('descripcionPago').value = 'Compra en Tienda Online';
}

// Función global para reiniciar el sistema (útil para demostraciones)
function reiniciarSistema() {
    if (confirm('¿Estás seguro de que quieres reiniciar el sistema? Se perderá todo el historial.')) {
        controlador = new ControladorPasarela();
        document.getElementById('listaHistorial').innerHTML = '';
        document.getElementById('estadisticasContenido').innerHTML = '';
        document.getElementById('resultadoPago').classList.add('hidden');
        alert('✅ Sistema reiniciado correctamente');
    }
}