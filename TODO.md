# Roadmap

## MVP

- [ ] Application
  - [ ] **foreign key constraints**
    - [ ] onDelete constraint
      - [x] m2m specific case
      - [ ] cascade
      - [ ] set null - only when columns are nullable - throw error otherwise
      - [ ] restrict - idem
      - [ ] no action - idem
      - [ ] set default - only when default exists or columns are nullable
    - [ ] canSave - only when fk constraints allow it
    - [ ] onUpdate
    - bug on validating form with a required many2one field: is it related?
  - [ ] **improve online/offline mode** (replication, jwt, logout...) both on dev (memory) and prod (indexeddb)
  - [ ] improve login/register errors and validation
  - [ ] Hasura 2
    - [ ] reactivate cascade delete
    - [ ] bug: refetch the entire collection when new columns/relationships are added
    - [ ] test default values
    - [ ] update Helm chart
    - [ ] update Tilt extension
- [ ] Docker images
  - [ ] GitHub action
  - [ ] Platyplus Hasura (include migrations + schema)
  - [ ] Platyplus Nginx (nx build, GitHub action)
- [ ] Helm Charts
  - [ ] GitHub action
  - [ ] Platyplus
  - [ ] Hasura Auth
- [ ] Hasura Auth Tilt extension
- [ ] Documentation
  - [ ] Docusaurus
  - [ ] GitHub Action
  - [ ] Adjust existing contents
  - [ ] Pitch, main features + feature matric
  - [ ] Main features
  - [ ] Configuration guide
    - [ ] 'basic'
    - [ ] extend Platyplus
  - [ ] Installation guide / getting started
    - [ ] Dev
      - [ ] Docker-compose
      - [ ] Tilt
    - [ ] Deploy
      - [ ] Docker-compose
      - [ ] Kubernetes
  - [ ] Technical documentation
    - [ ] Schema on how RxDB starts (auth/jwt, metadata, config, contents...)
    - [ ] readme for every Docker image
    - [ ] readme for every Helm chart
    - [ ] readme for evey NPM package
    - [ ] contribute
- [ ] make everything work with Pulumi

## MVP 2

- Application
  - [ ] reset/change password
  - [ ] avatar picker (image-url component)
  - [ ] prefix `platyplus_` all the internal collections
  - [ ] home page (pages table, at this stage as a singleton)

## Post-MVP

- Application
  - [ ] destroy database on logout
  - [ ] nullable values vs default values vs form values
  - [ ] work on form validation rules
    - [ ] Postgres domain e.g. email
    - [ ] number/string min/max
    - [ ] varchar(x) -> validate string length < x
    - [ ] something else stored in `property_conig`
      - [ ] frontend validation
      - [ ] backend validation?
  - [ ] collections
    - [ ] search/filter
    - [ ] sort
    - [ ] paginate
  - [ ] computed properties
    - [ ] transient / generated on-the-fly
    - [ ] locally persisted
    - [ ] isomorphic
  - [ ] some components:
    - [ ] one2one
      - [ ] update sync of reverse relationship
    - [ ] email
    - [ ] time
    - [ ] cards
    - [ ] nested relations
    - [ ] calendar
    - [ ] QR code / codebar scanner
    - [ ] time period (from-to)
    - [ ] charts
    - [ ] maps & PostGIS
      - [ ] point field: location/single dot
      - [ ] collection / many2one: polygon, multiple dots
    - [ ] icon
    - [ ] avatar
    - [ ] rich text / markdown
    - [ ] complete every field component
      - [ ] ipv4 / ipv6
      - [ ] hostname
      - [ ] object
      - [ ] array
      - [ ] uri
    - [ ] singletons

## Then

- Application
  - [ ] handle relationships like rxdb-utils views
  - [ ] multi-role
    - [ ] link-reverse: when a document is modified in a role collection, it must be reflected to other roles...
    - [ ] config module only covers one role - see pages/config/table.tsx
      - [ ] => fetch only one me_metadata table for all roles???
    - [ ] (multi-role bug) push/pull replication: add the current hasura-role to the headers
  - [ ] list Hasura features to be mapped to RxDB e.g.
    - [ ] remote schemas
    - [ ] inherited roles
    - [ ] remote relationships
    - [ ] column presets
    - [ ] multiple DBs (mark as out of scope)
    - [ ] details on permissions
  - [ ] permissions
  - [ ] created_at / created_by
  - [ ] review indexes in RxDB
  - [ ] add Hasura permissions to create/update/remove permissions
  - [ ] custom menus
    - [ ] for everyone / per role / per user
    - [ ] filtered collections
  - [ ] automate required permissions and fields e.g. updated_at, id etc on the backend (to simplify adding tables to the application)
  - [ ] Better integration with HBP e.g. registration, password change, OAuth, 2fa...
- Hasura Schema sharing? (https://hasura.io/events/hasura-con-2021/talks/hasura-schema-sharing/)
- Charts
  - [ ] Hasura: wait for postrges service to be ready
  - [ ] HBP: wait for hasura service to be ready
  - [ ] clean legacy Helm Charts (artifacthub annotation bug)
  - [ ] Publish chart in awesome Hasura
- [ ] Nx & npm semver
- [ ] online demo(s)?
- [ ] Main website cleanup - remove charts tab and link to artifacthub
- [ ] packages: update README.md

## Next

- Application
  - [ ] map metadata views and tables with camelCase
  - [ ] push only columns that have changed
  - [ ] internationalisation
  - [ ] conflict resolution
  - [ ] map custom GraphQL names vs PostgreSQL names
  - [ ] encryption
  - [ ] unique columns or sets of columns: tricky. in a hook? don't forget to index. See https://github.com/pubkey/rxdb/issues/728
- Charts
  - [ ] argocd that deploys applications (chartmuseum)
  - [ ] Nx and Helm charts?
  - [ ] Improve Helm Chart production/development values
  - [ ] PostgreSql HA https://github.com/bitnami/charts/tree/master/bitnami/postgresql-ha
- [ ] Custom Express/Koa service
- [ ] in every package.json: add keywords
- [ ] review TODOs in the code

## Later

- [ ] RxDB attachments and hbp storage
- [ ] realtime metadata without reloading the entire collection on every change
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

- [ ] dark/light mode
  - [ ] rsuite next -> when CSS variables are available
  - [ ] from device's defaults
  - [ ] store in localstorage
  - [ ] store in the backend?
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
