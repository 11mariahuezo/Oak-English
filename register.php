<?php

session_start();

header("Content-Type: application/json");

require_once "conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
    ]);

    exit();
}

$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";
$profile = $data["profile"] ?? [];


// Validaciones

if ($name === "" || $email === "" || $password === "") {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Please fill out all fields."
    ]);

    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Invalid email address."
    ]);

    exit();
}

if (strlen($password) < 8) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Password must be at least 8 characters long."
    ]);

    exit();
}


// Separar nombre y apellido

$nameParts = preg_split('/\s+/', $name, 2);

$firstName = $nameParts[0];
$lastName = $nameParts[1] ?? "";


// Verificar si el correo ya existe

$sqlCheck = "SELECT id_usuario
             FROM usuarios
             WHERE correo = ?";

$stmtCheck = $conexion->prepare($sqlCheck);

$stmtCheck->bind_param(
    "s",
    $email
);

$stmtCheck->execute();

$resultCheck = $stmtCheck->get_result();

if ($resultCheck->num_rows > 0) {

    http_response_code(409);

    echo json_encode([
        "success" => false,
        "message" => "An account with this email already exists."
    ]);

    exit();
}


// Cifrar contraseña

$passwordHash = password_hash(
    $password,
    PASSWORD_DEFAULT
);


// Crear usuario

$sql = "INSERT INTO usuarios
        (nombre, apellido, correo, contrasena)
        VALUES (?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);

$stmt->bind_param(
    "ssss",
    $firstName,
    $lastName,
    $email,
    $passwordHash
);

if (!$stmt->execute()) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Unable to create account."
    ]);

    exit();
}


// ID del usuario recién creado

$userId = $conexion->insert_id;


// Guardar perfil de aprendizaje

if (!empty($profile)) {

    $age = $profile["age"] ?? null;
    $level = $profile["level"] ?? null;
    $goal = $profile["goal"] ?? null;
    $time = $profile["time"] ?? null;
    $style = $profile["style"] ?? null;
    $needs = $profile["needs"] ?? null;
    $days = $profile["days"] ?? null;
    $topic = $profile["topic"] ?? null;

    $sqlProfile = "INSERT INTO perfil_aprendizaje
    (
        id_usuario,
        edad_rango,
        nivel,
        objetivo,
        tiempo_diario,
        estilo,
        necesidad,
        dias_semana,
        tema
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmtProfile = $conexion->prepare($sqlProfile);

    $stmtProfile->bind_param(
        "issssssss",
        $userId,
        $age,
        $level,
        $goal,
        $time,
        $style,
        $needs,
        $days,
        $topic
    );

    $stmtProfile->execute();
}


// LOGIN AUTOMÁTICO

session_regenerate_id(true);

$_SESSION["id_usuario"] = $userId;
$_SESSION["nombre"] = $firstName;
$_SESSION["apellido"] = $lastName;
$_SESSION["correo"] = $email;
$_SESSION["rol"] = "usuario";


// Respuesta única

echo json_encode([
    "success" => true,
    "message" => "Account created successfully.",
    "user" => [
        "id" => $userId,
        "name" => $firstName,
        "email" => $email
    ]
]);

exit();