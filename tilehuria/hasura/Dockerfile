FROM hasura/graphql-engine:v1.3.0.cli-migrations-v2
ENV HASURA_GRAPHQL_MIGRATIONS_DIR=/migrations
ENV HASURA_GRAPHQL_METADATA_DIR=/metadata
COPY migrations /migrations
COPY metadata /metadata

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["graphql-engine", "serve"]