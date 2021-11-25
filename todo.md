## MVP

- [ ] Application
  - [ ] small demo
- [ ] tilt / demo
- [ ] Documentation
  - [ ] Configuration guide
    - [ ] 'basic'
    - [ ] extend Platyplus
  - DB design guide
    - [ ] onUpdate -> document it out, and primary keys should not change
    - [ ] document restrict and no action behave in the same way
  - [ ] Installation guide / getting started
    - [ ] Dev
      - [ ] Docker-compose
    - [ ] Deploy
      - [ ] Docker-compose
      - [ ] Kubernetes
  - [ ] Technical documentation
    - [ ] Schema on how RxDB starts (auth/jwt, metadata, config, contents...)
    - [ ] readme for every Helm chart
    - [ ] readme for evey NPM package
    - [ ] contribute
  - [ ] boilerplate / template project (tilt/docker-compose)
  - [ ] correct documentation links in artifacthub

## MVP 2

- Application
  - [ ] improve performance
  - [ ] password change
  - [ ] avatar picker (image-url component)
  - [ ] many2one/object as radio
  - [ ] one2many/array as checkboxes
  - [ ] embedded/nested relationships in forms, for instance
    - [ ] ??? non nullable FK means it is nested, e.g. visit.patient_id is not nullable means visit is part of the patient
          therefore a visit can be added from the patient form?
    - [ ] patient->visits->new in a `Modal` or even as part of the patient form
    - [ ] details of patient->visits as part of the patient form
  - [ ] Define C(R)UD tables/fields/relationships/permissions from the app?
  - [ ] filter collections, and save filter to backend (in the menu configuration)
  - [ ] paginate collections
  - [ ] only update modified fields in the zustand form store?
        only send modified fields in the replication mutation?
  - **Bugs**
    - [ ] can remove if FK constraint `on delete` is `set null` but fk is not nullable - same with `set default` with no default
    - [ ] refetch the entire collection when new columns/relationships are added
    - [ ] if an user has permissions to add a m2m, but not to remove, then it will see the option to add a deleted item, while it won't be pushed (no permission to update the `deleted` column)
    - [ ] RichText not updating with props.value changes (problem in the `Editable` component)
- [ ] easynut demo
- [ ] review and use bitnami common template features e.g. secrets
- [ ] Solve the PostgreSQL password change problem, e.g. in a pre upgrade hook batch?
  - See: https://github.com/bitnami/charts/issues/2061
- [ ] nhost sdk2
- [ ] rsuite 5
      are CSS variables available?
- [ ] HASURA_GRAPHQL_ENABLE_TELEMETRY=false
- [ ] answer, solve & close GH issues
- [ ] update hasura (and other?) chart readme e.g. no traefik anymore

## Post-MVP

- Application
  - [ ] monitor connection from navigation.online + replication statuses + ?
    - [ ] do not update 'realtime', but every second?
    - [ ] add a badge (+ toast?) when connected/disconnected
    - [ ] hide configuration actions when disconnected?
  - [ ] remove one2many (and many2many?) item: when FK cannot be set to null/default BUT referenced item can be deleted, then delete it
  - [ ] don't show 'admin' features when offline? -> don't allow saving them. Persist zustand store
  - [ ] deactivate login/register forms when network is down - useNetworkStatus
  - [ ] WS reconnecting: don't try to connect when offline
  - [ ] set registration/login/home config in `config.json` - and then link to HBP config in the platyplus chart
  - [ ] option to deactivate offline mode, somehow in `config.json`?
  - [ ] user activation by email
    - [ ] reset password
  - [ ] WS too many attempts (one per collection - too much when x collections)
  - [ ] nullable values vs default values vs form values
  - [ ] work on form validation rules
    - [ ] Postgres domain e.g. email
    - [ ] number/string min/max
    - [ ] varchar(x) -> validate string length < x
    - [ ] something else stored in `property_config`
      - [ ] frontend validation
      - [ ] backend validation?
  - [ ] computed properties
    - [ ] transient / generated on-the-fly
    - [ ] locally persisted
    - [ ] isomorphic
  - [ ] some components:
    - [ ] one2one
      - [ ] update sync of reverse relationship
    - [ ] maps & PostGIS
      - [ ] point field: location/single dot
      - [ ] collection / many2one: polygon, multiple dots
    - [ ] complete every field component
      - [ ] ipv4 / ipv6
      - [ ] hostname
      - [ ] object
      - [ ] array
      - [ ] uri
    - http://127.0.0.1nip.io and chrome://flags/#unsafely-treat-insecure-origin-as-secure
  - [ ] change chrome tab title (like `app_name | page_title` instead of `app_title` only)
- [ ] review `nx version` & `nx publish`

## Then

- Application
  - [ ] handle relationships like rxdb-utils views
  - [ ] multi-role
    - [ ] link-reverse: when a document is modified in a role collection, it must be reflected to other roles...
    - [ ] config module only covers one role - see pages/config/table.tsx
      - [ ] => fetch only one me_metadata table for all roles???
    - [ ] (multi-role bug) push/pull replication: add the current hasura-role to the headers
  - [ ] list Hasura features to be mapped to RxDB e.g.
    - [ ] details on permissions
  - [ ] permissions
  - [ ] add Hasura permissions to create/update/remove permissions
- Hasura Schema sharing? (https://hasura.io/events/hasura-con-2021/talks/hasura-schema-sharing/)
- Charts
  - [ ] Hasura: wait for postrges service to be ready
  - [ ] HBP: wait for hasura service to be ready
  - [ ] Publish chart in awesome Hasura
- [ ] Nx & npm semver
- [ ] online demo(s)?
- [ ] Main website cleanup - remove charts tab and link to artifacthub
- [ ] packages: update README.md
- [ ] https://stackoverflow.com/questions/57927115/anyone-know-a-way-to-delete-a-workflow-from-github-actions/65374631#65374631
- [ ] review TODOs in the code

## Next

- Application
  - [ ] map GraphQL metadata views and tables with camelCase
  - [ ] push only columns that have changed
  - [ ] map custom GraphQL names vs PostgreSQL names
  - [ ] unique columns or sets of columns: tricky. in a hook? don't forget to index. See https://github.com/pubkey/rxdb/issues/728
- Charts
  - [ ] argocd that deploys applications (chartmuseum)
  - [ ] Nx and Helm charts?
  - [ ] Improve Helm Chart production/development values
  - [ ] PostgreSql HA https://github.com/bitnami/charts/tree/master/bitnami/postgresql-ha
- [ ] Custom Express/Koa service
- [ ] in every package.json: add keywords

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
- [ ] clean legacy Helm Charts (artifacthub annotation bug): download old tar.gz files, remove annotation, re-package upload, move back to the right S3 storage

## Parked

- [ ] Hasura Auth
  - [ ] Helm chart
    - [ ] latest Alpine version - see https://artifacthub.io/packages/helm/platyplus/hasura-backend-plus?modal=security-report
  - [ ] Tilt extension
- [ ] dark/light mode: store in user profile?
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
- [ ] get rid of nx `docker-publish` target when `nx run-many` will accept tags - see https://github.com/nrwl/nx/issues/2675 and https://github.com/nrwl/nx/pull/4557
