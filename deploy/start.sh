#!/bin/sh
set -eu
PORT="${PORT:-10000}"
case "$PORT" in ''|*[!0-9]*) echo 'Invalid PORT' >&2; exit 1;; esac
sed -i "s/^Listen 80$/Listen ${PORT}/" /etc/apache2/ports.conf
sed -i "s/<VirtualHost \*:80>/<VirtualHost *:${PORT}>/" /etc/apache2/sites-available/000-default.conf
# Copy the CA outside the document root so Apache can read it.
if [ -n "${DB_SSL_CA:-}" ] && [ -r "$DB_SSL_CA" ]; then
    install -d -m 0755 /var/lib/oak
    install -m 0644 "$DB_SSL_CA" /var/lib/oak/ca.pem
    export DB_SSL_CA=/var/lib/oak/ca.pem
fi
exec apache2-foreground
