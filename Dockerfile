FROM php:8.3-apache
RUN docker-php-ext-install mysqli && a2enmod rewrite
COPY deploy/apache.conf /etc/apache2/conf-available/oak.conf
COPY deploy/php.ini /usr/local/etc/php/conf.d/oak.ini
RUN a2enconf oak
COPY . /var/www/html/
COPY deploy/start.sh /usr/local/bin/oak-start
RUN chmod +x /usr/local/bin/oak-start
EXPOSE 10000
CMD ["oak-start"]
