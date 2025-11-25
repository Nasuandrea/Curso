<?php

include 'conexion.php';
include 'includes/header.php';
?>
<div class= "row">
    <div class= "col-md-12">
        <h1 class= "text-center mb-4">
            Bienvenidos al Sistema de Gestión
        </h1>
        <div class= "card-body">
            <h5> Estudiantes </h5>
            <?php 
            $query = "SELECT COUNT(*) as total FROM estudiantes WHERE activo = 1;";
            ?>
            <a href="#"> Ver Estudiantes </a>
        </div>

        <div class= "card-body">
            <h5> Asignaturas </h5>
            <?php 
            //Listado de asignaturas
            ?>
            <a href="#"> Ver Asignaturas </a>
        </div>

        <div class= "card-body">
            <h5> Profesores </h5>
            <?php 
            //Listado de profesores
            ?>
            <a href="#"> Ver Profesores </a>
        </div>
    </div>
</div>
<?php include 'includes/footer.php';?>
