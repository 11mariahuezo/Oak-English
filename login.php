<?php

session_start();
include("conexion.php");

$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    $sql = "SELECT id_usuario, nombre, apellido, correo, contrasena, rol
            FROM usuarios
            WHERE correo = ?";

    $stmt = $conexion->prepare($sql);

    $stmt->bind_param("s", $email);

    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows === 1) {

        $user = $result->fetch_assoc();

        if (password_verify($password, $user["contrasena"])) {

            $_SESSION["id_usuario"] = $user["id_usuario"];
            $_SESSION["nombre"] = $user["nombre"];
            $_SESSION["apellido"] = $user["apellido"];
            $_SESSION["correo"] = $user["correo"];
            $_SESSION["rol"] = $user["rol"];

            header("Location: home.php");
            exit();

        } else {

            $message = "Invalid email or password.";

        }

    } else {

        $message = "Invalid email or password.";

    }

    $stmt->close();
}

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Log In - Oak English</title>

</head>

<body>

    <h1>Oak English</h1>

    <h2>Welcome Back</h2>

    <p>Log in to continue learning English.</p>

    <?php if ($message != ""): ?>

        <p>
            <?php echo htmlspecialchars($message); ?>
        </p>

    <?php endif; ?>

    <form method="POST">

        <label for="email">
            Email
        </label>

        <br>

        <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
        >

        <br><br>

        <label for="password">
            Password
        </label>

        <br>

        <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
        >

        <br><br>

        <button type="submit">
            Log In
        </button>

    </form>

    <br>

    <p>
        Don't have an account?
        <a href="registro.php">
            Sign Up
        </a>
    </p>

</body>

</html>