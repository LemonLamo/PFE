FROM node:20.11.1-slim
WORKDIR /app

# Expose the port 80
EXPOSE 80

# Set default command
CMD ["npm", "start"]

# Install chromium
RUN apt-get update \
    && apt-get install -y wget gnupg ca-certificates \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package.json /app
RUN npm install

# Copy source code
COPY . /app