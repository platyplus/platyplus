# Roadmap

## Step 1b: HBP Helm Charts

- [ ] HBP README: expose Hasura endpoint as well
- [ ] Main website cleanup - remove charts tab and link to artifacthub
- [ ] Publish chart in awesome Hasura

## Step 2: DevTools MVP

- [ ] Sync somehow the Helm version/app-version of the project chart. Ideally, bump automatically
  - For the moment: get the highest version numbers from the services.
    // TODO conventional-recommended-bump -p angular --commit-path tilehuria/helm -v
    // TODO conventional commit also on any helm-related directory (follow file://)
    // TODO git tag
    // TODO : standard-version or semantic-release
  - According to bumps of child NPM packages? Scrappy... not conviced
    - list what changed: lerna ls --since master
    - something changed in the project services -> app version bump (+chart version bump?)
    - something changed in the project helm directory -> chart version bump
  - Best approach:
    - git tag with the project name
    - scan the commits in
      - project helm chart dir
      - project services
      - chart dependencies?
      - NPM dependencies?
    - generate a standard version from it
      - update the Chart version
      - update the chart changelog (see artefacthub approach)
      - git tag
    - See:
      - conventional-recommended-bump
      - conventional-commits-parser ?
      - conventional-changelog ?
- [ ] Docker image CI pipeline
  - [ ] Make generic for all projects in creating `platy list services [project] [--all]` and adapting the GH action accordingly
  - [ ] Filter projects with no changes
  - [ ] use another tag stragegy (checksum) but continue using latest as well
- [ ] Include lerna in PDT dependencies
- [ ] monorepo config e.g.:
  - organisation name for default package names?
  - default packages directory?
  - `platy create monorepo` (create lerna, base tsconfigs, default @org/package directory, warns when something required is not installed e.g. skaffold, helm...)
- [ ] Document: Getting started
- [ ] Document: Hasura+HBP recipe
- [ ] Document: CLI API
- [ ] Test CLI from npm installation
- [ ] Document: attention: use of subdomain.localhost. Works with Chrome, but not with Firefox (etc)

## Next


- [ ] In production dockerfiles: yarn cache clean? See how it's done in the official HBP repo
- [ ] Better handling of microservice name/alias
- [ ] .platy.yaml: use the k8s terminology with kind: platyplus/project, name: project name ?
- [ ] Minimal package.json template - too verbose for now
- [ ] Use tsdx?
- [ ] review TODOs in the code
- [x] Helm Charts repo: keep history (older chart versions) -> chartmuseum
  - [x] platydev cluster
  - [x] terraform: review + publish module
  - [ ] argocd that deploys applications (chartmuseum)
- [ ] Tilehuria worker is not an http server -> allow port deactivation in the standard-service chart
- [ ] Add testing to package/service/project/monorepo templates
- [ ] PostgreSql HA https://github.com/bitnami/charts/tree/master/bitnami/postgresql-ha
- [ ] Improve Helm Chart production/development values
- [ ] Helm charts changes annotations. See [this example](https://github.com/artifacthub/hub/blob/master/charts/artifact-hub/Chart.yaml)

## Later

- [ ] values.schema.json in Helm Charts
- [x] traefik/cert-manager: use a single certificate with dns challenges?
- [ ] optimise generated dockerfiles - use common layers? -> see latest skaffold release
- [ ] rabbitmq docker, helm & template?
- [ ] hasura init container: wait for postgres
- [ ] hbp init container: wait for hasura (and for minio?)
- [ ] standard init container: wait for connected services
- [ ] move templates to the root folder?
- [ ] vite template -> serviceTypeConfig.command = "yarn create {{xyz}}"
- [ ] review monorepo template
- [ ] post-install @platyplus/devtools: launch the script to check/warn dependencies -> https://www.npmjs.com/package/which
- [ ] when fetching HBP metadata/migrations:
  - git clone --filter only the required directories
  - copy only sql files of the migrations (Hasura config v1), not the yaml files (Hasura config 1)
- [ ] create shared Helm charts e.g. to generate Hasura JWT secret etc.
- [ ] for each chart of the 'charts' directory, when 'repository' starts with 'file://', automatically set the right 'version'

## Parked

- [ ] Vetur errors -> monitor the new Vetur releases
  - See: https://github.com/vuejs/vetur/issues/815
- [ ] Solve the PostgreSQL password change problem, e.g. in a pre upgrade hook batch?
  - See: https://github.com/bitnami/charts/issues/2061
- [ ] Preserve yaml comments
  - E.g. https://www.npmjs.com/package/yawn-yaml
- [ ] Include external files (Helm 3.5)
  - Install/upgrade/rollback Hasura migrations
  - Use it for HBP configuration files
  - As a result: remove Hasura & HBP dockerfiles in devtools
  - Then, move helm directory to the project directory?
  - Then, review HBP template and functionning with storage rules embedded in values.yaml
  - See: https://github.com/helm/helm/issues/3276
