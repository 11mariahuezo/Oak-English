<?php

require_once __DIR__ . '/session.php';
include("conexion.php");

$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = trim(is_string($_POST["email"] ?? null) ? $_POST["email"] : "");
    $password = is_string($_POST["password"] ?? null) ? $_POST["password"] : "";

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

            session_regenerate_id(true);
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
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Log In - Oak English</title>
<link rel="icon" href="img/Logo2.png" type="image/png">
<style>
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; padding: 32px 18px; display: grid; place-items: center;
 font-family: 'Segoe UI', Arial, sans-serif; color: #20324d;
 background-color: #fffaf0; background-image: radial-gradient(#92b9db 1px, transparent 1px); background-size: 26px 26px; }
.login-card { width: 100%; max-width: 440px; padding: 36px; background: #fff; border: 1px solid #e4e9ef;
 border-radius: 26px; box-shadow: 0 18px 55px rgba(32,50,77,.10); }
.brand { display: flex; align-items: center; gap: 12px; color: #20324d; text-decoration: none; font-size: 21px; font-weight: 750; }
.brand img { width: 52px; height: 52px; object-fit: contain; }
.tag { display: inline-block; margin-top: 28px; padding: 7px 12px; background: #e7f3ff; color: #235b88; font-size: 12px; font-weight: 650; border-radius: 20px; }
h1 { margin: 16px 0 8px; font-size: clamp(28px, 6vw, 34px); line-height: 1.2; letter-spacing: -.7px; }
.subtitle { margin: 0 0 26px; color: #52647a; line-height: 1.6; font-size: 15px; }
.field { margin-bottom: 18px; }
label { display: block; font-size: 14px; font-weight: 650; margin-bottom: 8px; }
input { width: 100%; min-height: 48px; padding: 13px 14px; font: inherit; font-size: 16px;
 border: 1px solid #9cadc1; border-radius: 12px; background: #f8fafc; color: #20324d; }
input::placeholder { color: #607087; }
input:focus { background: #fff; border-color: #235b88; outline: 3px solid #cfe6fb; outline-offset: 1px; }
.login-button { width: 100%; min-height: 48px; margin-top: 6px; padding: 13px; font: inherit; font-weight: 750;
 border: 1px solid #db95bb; border-radius: 12px; background: #ffc8ea; color: #302039; cursor: pointer; }
.login-button:hover { background: #f5b4db; }
a:focus-visible, button:focus-visible { outline: 3px solid #235b88; outline-offset: 4px; }
.signup { margin: 24px 0 0; text-align: center; font-size: 14px; color: #52647a; line-height: 1.6; }
.signup a { color: #185fa5; font-weight: 700; text-underline-offset: 3px; }
.back { display: block; margin-top: 20px; text-align: center; font-size: 13px; color: #52647a; text-underline-offset: 3px; }
.error { padding: 12px 14px; margin: 0 0 20px; border: 1px solid #dfa9a9; border-radius: 10px; background: #fff0f0; color: #912525; font-size: 14px; line-height: 1.5; }
@media (max-width: 480px) { body { padding: 22px 14px; } .login-card { padding: 28px 24px; } }
</style>
</head>
<body>
<main class="login-card">
 <a class="brand" href="index.html"><img src="img/Logo2.png" alt=""><span>Oak English</span></a>
 <button type="button" id="login-language" style="display:block;margin:16px 0 0 auto;padding:8px 14px;border:1px solid #9cadc1;border-radius:20px;background:#e7f3ff;color:#20324d;cursor:pointer;font:inherit">Español</button>
 <span class="tag">Your learning journey continues</span>
 <h1>Welcome back</h1>
 <p class="subtitle">Log in to continue learning English at your own pace.</p>
 <?php if ($message !== ""): ?>
 <p class="error" role="alert"><?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?></p>
 <?php endif; ?>
 <form method="POST" action="login.php">
  <div class="field">
   <label for="email">Email address</label>
   <input type="email" id="email" name="email" placeholder="you@example.com" autocomplete="username" required>
  </div>
  <div class="field">
   <label for="password">Password</label>
   <input type="password" id="password" name="password" placeholder="Enter your password" autocomplete="current-password" required>
  </div>
  <button class="login-button" type="submit">Log in →</button>
 </form>
 <p class="signup">Don't have an account? <a href="index.html">Create an account</a></p>
 <a class="back" href="index.html">← Back to the start</a>
</main>
<script>
(() => {
 const dictionary = {"Your learning journey continues": "Tu aprendizaje continúa", "Welcome back": "Bienvenido de nuevo", "Log in to continue learning English at your own pace.": "Inicia sesión para seguir aprendiendo inglés a tu ritmo.", "Email address": "Correo electrónico", "Password": "Contraseña", "Enter your password": "Escribe tu contraseña", "Log in →": "Iniciar sesión →", "Don't have an account?": "¿No tienes una cuenta?", "Create an account": "Crear una cuenta", "← Back to the start": "← Volver al inicio", "Invalid email or password.": "Correo o contraseña incorrectos."};
 const button = document.getElementById('login-language');
 const saved = [];
 const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
 let node;
 while ((node = walker.nextNode())) {
  if (node.parentElement.closest('script, style, #login-language')) continue;
  saved.push([node, node.nodeValue]);
 }
 const input = document.getElementById('password');
 const originalPlaceholder = input.placeholder;
 let spanish = localStorage.getItem('oakEnglishLanguage') === 'es';
 function apply() {
  for (const [node, original] of saved) {
   const key = original.trim();
   node.nodeValue = spanish && dictionary[key] ? original.replace(key, dictionary[key]) : original;
  }
  input.placeholder = spanish ? dictionary[originalPlaceholder] : originalPlaceholder;
  document.documentElement.lang = spanish ? 'es' : 'en';
  document.title = spanish ? 'Iniciar sesión - Oak English' : 'Log In - Oak English';
  button.textContent = spanish ? 'English' : 'Español';
  button.setAttribute('aria-pressed', String(spanish));
 }
 button.addEventListener('click', () => {
  spanish = !spanish;
  localStorage.setItem('oakEnglishLanguage', spanish ? 'es' : 'en');
  apply();
 });
 apply();
})();
</script>
</body>
</html>
