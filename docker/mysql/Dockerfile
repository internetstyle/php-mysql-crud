FROM mysql

ENV MYSQL_DATABASE=php-mysql-crud-db \
    MYSQL_ROOT_PASSWORD=umasenhaqualquer

ADD schema.sql /docker-entrypoint-initdb.d

EXPOSE 3306