# Roadmap

## Step 1b: HBP Helm Charts

- [ ] HBP README: expose Hasura endpoint as well
- [ ] Main website cleanup - remove charts tab and link to artifacthub
- [ ] Publish chart in awesome Hasura

## Step 2: DevTools MVP

- [ ] `platy init`
  - warns when something required is not installed e.g. skaffold, helm, node version, what else?
- [ ] Document: Getting started
- [ ] Document: Hasura+HBP recipe
- [ ] Document: CLI API (README.md)
- [ ] Document: attention: use of subdomain.localhost. Works with Chrome, but not with Firefox (etc)
- [ ] devtools & other package.json: add keywords
- [ ] packages: update READMe.md
- [ ] Update Tilehuria README.md
  - [ ] split todo list to TODO.md
  - [ ] change deployment prodecure
  - [ ] Explain limitations and why it's here
- [ ] rename `platy skaffold` to `platy dev`

## Next

- [ ] create/develop/build a service outside of a project?
- [ ] yargs: auto-complete project names
- [ ] In production dockerfiles: `yarn cache clean`? See how it's done in the official HBP repo
- [ ] Better handling of microservice name/alias
- [ ] `.platy.yaml`: use the k8s terminology with `kind: platyplus/project`, `name: project name` ?
- [ ] Minimal `package.json` template - too verbose for now
- [ ] Use `tsdx`?
- [ ] review TODOs in the code
- [x] Helm Charts repo: keep history (older chart versions) -> chartmuseum
  - [x] platydev cluster
  - [x] terraform: review + publish module
  - [ ] argocd that deploys applications (chartmuseum)
- [ ] Tilehuria worker is not an http server -> allow port deactivation in the standard-service chart
- [ ] Add testing to package/service/project/monorepo templates
- [ ] PostgreSql HA https://github.com/bitnami/charts/tree/master/bitnami/postgresql-ha
- [ ] Improve Helm Chart production/development values
- [ ] GitHub actions: always use yarn and docker cache
- [ ] "Writing dockerfile" -> change log message: `project/service` instead of `service`, and `Syncing` instead of `Writing`

## Later

- [ ] `values.schema.json` in Helm Charts, and other artifacthub annotations
- [ ] platy version: generate `CHANGELOG.md`
- [ ] optimise generated dockerfiles - use common layers? -> see latest skaffold release
- [ ] rabbitmq docker, helm & template?
- [ ] hasura init container: wait for postgres
- [ ] hbp init container: wait for hasura (and for minio?)
- [ ] standard init container: wait for connected services
- [ ] move templates to the root folder?
- [ ] vite template -> `serviceTypeConfig.command = "yarn create {{xyz}}"`
- [ ] review monorepo template
- [ ] `post-install @platyplus/devtools`: launch the script to check/warn dependencies -> https://www.npmjs.com/package/which
- [ ] when fetching HBP metadata/migrations:
  - `git clone --filter` only the required directories
  - copy only sql files of the migrations (Hasura config v1), not the yaml files (Hasura config 1)
- [ ] create shared Helm charts e.g. to generate Hasura JWT secret etc.

## Parked

- [ ] Vetur errors -> monitor the new Vetur releases
  - See: https://github.com/vuejs/vetur/issues/815
- [ ] Solve the PostgreSQL password change problem, e.g. in a pre upgrade hook batch?
  - See: https://github.com/bitnami/charts/issues/2061
- [ ] Preserve yaml comments
  - indepth look at the documentation of the currently used `yaml` package
  - E.g. https://www.npmjs.com/package/yawn-yaml
- [ ] Include external files (Helm 3.5)
  - Install/upgrade/rollback Hasura migrations
  - Use it for HBP configuration files
  - As a result: remove Hasura & HBP dockerfiles in devtools
  - Then, move helm directory to the project directory?
  - Then, review HBP template and functionning with storage rules embedded in `values.yaml`
  - See: https://github.com/helm/helm/issues/3276
