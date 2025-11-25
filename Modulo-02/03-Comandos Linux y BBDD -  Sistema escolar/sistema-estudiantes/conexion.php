<?php
//conexion-php
$host = 'localhost';
$usuario = 'root';
$password = '1234';
$basedatos = 'sistema_escolar';

//Creamos conexion
$conexion = new mysqli($host, $usuario, $password, $basedatos);

//Verificación
if($conexion -> connect_error){
die("Error de conexión" . $conexion -> connect_error);
}

//Establecer ubicación por defecto
$conexion -> set_charset("utf8");

//Zona horaria opcional
date_default_timezone_set('Europe/Spain');
echo "<!--Conexión establecida correctamente -->";
?>
