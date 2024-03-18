FROM node:20.11.1-slim
WORKDIR /app

# Expose the port 8080
EXPOSE 8080

# Set default command
CMD ["npm", "start"]

# Install dependencies
COPY package.json /app
RUN npm install

# Copy source code
COPY . /app