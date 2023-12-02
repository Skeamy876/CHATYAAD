FROM node:19-alpine3.16 AS builder
WORKDIR /app
COPY  package.json  package-lock.json  /app/
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.3
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build/ .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]



