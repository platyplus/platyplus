# TODO

- [ ] default bucket: split minio.defaultBuckets and pick the first value
- [ ] hasuraConnect and s3Connect won't work with nameOverride -> copy fullname methods
- [ ] validate options e.g. cookies.sameSite
- [x] move all the configuration (environment variables) into the config-map
- [x] replace {{ .Release.Name }}-chartname by {{ $fullname }}
- [x] mount storage rules as a config-map?
- [x] storage rules in chart
- [x] rename storage-rules volume to config-files and change paths accordingly
- [x] hasura.enabled set to true

## Parked

- [ ] Include external files (Helm 3.5)
  - See: https://github.com/helm/helm/issues/3276
  - [ ] HBP email templates
  - [ ] storage.rulesPath
  - [ ] load hbp migrations/metadata through Helm instead of AUTO_MIGRATE
  - [ ] include jwt key through JWT_KEY_FILE_PATH path.resolve(process.env.PWD || '.', 'custom/keys/private.pem')
        and maybe: autogenerate a pem file that is stored as a secret
