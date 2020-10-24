# TODO

- [ ] validate Hasura options e.g. log levels etc
- [ ] CORS domains: from ingress routes?
- [ ] move configuration (environment variables) into a config-map
- [ ] replace {{ .Release.name }}-chartname by {{ $fullname }}
- [ ] JWT options: jwk_url, claims_namespace_path, claims_format, audience, issuer. Reflect in HBP as well
      https://hasura.io/docs/1.0/graphql/core/auth/authentication/jwt.html#configuring-jwt-mode
- [ ] HASURA_GRAPHQL_AUTH_HOOK, HASURA_GRAPHQL_AUTH_HOOK_MODE
      https://hasura.io/docs/1.0/graphql/core/deployment/graphql-engine-flags/reference.html
