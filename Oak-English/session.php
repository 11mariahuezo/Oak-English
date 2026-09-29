<?php
if (session_status() === PHP_SESSION_NONE) {
 session_set_cookie_params(['httponly' => true, 'secure' => getenv('APP_ENV') === 'production', 'samesite' => 'Lax', 'path' => '/']);
 session_start();
}
