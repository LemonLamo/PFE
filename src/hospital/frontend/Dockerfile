FROM nginx:1.25.3
COPY src /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY conf/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080