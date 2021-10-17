# TODO

- [ ] validate Hasura options e.g. log levels etc
- [ ] CORS domains: from ingress routes?
- [ ] move configuration (environment variables) into a config-map
- [ ] replace {{ .Release.name }}-chartname by {{ $fullname }}
- [ ] JWT options: jwk_url, claims_namespace_path, claims_format, audience, issuer. Reflect in HBP as well
      https://hasura.io/docs/1.0/graphql/core/auth/authentication/jwt.html#configuring-jwt-mode
- [ ] change way of loading migrations/metadata when helm 3.5 is released (01/2021)
      https://github.com/helm/helm/issues/3276
- [ ] helm hooks for migrations/metadata. In particular upgrade/rollback hooks
- [ ] handle migrations for multiple databases
- documentation
  - tar -cvf migrations.tar -C migrations .
  - kubectl create configmap migrations --from-file=migrations.tar
  - rm migrations.tar
  - .Values.migrations.configMaps.<unique-name> = { name: migrations, file: migrations.tar }
  - same thing for metadata (except that it accepts only one configmap value)
