# TODO

- [ ] validate Hasura options e.g. log levels etc
- [ ] CORS domains: from ingress routes?
- [ ] move configuration (environment variables) into a config-map
- [ ] replace {{ .Release.name }}-chartname by {{ $fullname }}
- [ ] JWT options: jwk_url, claims_namespace_path, claims_format, audience, issuer. Reflect in HBP as well
      https://hasura.io/docs/1.0/graphql/core/auth/authentication/jwt.html#configuring-jwt-mode
- [ ] HASURA_GRAPHQL_AUTH_HOOK, HASURA_GRAPHQL_AUTH_HOOK_MODE
      https://hasura.io/docs/1.0/graphql/core/deployment/graphql-engine-flags/reference.html
- [ ] change way of loading migrations/metadata when helm 3.5 is released (01/2021)
      https://github.com/helm/helm/issues/3276
- [ ] helm hooks for migrations/metadata. In particular upgrade/rollback hooks
      initContainer? Batch/Job?
      save the last migration number in config-map
      PR hasura-cli-migrations docker to add a MIGRATIONS_VERSION env var (something like that)
- [ ] generic ingress
