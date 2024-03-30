FROM mysql:8.0.35
COPY init.sql /docker-entrypoint-initdb.d/

ENV MYSQL_ROOT_USER=root
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DB=forza

EXPOSE 3306
