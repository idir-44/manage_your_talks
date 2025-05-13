FROM golang:1.23-alpine
RUN apk update && \
    apk add ca-certificates && \
    rm -rf /var/cache/apk/*

WORKDIR /app

COPY . .
RUN go mod download && \
    go mod verify

CMD ["go", "run", "cmd/server/main.go"]

# TODO: make a multi-stage docker file for production
