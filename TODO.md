# Roadmap

## MVP

- [ ] Application
  - [ ] refactor the way to load table/collection/property components
  - [ ] many to many
    - [ ] composite RxDB primary keys -> RxDB 10
  - [ ] required fields
  - [ ] basic data validation according to field type
  - [ ] order menu (-> create something like an `app_config` table)
  - [ ] realtime metadata: generate RxDB migrations automatically when metadata changes (columns, properties, etc)
  - [ ] check if label regenerates when changing its template
  - [ ] field components:
    - [ ] email
- [ ] Docker images
  - [ ] GitHub action
  - [ ] Platyplus Hasura (include migrations + schema)
  - [ ] Platyplus Nginx (nx build, GitHub action)
- [ ] Helm Charts
  - [ ] GitHub action
  - [ ] Platyplus
  - [ ] HBP 2.7
- [ ] Tilt
  - [ ] HBP 2.7: (do not publish - wait until hasura-auth is out)
- [ ] Documentation
  - [ ] docusaurus
  - [ ] GitHub Action
  - [ ] adjust existing contents
  - [ ] add guide.md
  - [ ] Getting started
    - [ ] Dev
      - [ ] Docker-compose
      - [ ] Tilt
    - [ ] Deploy
      - [ ] Docker-compose
      - [ ] Kubernetes
- [ ] make everything work with Pulumi

## Then

- [ ] Nx & npm semver
- [ ] Hasura chart: wait for postrges service to be ready
- [ ] HBP chart: wait for hasura service to be ready
- [ ] validation rules stored on the backend
- [ ] permissions
- [ ] review indexes in RxDB
- [ ] searchable collections
- [ ] custom menus
  - [ ] for everyone / per role / per user
  - [ ] filtered collections
- [ ] online demo(s)?
- [ ] components
  - [ ] cards
  - [ ] calendar
  - [ ] time period (from-to)
  - [ ] charts
  - [ ] maps & PostGIS
    - [ ] point field: location/single dot
    - [ ] collection / many2one: polygon, multiple dots
  - [ ] icon
  - [ ] avatar
  - [ ] complete every field component
    - [ ] ipv4 ipv6
    - [ ] hostname
    - [ ] object
    - [ ] array
    - [ ] uri
- [ ] remove useless code in rxdb-hasura (e.g. document.component())
- [ ] Main website cleanup - remove charts tab and link to artifacthub
- [ ] Publish chart in awesome Hasura
- [ ] packages: update README.md
- [ ] clean legacy Helm Charts (artifacthub annotation bug)

## Next

- [ ] pagination
- [ ] Isomorphic validation
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
- [ ] Hasura Auth
  - [ ] Helm Chart
  - [ ] Tilt module
