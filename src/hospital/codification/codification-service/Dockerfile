FROM node:20.11.1
WORKDIR /app
COPY . .
RUN npm install

ENV DB_HOST=codification-db
ENV DB_USER=root
ENV DB_PASSWORD=root
ENV DB_DATABASE=forza

EXPOSE 8080
CMD ["npm", "start"]