<?php
$servidor = "localhost";
$usuario = "root";
$contrasena = "";
$base_datos = "bruma_esencia";

$conexion = new mysqli(
    $servidor,
    $usuario,
    $contrasena,
    $base_datos
);

if ($conexion->connect_error) {
    die("Error de conexion: " . $conexion->connect_error);
}

$conexion->set_charset("utf8mb4");

?>
