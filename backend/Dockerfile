# Use the official PHP image with built-in PHP and Composer
FROM php:8.2-cli

WORKDIR /var/www/html

COPY . .
COPY .env.example .env

RUN apt-get update
RUN  apt-get install -y \
        libpng-dev \
        libjpeg-dev \
        libfreetype6-dev \
        zip \
        unzip
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN composer install
RUN composer dump-autoload --optimize

RUN chown -R www-data:www-data storage bootstrap/cache

RUN php artisan key:generate

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
