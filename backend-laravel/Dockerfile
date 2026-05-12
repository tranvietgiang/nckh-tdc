FROM php:8.2-apache

# Cài thư viện cần thiết
RUN apt-get update && apt-get install -y \
    git curl zip unzip \
    libpng-dev libonig-dev libzip-dev

# PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring zip

# Bật rewrite Apache
RUN a2enmod rewrite

# Laravel chạy đúng /public
RUN sed -i 's#/var/www/html#/var/www/html/public#g' /etc/apache2/sites-available/000-default.conf

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy source
COPY . .

# Install Laravel packages
RUN composer install

# =========================
# PERMISSION (PHẦN ÔNG CẦN)
# =========================
RUN chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache || true

# Port Apache
EXPOSE 80

CMD ["apache2-foreground"]