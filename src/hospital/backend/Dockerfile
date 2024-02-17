FROM node:21
RUN mkdir /app
WORKDIR /app
ADD src/* /app
RUN npm install
EXPOSE 8082
CMD ["npm", "start"]