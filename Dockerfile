ARG SCOPE
ARG CI=false

FROM node:14-alpine as lerna
USER node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
WORKDIR /home/node
RUN npm i lerna -g --loglevel error
COPY --chown=node:node package.json yarn.* lerna.json tsconfig.json tsconfig.build.json .eslintrc.js .eslintignore ./
ARG CI
ENV CI=$CI

FROM lerna as prepare
ARG SCOPE
COPY . .
# * tar every package.json that is required for the scope
RUN lerna list --scope $SCOPE --all --include-dependencies -p | sed -e "s|$PWD/||g" | awk '{print $0 "/package.json"}' | tar -cf package.json.tar -T -
# * tar everything that is required for the scope
RUN lerna list --scope $SCOPE --all --include-dependencies -p | sed -e "s|$PWD/||g" | tar -cf source.tar -T -

FROM lerna as base
COPY --from=prepare --chown=node:node /home/node/package.json.tar /tmp/package.json.tar
RUN tar xf /tmp/package.json.tar
RUN yarn

# TODO copy source
COPY --from=prepare --chown=node:node /home/node/source.tar /tmp/source.tar
RUN tar xf /tmp/source.tar
# TODO then: either build, or run dev