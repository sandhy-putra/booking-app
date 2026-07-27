FROM mcr.microsoft.com/devcontainers/php:8.3

RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql pgsql
