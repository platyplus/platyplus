# Roadmap

- [ ] many to many
- [ ] basic data validation according to field type
- [ ] required fields
- [ ] review indexes in RxDB
- [ ] realtime metadata: generate RxDB migrations automatically when metadata changes (columns, properties, etc)
- [ ] check if label regenerates when changing its template
- [ ] refactor the way to load table/collection/property components
- [ ] Hasura chart: wait for postrges to be ready
- [ ] HBP Chart: to 2.7
- [ ] HBP Tilt: to 2.7: do not publish (wait for hasura-auth)
- [ ] Platyplus Hasura docker image (include migrations + schema, and GitHub action)
- [ ] Platyplus Nginx docker image (nx build, GitHub action)
- [ ] Platyplus Chart
- [ ] Platyplus Docker-compose
- [ ] HBP chart: wait for hasura to be ready
- [ ] documentation: docusaurus
- [ ] documentation: add guide.md
- [ ] documentation: adjust existing contents
- [ ] Nx & npm semver
- [ ] remove useless code in rxdb-hasura (e.g. document.component())

## Step 1b: HBP Helm Charts

- [ ] Main website cleanup - remove charts tab and link to artifacthub
- [ ] Publish chart in awesome Hasura
- [ ] Document: Getting started
- [ ] Document: Hasura+HBP recipe
- [ ] packages: update README.md
- [ ] clean legacy Helm Charts (artifacthub annotation bug)

## Next

- [ ] Nx and Helm charts?
- [ ] Custom Express/Koa service
- [ ] in every package.json: add keywords
- [ ] review TODOs in the code
- [x] Helm Charts repo: keep history (older chart versions) -> chartmuseum
  - [x] platydev cluster
  - [x] terraform: review + publish module
  - [ ] argocd that deploys applications (chartmuseum)
- [ ] Add testing to package/service/project/monorepo templates
- [ ] PostgreSql HA https://github.com/bitnami/charts/tree/master/bitnami/postgresql-ha
- [ ] Improve Helm Chart production/development values

## Later

- [ ] `values.schema.json` in Helm Charts, and other artifacthub annotations
- [ ] platy version:
  - [ ] generate `CHANGELOG.md`
  - [ ] check if helm version mechanism is correct e.g. `perf` commits are not triggering a version bump while they should
- [ ] rabbitmq docker, helm & template?
- [ ] hasura init container: wait for postgres
- [ ] hbp init container: wait for hasura (and for minio?)
- [ ] standard init container: wait for connected services
- [ ] move templates to the root folder?
- [ ] vite template -> `serviceTypeConfig.command = "yarn create {{xyz}}"`
- [ ] when fetching HBP metadata/migrations:
  - `git clone --filter` only the required directories
  - copy only sql files of the migrations (Hasura config v1), not the yaml files (Hasura config 1)

## Parked

- [ ] Solve the PostgreSQL password change problem, e.g. in a pre upgrade hook batch?
  - See: https://github.com/bitnami/charts/issues/2061
- [ ] Include external files (Helm 3.6)
  - Install/upgrade/rollback Hasura migrations
  - Use it for HBP configuration files
  - As a result: remove Hasura & HBP dockerfiles in devtools
  - Then, move helm directory to the project directory?
  - Then, review HBP template and functionning with storage rules embedded in `values.yaml`
  - See: https://github.com/helm/helm/issues/3276
