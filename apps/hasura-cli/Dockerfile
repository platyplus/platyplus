ARG TAG=latest
FROM alpine:3.14.2
RUN apk add --no-cache bash curl
ARG VERSION=v2.0.9
RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | VERSION=${VERSION} bash
RUN hasura plugins install cli-ext
