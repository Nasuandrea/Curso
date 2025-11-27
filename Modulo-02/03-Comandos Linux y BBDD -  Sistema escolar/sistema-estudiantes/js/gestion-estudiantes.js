/*Gestion estudiantes
Funciones JS para la gestion de estudiantes:
- Abrir modal
- Hacer peticion al servidor a traves de una API que crearemos
- Manipular el DOM para mostrar los datos
- Mostrar mensajes al usuario
*/

/**
 * Funcion :  abrirModal()
 * Propósito: Abre el modal en modo "Agregar Nuevo Estudiante"
 * Prepara el modal para crear un nuevo estudiante
*/

function abrirModal(){
    //1. Limpiar campos del formulario
    document.getElementById('formEstudiantes').reset();
    //2. Limpiar el campo id (para que el servidor sepa que es uno nuevo)
    document.getElementById('estudianteId').value='';
    //3. Cambiar el titulo del modal
    document.getElementById('modalTitulo').textContent='Editar Estudiante';
    //4. Obtener datos desde el servidor (la BBDD)
    //Fetch API forma de peticiones en JavaScript
    fetch(`api/obtener-estudiantes.php?=${id}`)
    .then(response => {
        //Convertir la respuesta a JSON(JavaScript Object Notation)
        return response.json();
    })
    .then(date =>{
        //verificar si la peticion fue exitosa
        if(data.exito){
            //Cargar los datos en el formulario
            const estudiante = data.estudiantes;
            document.getElementById('estudianteId').value = estudiante.id;
            document.getElementById('dni').value = estudiante.dni;
            document.getElementById('nombre').value = estudiante.nombre;
            document.getElementById('apellido').value = estudiante.apellido;
            document.getElementById('edad').value = estudiante.edad;
            document.getElementById('curso').value = estudiante.curso;

            //Mostrar el modal
            const modal = new bootstrap.Modal(document.getElementById('modalEstudiante'));
            modal.show();
        }else{
            //Mostrar el error si algo salio mal
            alert('ERROR: ' + data.mensaje);
        }
    }).catch(error=>{
        //Manejar errores de red o del servidor
        console.error('Error: ', error);
        alert('Error al cargar los datos del estudiante');
    });
}

/** Función guardarEstudiante()
* Guardar o Actualizar el estudiante (Si existe o no el ID)
* Crea o actualiza basándose en el id
*/
function guardarEstudiante(){
    //Obtener los datos del formulario y crear objeto con esos datos
    const formulario = document.getElementById('formEstudiantes');
    const datosFormulario = new FormData(formulario);
    //Determinar si es crear o actualizar (segun el ID)
    const estudianteId = document.getElementById('estudianteId').value;
    const url = estudianteId ? 'api/actualizar-estudiante.php' : 'api/crear-estudiante.php';
    //metodo POST para enviar datos
    const metodo ='POST';
    //Enviar al servidor
    fetch(url, {
        method:metodo,
        body:datosFormulario    
    }).then( response => response.json())
    .then(data => {
        if(data.exito){
            //Exito cerrar modal y recargar la página
            const modal = new bootstrap.Modal(document.getElementById('modalEstudiante'));
            modal.hide();
            //Mostrar mensaje de éxito
            alert('OK '+ data.mensaje);
            //Recarga la pagina para ver los cambios
            location.reload();
        }else {
            //Error: mostrar mensaje
            alert ('Fallo!! '+ data.mensaje);
        }
    }).catch(error=>{
        //Manejar errores de red o del servidor
        console.error('Error: ', error);
        alert('Error al cargar los datos del estudiante');
    });
}
/** Funcion eliminarEstudiante(id)
 * eliminar estudiante -- eliminación lógica
 * @param {number} id -- el id del estudiante a eliminar
 * confirm() para confirmar antes de eliminar
 */
function eliminarEstudiante(id){
    //Peticion confimacion al usuario
    if(confirm('Estas seguro de que deseas eliminar este estudiante? \n\n Esta acción no se puede deshacer')){
        //Enviar peticion de eliminacion
        fetch('api/eliminar-estudiante.php',{
            method:'POST',
            headers: {
                'Content type:': 'aplication/x-www-form-urlencoded'},
            body: `id=${id}`
        })
        .then(response => response.json())
        .then(data => {
            if(data.exito){
                //Exito

            }else{

            }
        })
        .catch();
    }
}