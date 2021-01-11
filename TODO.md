# Roadmap

## Wrap up the rxdb stuff

- [ ] Add a vue service
- [ ] Command to set the frontend out of the box
- [ ] Command to load metadata and migrations
- [ ] command to dump `metadata.table_config`, `metadata.property_config` etc

## Step 1b: HBP Helm Charts

- [ ] HBP README: expose Hasura endpoint as well
- [ ] Main website cleanup - remove charts tab and link to artifacthub
- [ ] Publish chart in awesome Hasura

## Step 2: DevTools MVP

- [ ] Document: Getting started
- [ ] Document: Hasura+HBP recipe
- [ ] Document: CLI API (README.md)
- [ ] Document: attention: use of subdomain.localhost. Works with Chrome, but not with Firefox (etc)
- [ ] packages: update README.md
- [ ] GH Action bug when no project. See https://github.com/platyplus/platydev/runs/1495110783?check_suite_focus=true
- [ ] bug with service names that contains '-'
- [ ] values.yaml: use the right imageConfig in values.yaml
  - carefull when a dockerfile exists in dev, but not in prod
- [ ] bug: helm /charts version: when one chart changed, all are versionned
  - Plus, console logs 'chore(release): publish' without the name of the chart...
- [ ] ?? imageConfig: { tag: 'latest', pullPolicy: 'IfNotPresent' }
- [ ] ?? problem with minio in HBP chart - start ok, restart problem

## Clean up some mess

- deactivate/remove/archive
  - Nuxt HBP plugin
  - Nuxt service
- Vue service
  - find a way to use an env var to target HBP and Hasura services - see vue-hasura-backend-plus options
- skaffold sync files: include dependencies in node projects
  - dockerfile dev: watch/build dependencies on each container, or find a way to use the TS source
  - solution: tsconfig-paths-webpack-plugin, but scrappy tsconfig extension, not working with `paths`

## Next

- [ ] In ts package template: `yarn dev` shoud nodemon a `tsc` build
- [ ] avoid restarting the hasura console everytime a service is reloaded - only once
- [ ] Custom Express/Koa service
- [ ] `yarn typecheck` not implemented
- [ ] CLI UX
  - [ ] add a custom message to every inquirer question
  - [ ] start asking sub-commands with inquirer, starting from `platy` with no arguments at all
- [ ] --interactive option to start inquirerjs or not
- [ ] in every package.json: add keywords
- [ ] add TS codegen to Hasura service????
- [ ] get rid of warning workspace-aggregator!
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
- [ ] Add testing to package/service/project/monorepo templates
- [ ] PostgreSql HA https://github.com/bitnami/charts/tree/master/bitnami/postgresql-ha
- [ ] Improve Helm Chart production/development values
- [ ] GitHub actions: always use yarn and docker cache
- [ ] "Writing dockerfile" -> change log message: `project/service` instead of `service`, and `Syncing` instead of `Writing`
- [ ] validate `./types` types

## Later

- [ ] `values.schema.json` in Helm Charts, and other artifacthub annotations
- [ ] platy version:
  - [ ] generate `CHANGELOG.md`
  - [ ] check if helm version mechanism is correct e.g. `perf` commits are not triggering a version bump while they should
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
- [ ] Quasar SSR

## Parked

- [ ] Problem in CHANGELOG.md. See https://github.com/lerna/lerna/issues/2188 and https://github.com/lerna/lerna/issues/2444
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
