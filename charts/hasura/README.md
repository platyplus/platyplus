# Hasura GraphQL Engine Helm Chart

[Hasura GraphQL Engine](https://hasura.io) is a blazing-fast GraphQL server that gives you **instant, realtime GraphQL APIs over Postgres**, with [webhook triggers](https://github.com/hasura/graphql-engine/blob/master/event-triggers.md) on database events, and [remote schemas](https://github.com/hasura/graphql-engine/blob/master/remote-schemas.md) for business logic.

## TL;DR

```sh
helm repo add platydev https://charts.platy.dev
helm install my-release platydev/hasura
```

## Introduction

This chart bootstraps a Hasura deployment on a Kubernetes cluster using the Helm package manager. It embedds a PostgreSQL database by default. Ingress routes can be activated in enabling Traefik routes, that is ready to work with Let's Encrypt certificates and cert-manager.

## Prerequisites

- Kubernetes 1.12+
- Helm 3
- PV provisioner support in the underlying infrastructure (for PostgreSQL persistence)
- If activating Ingress routes:
  - Traefik, including its Custom Resource Definitions, installed on your cluster (for ingress routes)
  - DNS records pointing to your routes

## Installing the Chart

To install the chart with the release name my-release:

```sh
helm repo add platydev https://charts.platy.dev
helm install my-release platydev/hasura
```

The command deploys Hasura and PostgreSQL on the Kubernetes cluster in the default configuration. The [Parameters](#Parameters) and [Hasura parameters](#Hasura-parameters) sections list the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the my-release deployment:

```sh
helm delete my-release
```

The command removes all the Kubernetes components but PVC's associated with the chart and deletes the release.

To delete the PVC's associated with my-release:

```sh
kubectl delete pvc -l release=my-release
```

Note: Deleting the PVC's will delete postgresql data as well. Please be cautious before doing it.

## Parameters

The following table lists the configurable parameters of the chart and their default values.

| Parameter                        | Description                                                                                                                                                                                        | Default                 |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `global.ingress.enabled`         | Activate Traefik routes in all charts                                                                                                                                                              | `false`                 |
| `global.ingress.domain`          | Global domain name. will create a `<chart-name>.<domain>` route. Default chart name is `hasura`.                                                                                                   | `nil`                   |
| `global.ingress.tls.enabled`     | Add https routes and creates a Let's Encrypt certificate for each route. Requires cert-manager                                                                                                     | `false`                 |
| `global.ingress.tls.environment` | Let's Encrypt environment. Either `staging` or `production`                                                                                                                                        | `production`            |
| `ingress.enabled`                | Activate Traefik route                                                                                                                                                                             | `false`                 |
| `ingress.hosts`                  | DNS names routing to the service e.g. `[{ host: hasura.mywebsite.com }]`                                                                                                                           | `[]`                    |
| `ingress.tls.enabled`            | Add https to each for each `ingress.hosts`route and creates a Let's Encrypt certificate                                                                                                            | `false`                 |
| `ingress.tls.environment`        | Let's Encrypt environment. Either `staging` or `production`                                                                                                                                        | `production`            |
| `postgresql.enabled`             | Include a Bitnami PostgreSQL child chart                                                                                                                                                           | `true`                  |
| `postgresql.image.tag`           |                                                                                                                                                                                                    | `12.3.0`                |
| `postgresql.postgresqlDatabase`  |                                                                                                                                                                                                    | `hasura`                |
| `postgresql.postgresqlPassword`  | **ATTENTION** if value changed when upgrading chart, postgres will still use the old password as it is persisted.<br/> See [following chapter](#Changing-PostgreSQL-password) for further details. | autogenerated           |
| `postgresql.*`                   | Any parameter available in the Bitnami PostgreSQL Helm Chart                                                                                                                                       |                         |
| `pgClient.external.enabled`      | If `postgresql.enabled` is set to false, determine access to an external Postgres database                                                                                                         | `false`                 |
| `pgClient.external.host`         |                                                                                                                                                                                                    | `nil`                   |
| `pgClient.external.port`         |                                                                                                                                                                                                    | `5432`                  |
| `pgClient.external.username`     |                                                                                                                                                                                                    | `postgres`              |
| `pgClient.external.password`     |                                                                                                                                                                                                    | `nil`                   |
| `pgClient.external.database`     |                                                                                                                                                                                                    | `hasura`                |
| `imageConfig.pullPolicy`         |                                                                                                                                                                                                    | `IfNotPresent`          |
| `imageConfig.repository`         |                                                                                                                                                                                                    | `hasura/graphql-engine` |
| `imageConfig.tag`                |                                                                                                                                                                                                    | Helm chart app version  |

## Hasura parameters

The following table lists the [configurable Hasura parameters](https://hasura.io/docs/1.0/graphql/core/deployment/graphql-engine-flags/reference.html) of the chart and their default values.

| Parameter                                | Hasura server ENV variables                                                                       | Default                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `adminInternalErrors`                    | HASURA_GRAPHQL_ADMIN_INTERNAL_ERRORS                                                              | `true`                                                 |
| `adminSecret`                            | HASURA_GRAPHQL_ADMIN_SECRET                                                                       | autogenerated                                          |
| `allowList.enabled`                      | HASURA_GRAPHQL_ENABLE_ALLOWLIST                                                                   | `false`                                                |
| `console.enabled`                        | HASURA_GRAPHQL_ENABLE_CONSOLE                                                                     | `false`                                                |
| `console.assetsDir`                      | HASURA_GRAPHQL_CONSOLE_ASSETS_DIR                                                                 | `/srv/console-assets`                                  |
| `cors.disable`                           | HASURA_GRAPHQL_DISABLE_CORS                                                                       | `false`                                                |
| `cors.domain`                            | HASURA_GRAPHQL_CORS_DOMAIN                                                                        | `["*"]`                                                |
| `devMode`                                | HASURA_GRAPHQL_DEV_MODE                                                                           | `false`                                                |
| `enabledApis`                            | HASURA_GRAPHQL_ENABLED_APIS                                                                       | `['metadata', 'graphql', 'pgdump']`                    |
| `events.fetchInterval`                   | HASURA_GRAPHQL_EVENTS_FETCH_INTERVAL                                                              | `3000000`                                              |
| `events.poolSize`                        | HASURA_GRAPHQL_EVENTS_HTTP_POOL_SIZE                                                              | `100`                                                  |
| `pgClient.connections`                   | HASURA_GRAPHQL_PG_CONNECTIONS                                                                     | `50`                                                   |
| `pgClient.preparedStatements`            | HASURA_GRAPHQL_USE_PREPARED_STATEMENTS                                                            | `true`                                                 |
| `pgClient.stringifyNumericTypes`         | HASURA_GRAPHQL_STRINGIFY_NUMERIC_TYPES                                                            | `false`                                                |
| `pgClient.stripes`                       | HASURA_GRAPHQL_PG_STRIPES                                                                         | `1`                                                    |
| `pgClient.timeout`                       | HASURA_GRAPHQL_PG_TIMEOUT                                                                         | `100`                                                  |
| `pgClient.transactionIsolation`          | HASURA_GRAPHQL_TX_ISOLATION                                                                       | `read-commited`                                        |
| `jwt.algorithm`                          | HASURA_GRAPHQL_JWT_SECRET.type <br/>Options: `HS256`, `HS384`, `HS512`, `RS256`, `RS384`, `RS512` | `HS256`                                                |
| `jwt.key`                                | HASURA_GRAPHQL_JWT_SECRET.key                                                                     | autogenerated                                          |
| `jwt.claims.namespace`                   | HASURA_GRAPHQL_JWT_SECRET.claims_namespace                                                        | autogenerated                                          |
| `liveQueries.multiplexedBatchSize`       | HASURA_GRAPHQL_LIVE_QUERIES_MULTIPLEXED_BATCH_SIZE                                                | `100`                                                  |
| `liveQueries.multiplexedRefetchInterval` | HASURA_GRAPHQL_LIVE_QUERIES_MULTIPLEXED_REFETCH_INTERVAL                                          | `1000`                                                 |
| `log.level`                              | HASURA_GRAPHQL_LOG_LEVEL (debug, info, warn, error)                                               | `info`                                                 |
| `log.types`                              | HASURA_GRAPHQL_ENABLED_LOG_TYPES                                                                  | `['startup','http-log','webhook-log','websocket-log']` |
| `telemetry.enabled`                      | HASURA_GRAPHQL_ENABLE_TELEMETRY                                                                   | `false`                                                |
| `unauthorizedRole`                       | HASURA_GRAPHQL_UNAUTHORIZED_ROLE                                                                  | `anonymous`                                            |
| `wsReadCookie`                           | HASURA_GRAPHQL_WS_READ_COOKIE                                                                     | `false`                                                |

## Configuration and installation details

### Configuring PostgreSQL

There are two ways of connecting Hasura to a PostgreSQL database:

- Install PostgreSQL with this chart (default)
- Configure Hasura to connect to an external PostgreSQL instance

### Configuring embedded PostgreSQL

Link to the chart for further info

### Connecting external PostgreSQL

#### Changing PostgreSQL password

PostgreSQL persists passwords when the persistent volume is created. It means it stored in both Kubernetes secret
and the persistent volume. Any change in the secret won't trigger the change of the postgres password that is stored
in the database volume. If no `postgresql.postgresqlPassword` is given, then the password will be autogenerated
at every helm installation or upgrade.

As a consequence, it is recommended to give a specific `postgresql.postgresqlPassword` in the `values.yaml`,
so the password stored in the secret will match the one initially persisted in the database volume.

If you must change this password, don't forget to change it both in the secret through your Helm Chart values and
in your database through `psql`.

Please see [this issue](https://github.com/bitnami/charts/issues/2061) for furhter information.

### Expose service with Traefik Ingress

### Use of global variables

## Contribute

This chart may not fit with your needs yet, as some options may still be missing, or may need further documentation. Don't hesitate to open an issue of to ask your questions through [Discord](https://discord.gg/Bez8xY).
