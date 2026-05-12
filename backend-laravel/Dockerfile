FROM php:8.2-apache

# Cài thư viện cần thiết
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev

# Cài extension PHP cho Laravel
RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip

# Bật rewrite Apache
RUN a2enmod rewrite

# Cài Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Thư mục project
WORKDIR /var/www/html

# Copy source code
COPY . .

# Cài package Laravel
RUN composer install

# Phân quyền
RUN chmod -R 775 storage bootstrap/cache

# Mở port
EXPOSE 80

# Chạy Apache
CMD ["apache2-foreground"]