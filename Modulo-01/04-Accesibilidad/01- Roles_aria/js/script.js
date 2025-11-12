// Mostrar alerta
function mostrarAlerta() {
    const alerta = document.getElementById('miAlerta');
    alerta.style.display = 'block';
    // Ocultar alerta a los 3 segundos
    setTimeout(() => {
        alerta.style.display = 'none';
    }, 3000);
}
// Función cambiar pestañas
function cambiarPestaña(numeroPestaña) {
    // Ocultar todos los paneles
    document.querySelectorAll('[role="tabpanel"]').forEach (panel =>{
        panel.style.display='none';
        panel.setAttribute('aria-hidden','true')
    });

    //Deseleccionar todas las pestañas
    document.querySelectorAll('[role="tab"]').forEach (pestaña =>{
        pestaña.setAttribute('aria-selected','false')
    });

    // Mostrar el panel seleccionado
    const panelSeleccionado = document.getElementById(`panel-${numeroPestaña}`);
    panelSeleccionado.style.display='block';
    panelSeleccionado.setAttribute('aria-hidden', 'false');

    //Seleccionar la pestaña que está activa
    const tabSeleccionada = document.getElementById(`tab-${numeroPestaña}`);
    tabSeleccionada.setAttribute('aria-selected', 'true');
}

//Función para zona actualización
let contadorEstado = 0;
function actualizarEstado (){
contadorEstado++;
const estados =[
    "Sistema funcionando",
    "Procesando datos",
    "Esperando instrucciones"
];

const estadoAleatorio = estados[Math.floor(Math.random()*estados.length)];
document.getElementById("liveRegion").textContent= `${estadoAleatorio} (Actualización ${contadorEstado})`;
}

 function actualizarLiveRegion(mensaje){
    const liveRegion= document.getElementById('liveRegion');
    liveRegion.textContent = mensaje;
 }

 //Inicializar la primera pestaña como activa
document.addEventListener('DOMContentLoaded', ()=>{
 cambiarPestaña(1)
})
