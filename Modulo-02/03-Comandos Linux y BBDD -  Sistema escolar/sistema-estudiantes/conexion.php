<?php
// conexion.php 
$host = 'localhost';
$usuario = 'root'; //CAMBIAR POR TU USUARIO
$password = '1234';  // Cambiar por tu password real
$basedatos = 'sistema_escolar';

// Crear conexión
$conexion = new mysqli($host, $usuario, $password, $basedatos);

// Verificar conexión
if ($conexion->connect_error) {

    error_log("Error de conexión a BD: " . $conexion->connect_error);
    die("Error en el sistema. Por favor contacte al administrador.");
}

// Establecer charset
$conexion->set_charset("utf8");

// Configurar zona horaria
date_default_timezone_set('Europa/España');
?>
