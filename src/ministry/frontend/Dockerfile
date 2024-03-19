FROM node:20.11.1-slim as build
WORKDIR /app

# Install dependencies
COPY package.json /app
RUN npm install

# Copy source code & build
COPY . /app
RUN npm run build

# Deploy through nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000