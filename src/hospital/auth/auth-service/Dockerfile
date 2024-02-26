FROM node:20.11.1
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
ENV DB_HOST=localhost
ENV DB_USER=root
ENV DB_PASSWORD=root
ENV DB_DATABASE=forza
ENV JWT_PUBLIC_KEY=forza
CMD ["npm", "start"]