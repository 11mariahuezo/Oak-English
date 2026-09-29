<?php
// Configure these values in Render > Environment. Do not commit credentials.
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
try {
    $required = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_SSL_CA'];
    foreach ($required as $name) {
        if (getenv($name) === false || getenv($name) === '') {
            throw new RuntimeException('Missing database configuration: ' . $name);
        }
    }
    $port = filter_var(getenv('DB_PORT'), FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 65535]]);
    $ca = getenv('DB_SSL_CA');
    if (!$port || !is_readable($ca)) {
        throw new RuntimeException('Invalid database port or unreadable CA certificate.');
    }
    $conexion = mysqli_init();
    $conexion->options(MYSQLI_OPT_CONNECT_TIMEOUT, 10);
    $conexion->options(MYSQLI_OPT_SSL_VERIFY_SERVER_CERT, true);
    $conexion->ssl_set(null, null, $ca, null, null);
    $conexion->real_connect(getenv('DB_HOST'), getenv('DB_USER'), getenv('DB_PASSWORD'), getenv('DB_NAME'), $port, null, MYSQLI_CLIENT_SSL);
    $conexion->set_charset('utf8mb4');
} catch (Throwable $e) {
    error_log('Oak English database connection failed; check environment and CA certificate.');
    http_response_code(503);
    if (basename($_SERVER['SCRIPT_NAME'] ?? '') === 'register.php') {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Database temporarily unavailable.']);
    } else {
        echo 'Database temporarily unavailable. Please try again later.';
    }
    exit;
}
