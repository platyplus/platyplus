FROM node:14-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY tsconfig*.json ./
COPY src src
RUN yarn build

FROM node:14-alpine
ENV NODE_ENV=production
RUN apk add --no-cache tini
WORKDIR /usr/src/app
RUN chown node:node .
USER node
COPY package*.json ./
RUN yarn && yarn cache clean
COPY --from=builder /usr/src/app/dist/ dist/
EXPOSE 3000
CMD [ "/sbin/tini","--", "node", "dist/index.js" ]