# TODO

- [ ] move all the configuration (environment variables) into the config-map
- [x] replace {{ .Release.Name }}-chartname by {{ $fullname }}
- [ ] default bucket: split minio.defaultBuckets and pick the first value
- [ ] use external.hasura (when hasura.enabled=false)
- [ ] mount storage rules as a config-map?
- [ ] include jwt key through JWT_KEY_FILE_PATH path.resolve(process.env.PWD || '.', 'custom/keys/private.pem')
      and maybe: autogenerate a pem file that is stored as a secret
- [ ] hasuraConnect and s3Connect won't work with nameOverride
- [ ] validate options e.g. cookies.sameSite
