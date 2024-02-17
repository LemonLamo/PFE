FROM nginx:1.25.3
RUN rm /etc/nginx/conf.d/default.conf
COPY conf/ /etc/nginx/
COPY ssl/ /etc/ssl/

EXPOSE 8080