FROM golang:1.22-alpine3.19
WORKDIR /app

# Expose the port 80
EXPOSE 80

# Set default command
CMD ["go", "run", "main.go"]

# Install dependencies
COPY go.mod .
COPY go.sum .
RUN go mod download

# Copy source code
COPY . /app