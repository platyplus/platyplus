FROM node:12-alpine as lerna-base
RUN apk add --no-cache jq
RUN npm i lerna -g --loglevel error
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
ARG SERVICE
ENV SERVICE $SERVICE
COPY --chown=node:node package.json yarn.lock lerna.json tsconfig.json tsconfig.build.json .eslintrc.js .eslintignore ./
# TODO
# COPY --chown=node:node packages /home/node/app/packages
COPY --chown=node:node $SERVICE/package.json $SERVICE/yarn.lock /home/node/app/$SERVICE/

FROM lerna-base as builder
RUN lerna bootstrap --ignore-scripts
COPY --chown=node:node . .
RUN lerna run build

FROM lerna-base as dependencies
RUN cat $SERVICE/package.json | jq '. * {workspaces: {nohoist: ["**"]}}' > $SERVICE/package.json
RUN lerna bootstrap --ignore-scripts -- --production --no-optional
RUN tar -cf /home/node/dependencies.tar $SERVICE/node_modules $SERVICE/package.json $SERVICE/yarn.lock

FROM node:12-alpine as run
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
EXPOSE 3000
ARG SERVICE
ENV SERVICE $SERVICE
COPY --from=dependencies /home/node/dependencies.tar /tmp
RUN tar -xf /tmp/dependencies.tar
COPY --from=builder /home/node/app/$SERVICE/dist /home/node/app/$SERVICE/dist
CMD cd $SERVICE && yarn production

