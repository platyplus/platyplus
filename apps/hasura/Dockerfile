ARG TAG=latest
FROM hasura/graphql-engine:${TAG}.cli-migrations-v3
COPY apps/hasura/metadata /hasura-metadata
COPY apps/hasura/migrations /platyplus-migrations
ENV HASURA_GRAPHQL_MIGRATIONS_DIR=/platyplus-migrations

# * User should be able to use platyplus-hasura image
# * and mount /hasura-metadata (with merged metadata) and /hasura-migration (with custom tables etc)
# TODO copy custom 'user-defined' migrations https://www.reddit.com/r/docker/comments/o1xb3a/docker_copy_merge_src_and_dest/
# TODO tester