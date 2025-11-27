<?php
include 'conexion.php';
include 'includes/header.php';
?>
<h2>Gestión de Estudiantes</h2>
<div class="card">
    <div class="card-body">
<button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#modalEstudiante">
            ➕ Agregar Estudiante
        </button>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Dni</th>
                    <th>Nombre Completo</th>
                    <th>Edad</th>
                    <th>Curso</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $query = "SELECT * FROM estudiantes WHERE activo = 1 ORDER BY apellido, nombre";
                $result = $conexion -> query($query);
                //Condicional de seleccion y colocacion de datos en las columnas de la tabla
                if($result-> num_rows > 0){
                    //variable row es igual a fetch_assoc para traer los datos de la tabla
                    //fetch_assoc() obtiene una fila de resultados como un array asociativo
                    while($row = $result -> fetch_assoc()){
                        $estado= $row['activo'] ? '<span class="badge bg-success">Activo</span>' : '<span class="badge bg-danger">Inactivo</span>';
                        echo "<tr>
                        <td> {$row['id']}</td>
                        <td> {$row['dni']}</td>
                        <td> {$row['nombre']} {$row['apellido']}</td>
                        <td> {$row['edad']}</td>
                        <td> {$row['curso']}</td>
                        <td> {$estado}</td>
                        <td>
                            <button class='btn btn-sm btn-warning'>Editar</button>
                            <button class='btn btn-sm btn-danger'>Eliminar</button>
                        </td>
                        </tr>";
                    }
                }else{
                    //colspan : junta todas las columnas en una
                    echo "<tr>
                    <td colspan='7' class='text-center'>No hay estudiantes</td>
                    </tr>";                
                }
                ?>
            </tbody>
        </table>
    </div>
</div>
<!--MODAL DE ESTUDIANTES (modal es una ventana emergente)

-->

<?php include 'modales/modal-estudiantes.php';?>
<!-- INTERACTIVIDAD CON JS -->
<script src="js/gestion-estudiantes.js"></script>

<?php include "includes/footer.php";
?>