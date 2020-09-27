FROM node:14-alpine AS builder
ARG HOSTNAME=tilehuria.platyplus.io
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/dist/spa /usr/share/nginx/html
