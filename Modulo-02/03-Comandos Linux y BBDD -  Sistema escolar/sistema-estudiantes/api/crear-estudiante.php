<?php 
/**
 * api/crear-estudiante.php
 * propósito: Api para crear estudiantes en la base de datos
 * 
 * retorna: info (JSON) a javaScript para que procese la respuesta
*/

//Incluir conexion 
include '../conexion.php';

//Verificar que la petición sea el método POST
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    //Obtener y limpiar los datos del formulario
    $dni = trim($_POST['dni']);
    $nombre = trim($_POST['nombre']);
    $apellido = trim($_POST['apellido']);
    $edad = intval($_POST['edad']);
    $curso = trim($_POST['curso']);
    //Validar que todos los campos requeridos esten presentes
    if (empty($dni) || empty($nombre) || empty($apellido) || empty($edad) || empty($curso)){
        echo json_encode([
            'exito' => 'false',
            'mensaje'=> 'todos los campos son obligatorios'
        ]);
        exit;
    }
    //Verificar si el dni existe en el sistema
    $consulta = "INSERT INTO estudiantes(dni,nombre,apellido,edad,curso)VALUES(?,?,?,?,?)"

}

?>