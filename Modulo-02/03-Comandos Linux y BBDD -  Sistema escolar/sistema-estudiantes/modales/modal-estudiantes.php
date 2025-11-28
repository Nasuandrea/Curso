<?php
//archivo modal-estudiantes.php
/*
 *
 * VENTA EMERGENTE PARA AGREGAR Y EDITAR ESTUDIANTES
 *
 * BOOTSTRAP PROPORCIONA COMPONENTES MODALES QUE PODEMOS PERSONALIZAR
 *
 * */
include '../conexion.php'; ?>

<!--id, el modal estara oculto hasta que sea llamado -->

<div class="modal fade" id="modalEstudiante" tabindex="-1" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header bg-primary text-white">
<h5 class="modal-title" id="modalTitulo">Agregar Estudiante</h5>
<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
</div>
<div class="modal-body">
<form id="formEstudiantes" >
<input type="hidden" id="estudianteId" name="id" value="">
<!--campo DNI-->

<div class="mb-3">
<label for="dni" class="form-label">DNI *</label>
<input type="text" class="form-control" id="dni" name="dni" required maxlength="20" placeholder="Ingrese el DNI del estudiante">
<div class="form-text">El DNI DEBE SER UNICO</div>
</div>

<!--campo NOMBRE-->
<div class="mb-3">
<label for="nombre" class="form-label">Nombre</label>
<input type="text" class="form-control" id="nombre" name="nombre" required maxlength="20" placeholder="Ingrese el nombre del estudiante">
</div>

<!--campo Apellido-->
<div class="mb-3">
<label for="apellido" class="form-label">Apellido </label>
<input type="text" class="form-control" id="apellido" name="apellido" required maxlength="20" placeholder="Ingrese el apellido del estudiante">
</div>

<!-- campo EDAD-->
<div class="mb-3">
<label for="edad" class="form-label">Edad</label>
<input type="number" class="form-control" id="edad" name="edad" required min="1" max="100" placeholder="Ingrese la edad del estudiante">
<div class="form-text">La edad debe estar entre 1 y 100 años</div>
</div>


<!--campo CURSO-->
<div class="mb-3">
<label for="curso" class="form-label">Curso</label>
<input type="text" class="form-control" id="curso" name="curso" required maxlength="50" placeholder="Ingrese el curso del estudiante">
</div>

<!--nota sobre los campos obligatorios-->
<div class="alert alert-info small">
<strong>Nota: Los campos marcados con * son obligatorios</strong>
</div>
</form>
</div>
<!--pie del modal-->
<div class="modal-footer">
<!--boton de cerrar sin cambios-->
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
<!--boton de guardar datos con js-->
<button type="button" class="btn btn-primary" onclick="guardarEstudiante()">Guardar estudiante</button>
</div>

</div>

</div>

</div>
<script src="../js/gestion-estudiantes.js"> </script>