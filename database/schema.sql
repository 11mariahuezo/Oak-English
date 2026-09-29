-- For a NEW database only. Inferred from PHP; no original SQL was supplied.
CREATE TABLE IF NOT EXISTS usuarios (
 id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(100) NOT NULL,
 apellido VARCHAR(100) NOT NULL DEFAULT '',
 correo VARCHAR(254) NOT NULL UNIQUE,
 contrasena VARCHAR(255) NOT NULL,
 rol VARCHAR(30) NOT NULL DEFAULT 'usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS perfil_aprendizaje (
 id_perfil INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 id_usuario INT NOT NULL UNIQUE,
 edad_rango VARCHAR(100), nivel VARCHAR(100), objetivo VARCHAR(255),
 tiempo_diario VARCHAR(100), estilo VARCHAR(100), necesidad VARCHAR(255),
 dias_semana VARCHAR(100), tema VARCHAR(255),
 FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
