<?php

session_start();

if (!isset($_SESSION["id_usuario"])) {
    header("Location: login.php");
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Home - Oak English</title>
</head>

<body>

    <h1>Welcome, <?php echo htmlspecialchars($_SESSION["nombre"]); ?>!</h1>

    <p>You are logged in to Oak English.</p>

    <p>
        Email:
        <?php echo htmlspecialchars($_SESSION["correo"]); ?>
    </p>

    <a href="logout.php">Log Out</a>

</body>

</html>