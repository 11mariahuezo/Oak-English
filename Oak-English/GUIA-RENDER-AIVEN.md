# Publicar Oak English en Render con Aiven MySQL

Se trabajó con el ZIP adjunto. No se modificó el repositorio remoto ni se conectó a tu base de datos.

## 1. Actualiza tu proyecto en GitHub

Primero cambia la contraseña de Aiven: había una contraseña escrita en conexion.php. Quitarla del archivo no la elimina del historial de Git. No reutilices la anterior.

Descomprime este ZIP. Copia el contenido de Oak-English dentro de tu carpeta local del repositorio, reemplazando los archivos correspondientes. Conserva la carpeta .git que ya tienes localmente. Haz una copia de tu trabajo antes de reemplazarlo.

Desde la terminal de VS Code, dentro de tu repositorio:

```powershell
git status
git add .
git commit -m "Preparar PHP para Render y Aiven"
git push
```

Comprueba que Dockerfile esté directamente en la raíz del repositorio, junto a index.html y conexion.php. No subas una carpeta Oak-English adicional dentro del repositorio.

## 2. Revisa Aiven

Usa un servicio MySQL, no PostgreSQL. En la información de conexión del servicio, copia host, port, user y la contraseña NUEVA. Selecciona la base de datos que contiene tus tablas, por ejemplo oak_english si ese es el nombre real.

Descarga el certificado CA del servicio (ca.pem).

Si ya tienes las tablas usuarios y perfil_aprendizaje, conserva tu base y tus datos. El ZIP original no traía SQL. database/schema.sql contiene un esquema mínimo deducido de login.php y register.php, para una base NUEVA. No migra ni corrige una tabla existente.

Para una base nueva, créala desde Aiven y ejecuta database/schema.sql en esa base usando MySQL Workbench o DBeaver. Configura la conexión con SSL y el certificado CA. No ejecutes DROP ni borres tablas existentes.

## 3. Crea el servicio de Render

En Render selecciona New > Web Service y conecta el repositorio 11mariahuezo/Oak-English.

- Branch: la rama donde subiste estos cambios.
- Language o Runtime: Docker.
- Root Directory: vacío si los archivos están en la raíz del repositorio.
- Dockerfile Path: ./Dockerfile.
- Docker Command: vacío (el Dockerfile ya define el arranque).
- Health Check Path: /health.php.
- Elige el plan que prefieras; revisa sus condiciones actuales antes de confirmar.

No crees un Static Site: necesitas ejecutar PHP. No se requieren Build Command ni Start Command de Node.

## 4. Variables en Render > Environment

| Variable | Valor |
| --- | --- |
| APP_ENV | production |
| DB_HOST | Host exacto de Aiven, sin https:// |
| DB_PORT | Puerto exacto de Aiven; no asumas 3306 |
| DB_USER | Usuario de Aiven |
| DB_PASSWORD | Contraseña NUEVA de Aiven |
| DB_NAME | Nombre real de tu base de datos |
| DB_SSL_CA | /etc/secrets/ca.pem |

En Environment > Secret Files agrega un archivo llamado ca.pem y pega el contenido completo del certificado descargado, incluidos BEGIN CERTIFICATE y END CERTIFICATE. No agregues ca.pem a GitHub. Al arrancar, el contenedor copia el CA fuera de la carpeta pública para que Apache pueda leerlo.

Guarda la configuración y despliega. Si el servicio ya había iniciado, realiza un nuevo despliegue después de guardar el certificado y las variables.

render.yaml también permite usar un Blueprint, pero debes agregar el Secret File manualmente. La ruta manual anterior es suficiente.

## 5. Prueba tu sitio

1. Abre https://TU-SERVICIO.onrender.com/health.php: debe mostrar {"status":"ok"}. Esta prueba confirma PHP, no la conexión a la base.
2. Abre la raíz del sitio y completa el registro.
3. Confirma que aparecen filas en usuarios y perfil_aprendizaje.
4. Abre /logout.php y vuelve a entrar en /login.php.
5. Confirma que /home.php muestra la portada y que sin sesión redirige a login.php.
6. Comprueba que /database/schema.sql y /conexion.php no sean accesibles por navegador.

Si aparece Database temporarily unavailable, revisa las variables, el certificado, el estado del servicio Aiven y sus restricciones de acceso por IP. Si restringiste IP, permite las direcciones de salida del servicio Render.

Si el registro devuelve Unable to create account, revisa que ambas tablas tengan las columnas que usa register.php y que rol tenga valor por defecto usuario. Consulta los logs de Render.

## Cambios incluidos

- Docker con PHP 8.3, Apache y mysqli; escucha el puerto indicado por Render.
- Conexión mysqli mediante variables y SSL con verificación del certificado.
- Respuestas de conexión sin exponer contraseña ni detalles internos.
- Corrección de rutas js/ a JS/ para Linux y enlaces de login/registro.
- home.php ahora muestra home.html después de verificar la sesión. Apache dirige home.html a home.php.
- Registro guarda el perfil local, usa una transacción para usuario/perfil y devuelve errores JSON.
- Cookies de sesión HttpOnly, SameSite y Secure en producción; regeneración al iniciar sesión.
- Exclusión de Git, contraseñas locales y certificados de la imagen Docker.
- Bloqueo web de archivos de configuración y SQL.

## Límites y pendientes

No se ejecutó PHP ni una compilación Docker en este entorno porque no están instalados. Se verificó la sintaxis JavaScript modificada, el script de arranque y las rutas locales. No se probó una conexión a Aiven, no se importó SQL y no se desplegó en Render.

Persisten enlaces a páginas que no estaban en el ZIP: a2-exercises.html, a2-topics.html, b1-b2-grammar.html, b1-exercises.html, b1-topics.html, b2-exercises.html, b2-topics.html, grammar-games.html, topic-simple-present.html y videos.html. Necesitan contenido o una decisión sobre qué página deben abrir.

Solo la portada tiene control de sesión en servidor. Las demás páginas HTML siguen accesibles directamente. Varias funciones usan almacenamiento del navegador: este trabajo no añade sincronización de progreso entre dispositivos.

Las sesiones están en el contenedor; un reinicio o despliegue puede cerrar la sesión. Para múltiples instancias, se necesita almacenamiento compartido de sesiones.

## Documentación oficial

- https://render.com/docs/docker
- https://render.com/docs/configure-environment-variables
- https://render.com/docs/docker-secrets
- https://aiven.io/docs/products/mysql/howto/connect-with-php
