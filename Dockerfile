FROM php:8.0-apache as base
COPY ./backend /var/www/html
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli