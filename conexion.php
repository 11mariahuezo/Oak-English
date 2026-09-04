<?php

$host = "mysql-oak-english-soyapango-6709.f.aivencloud.com";
$puerto = 26633;
$usuario = "avnadmin";
$password = 'AVNS_oNMnp971ds4bHEU-5cV';
$base_datos = "oak_english";

$conexion = mysqli_init();

mysqli_ssl_set(
    $conexion,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
);

mysqli_real_connect(
    $conexion,
    $host,
    $usuario,
    $password,
    $base_datos,
    $puerto,
    NULL,
    MYSQLI_CLIENT_SSL
);

if (mysqli_connect_errno()) {
    die("Error de conexión: " . mysqli_connect_error());
}


?>