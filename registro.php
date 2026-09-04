<?php
include("conexion.php");

$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $email = $_POST["email"];

    $password = password_hash(
        $_POST["password"],
        PASSWORD_DEFAULT
    );

    $sql = "INSERT INTO usuarios
            (nombre, apellido, correo, contrasena)
            VALUES (?, ?, ?, ?)";

    $stmt = $conexion->prepare($sql);

    $stmt->bind_param(
        "ssss",
        $first_name,
        $last_name,
        $email,
        $password
    );

    if ($stmt->execute()) {
        $message = "Account created successfully.";
    } else {
        $message = "Error creating account: " . $stmt->error;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up - Oak English</title>
</head>

<body>

<h2>Create Account</h2>

<form method="POST">

    <input
        type="text"
        name="first_name"
        placeholder="First Name"
        required
    >

    <br><br>

    <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        required
    >

    <br><br>

    <input
        type="email"
        name="email"
        placeholder="Email"
        required
    >

    <br><br>

    <input
        type="password"
        name="password"
        placeholder="Password"
        required
    >

    <br><br>

    <button type="submit">
        Sign Up
    </button>

</form>

<p>
    <?php echo $message; ?>
</p>

</body>
</html>