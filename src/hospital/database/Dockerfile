FROM mysql:8.0.35

ENV MYSQL_ROOT_USER=root
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DB=forza

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 3036