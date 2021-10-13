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
- Helm v3.3.4+
- PV provisioner support in the underlying infrastructure (for PostgreSQL persistence)
- If activating Ingress routes:
  - Traefik v2.3.1+ installed with CRDs (for ingress routes)
  - Cert-manager v1.0.3+ installed with CRDs (for Let's Encrypt Certificates)
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

| Parameter                       | Description                                                                                                                                                                                        | Default                                               |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `ingress.enabled`               | Enable ingress controller resource                                                                                                                                                                 | `false`                                               |
| `ingress.annotations`           | Ingress annotations                                                                                                                                                                                | `[]`                                                  |
| `ingress.labels`                | Ingress labels                                                                                                                                                                                     | `[]`                                                  |
| `ingress.hosts[0].name`         | Hostname for the ingress                                                                                                                                                                           | ``                                                    |
| `ingress.hosts[0].path`         | Path within the url structure                                                                                                                                                                      | ``                                                    |
| `ingress.hosts[0].tls`          | Enable TLS on the ingress host                                                                                                                                                                     | `false`                                               |
| `ingress.hosts[0].tlsSecret`    | TLS secret to use (must be manually created)                                                                                                                                                       | ``                                                    |
| `ingress.hosts[0].serviceName`  | The name of the service to route traffic to.                                                                                                                                                       | <code v-pre>{{ .Values.service.externalPort }}</code> |
| `ingress.hosts[0].servicePort`  | The port of the service to route traffic to.                                                                                                                                                       | <code v-pre>{{ .Values.service.port }}</code>         |
| `ingress.extraPaths[0].path`    | Path within the url structure.                                                                                                                                                                     | ``                                                    |
| `ingress.extraPaths[0].service` | The name of the service to route traffic to.                                                                                                                                                       | ``                                                    |
| `ingress.extraPaths[0].port`    | The port of the service to route traffic to.                                                                                                                                                       | ``                                                    |
| `postgresql.enabled`            | Include a Bitnami PostgreSQL child chart                                                                                                                                                           | `true`                                                |
| `postgresql.image.tag`          |                                                                                                                                                                                                    | `12.3.0`                                              |
| `postgresql.postgresqlDatabase` |                                                                                                                                                                                                    | `hasura`                                              |
| `postgresql.postgresqlPassword` | **ATTENTION** if value changed when upgrading chart, postgres will still use the old password as it is persisted.<br/> See [following chapter](#Changing-PostgreSQL-password) for further details. | autogenerated                                         |
| `postgresql.*`                  | Any parameter available in the Bitnami PostgreSQL Helm Chart                                                                                                                                       |                                                       |
| `pgClient.external.enabled`     | If `postgresql.enabled` is set to false, determine access to an external Postgres database                                                                                                         | `false`                                               |
| `pgClient.external.host`        |                                                                                                                                                                                                    | `nil`                                                 |
| `pgClient.external.port`        |                                                                                                                                                                                                    | `5432`                                                |
| `pgClient.external.username`    |                                                                                                                                                                                                    | `postgres`                                            |
| `pgClient.external.password`    |                                                                                                                                                                                                    | `nil`                                                 |
| `pgClient.external.database`    |                                                                                                                                                                                                    | `hasura`                                              |
| `imageConfig.pullPolicy`        |                                                                                                                                                                                                    | `IfNotPresent`                                        |
| `imageConfig.repository`        |                                                                                                                                                                                                    | `hasura/graphql-engine`                               |
| `imageConfig.tag`               |                                                                                                                                                                                                    | Helm chart app version                                |

## Hasura parameters

The following table lists the [configurable Hasura parameters](https://hasura.io/docs/1.0/graphql/core/deployment/graphql-engine-flags/reference.html) of the chart and their default values.

| Parameter                                | Hasura server ENV variable                                                                        | Default                                                |
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

### Ingress

This chart provides support for ingress resources. If you have an ingress controller installed on your cluster, such as [nginx-ingress](https://hub.kubeapps.com/charts/stable/nginx-ingress) or [traefik](https://hub.kubeapps.com/charts/stable/traefik) you can utilize the ingress controller to expose Hasura.

To enable ingress integration, please set `ingress.enabled` to `true`

#### Hosts

Most likely you will only want to have one hostname that maps to this installation, however, it is possible to have more than one host. To facilitate this, the `ingress.hosts` object is an array. TLS secrets referenced in the ingress host configuration must be manually created in the namespace.

In most cases, you should not specify values for `ingress.hosts[0].serviceName` and `ingress.hosts[0].servicePort`. However, some ingress controllers support advanced scenarios requiring you to specify these values. For example, [setting up an SSL redirect using the AWS ALB Ingress Controller](https://kubernetes-sigs.github.io/aws-alb-ingress-controller/guide/tasks/ssl_redirect/).

#### Extra Paths

Specifying extra paths to prepend to every host configuration is especially useful when configuring [custom actions with AWS ALB Ingress Controller](https://kubernetes-sigs.github.io/aws-alb-ingress-controller/guide/ingress/annotation/#actions).

```shell
helm install --name my-release platydev/hasura \
  --set ingress.enabled=true \
  --set ingress.hosts[0].name=my-release.domain.com \
  --set ingress.extraPaths[0].service=ssl-redirect \
  --set ingress.extraPaths[0].port=use-annotation \
```

#### Annotations

For annotations, please see [this document for nginx](https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/nginx-configuration/annotations.md) and [this document for Traefik](https://docs.traefik.io/configuration/backends/kubernetes/#general-annotations). Not all annotations are supported by all ingress controllers, but this document does a good job of indicating which annotation is supported by many popular ingress controllers. Annotations can be set using `ingress.annotations`.

#### Example Ingress configuration

```shell
helm install --name my-release platydev/hasura \
  --set ingress.enabled=true \
  --set ingress.hosts[0].name=my-release.domain.com \
  --set ingress.hosts[0].path=/
  --set ingress.hosts[0].tls=true
  --set ingress.hosts[0].tlsSecret=my-release.tls-secret
```
