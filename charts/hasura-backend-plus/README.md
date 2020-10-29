# Hasura Backend Plus Helm Chart

This chart will install Postgresql, Minio, Hasura and Hasura Backend Plus (HBP).

It will also create the default Traefik routes to HBP and Hasura with a valid Let's Encrypt certificate managed by cert-manager.

## TL;DR

```sh
helm repo add platydev https://charts.platy.dev
helm install my-release platydev/hasura-backend-plus
```

## Introduction

This chart bootstraps a Hasura-Backend-Plus deployment on a Kubernetes cluster using the Helm package manager. Its default installation comes with Hasura GraphQL Engine and PostgreSQL, as well as Minio. Ingress routes can be activated in enabling Traefik routes, that is ready to work with Let's Encrypt certificates and cert-manager.

## Requirements

- Kubernetes 1.12+
- Helm v3.3.4+
- PV provisioner support in the underlying infrastructure (for PostgreSQL and Minio persistence)
- If activating Ingress routes:
  - Traefik v2.3.1+ installed with CRDs (for ingress routes)
  - Cert-manager v1.0.3+ installed with CRDs (for Let's Encrypt Certificates)
  - DNS records pointing to your routes

## Installing the Chart

To install the chart with the release name my-release:

```sh
helm repo add platydev https://charts.platy.dev
helm install my-release platydev/hasura-backend-plus
```

The command deploys Hasura-Backend-Plus, PostgreSQL and Minio on the Kubernetes cluster in the default configuration. The [Parameters](#Parameters) and [Hasura-Backend-Plus Parameters](#) sections list the parameters that can be configured during installation.

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

| Parameter                        | Description                                                                                                                             | Default                     |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `global.ingress.enabled`         |                                                                                                                                         | `false`                     |
| `global.ingress.tls.enabled`     |                                                                                                                                         | `false`                     |
| `global.ingress.domain`          |                                                                                                                                         | `nil`                       |
| `global.ingress.tls.environment` |                                                                                                                                         | `production`                |
| `imageConfig.repository`         |                                                                                                                                         | `nhost/hasura-backend-plus` |
| `imageConfig.pullPolicy`         |                                                                                                                                         | `IfNotPresent`              |
| `imageConfig.tag`                | Overrides the image tag                                                                                                                 | `latest`                    |
| `ingress.enabled`                |                                                                                                                                         | `false`                     |
| `ingress.hosts`                  |                                                                                                                                         | `[]`                        |
| `ingress.tls.enabled`            |                                                                                                                                         | `false`                     |
| `ingress.tls.environment`        |                                                                                                                                         | `production`                |
| `hasura.enabled`                 | Embed Hasura into the chart. <br/> If not, you must set `hasura.endpoint`, `hasura.adminSecret` and `auth.jwt` from your Hasura config. | `true`                      |
| `hasura.endpoint`                | External endpoint (including `/v1/graphql` suffix) <br/> Required when Hasura is not embedded.                                          | `nil`                       |
| `hasura.adminSecret`             | Required when Hasura is not embedded                                                                                                    | `nil`                       |
| `hasura.*`                       | Any other Hasura chart parameter                                                                                                        | default Charts values       |
| `minio.enabled`                  | Include a Minio service into the chart and connect it to storage endpoints.                                                             | `true`                      |
| `minio.defaultBuckets`           |                                                                                                                                         | `hasura-plus`               |
| `minio.accessKey.password`       | autogenerated if none                                                                                                                   | `nil                        |
| `minio.secretKey.password`       | autogenerated if none                                                                                                                   | `nil`                       |
| `minio.*`                        | Any other parameters from the official Bitnami Minio Helm Chart.                                                                        | default Charts values       |
| `storage.external.enabled`       | Uses an external S3 endpoint rather than embedding Minio                                                                                | `false`                     |
| `storage.external.endpoint`      | Ignored when `minio.enabled` is set to `true`.                                                                                          | `nil`                       |
| `storage.external.accessKey`     | Ignored when `minio.enabled` is set to `true`.                                                                                          | `nil`                       |
| `storage.external.secretKey`     | Ignored when `minio.enabled` is set to `true`.                                                                                          | `nil`                       |
| `storage.external.bucket`        | Ignored when `minio.enabled` is set to `true`.                                                                                          | `hasura-plus`               |
| `storage.external.ssl`           | Ignored when `minio.enabled` is set to `true`.                                                                                          | `true`                      |

## Hasura-Backend-Plus parameters

The following table lists the configurable Hasura-Backend-Plus parameters of the chart and their default values.

| Parameter                                    | Description                                                                                                                                                  | Default                                                                                                                      |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `autoMigrate`                                |                                                                                                                                                              | `true`                                                                                                                       |
| `serverUrl`                                  |                                                                                                                                                              | `nil`                                                                                                                        |
| `storage.enabled`                            | Activates HBP storage endpoints. Requires either `minio.enabled` or `storage.external.enabled` to be true                                                    | `true`                                                                                                                       |
| `storage.rules`                              | Custom HBP [storage rules](https://nhost.github.io/hasura-backend-plus/configuration.html#storage-rules)                                                     | `nil`([Default HBP storage rules](https://github.com/nhost/hasura-backend-plus/blob/master/custom/storage-rules/rules.yaml)) |
| `limiter.maxRequests`                        |                                                                                                                                                              | `1000 `                                                                                                                      |
| `limiter.timeFrame`                          |                                                                                                                                                              | `900000`                                                                                                                     |
| `emails.enabled`                             |                                                                                                                                                              | `false`                                                                                                                      |
| `emails.smtp.host`                           |                                                                                                                                                              | `nil`                                                                                                                        |
| `emails.smtp.port`                           |                                                                                                                                                              | `587`                                                                                                                        |
| `emails.smtp.secure`                         |                                                                                                                                                              | `false`                                                                                                                      |
| `emails.smtp.user`                           |                                                                                                                                                              | `nil`                                                                                                                        |
| `emails.smtp.sender`                         |                                                                                                                                                              | `nil`                                                                                                                        |
| `emails.smtp.authMethod`                     |                                                                                                                                                              | `PLAIN`                                                                                                                      |
| `emails.smtp.password`                       |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.enabled`                               | Activates HBP storage endpoints.<br/>Requires either `hasura.enabled` to be true or `hasura.endpoint`, `hasura.adminSecret` and `auth.jwt` to be configured. | `true`                                                                                                                       |
| `auth.localUsers`                            |                                                                                                                                                              | `true`                                                                                                                       |
| `auth.changeEmail`                           |                                                                                                                                                              | `true`                                                                                                                       |
| `auth.notifyEmailChange`                     |                                                                                                                                                              | `false`                                                                                                                      |
| `auth.anonymousUsers`                        |                                                                                                                                                              | `false`                                                                                                                      |
| `auth.allowUserSelfDelete`                   |                                                                                                                                                              | `false`                                                                                                                      |
| `auth.verifyEmails`                          |                                                                                                                                                              | `false`                                                                                                                      |
| `auth.lostPassword`                          |                                                                                                                                                              | `false`                                                                                                                      |
| `auth.registration.allowedEmailDomains`      |                                                                                                                                                              | `[]`                                                                                                                         |
| `auth.registration.defaultUserRole`          |                                                                                                                                                              | `user`                                                                                                                       |
| `auth.registration.defaultAnonymousRole`     |                                                                                                                                                              | `anonymous`                                                                                                                  |
| `auth.registration.autoActivateNewUsers`     |                                                                                                                                                              | `true`                                                                                                                       |
| `auth.registration.hibp`                     |                                                                                                                                                              | `false`                                                                                                                      |
| `auth.registration.registrationCustomFields` |                                                                                                                                                              | `[]`                                                                                                                         |
| `auth.registration.minPasswordLength`        |                                                                                                                                                              | `3`                                                                                                                          |
| `auth.registration.defaultAllowedRoles`      |                                                                                                                                                              | auth.registration.defaultUserRole                                                                                            |
| `auth.cookies.secret`                        | Autogenerated if none                                                                                                                                        | `nil`                                                                                                                        |
| `auth.cookies.secure`                        |                                                                                                                                                              | `false`                                                                                                                      |
| `auth.cookies.sameSite`                      | Options: `true`, `false`, `lax`, `strict`, `none`                                                                                                            | `lax`                                                                                                                        | ` |
| `auth.jwt.algorithm`                         | Fetched from Hasura config map when `hasura.enabled` is set to `true`. <br/>Possible values: `HS256`, `HS384`, `HS512`, `RS256`, `RS384`, `RS512`            | `HS256`                                                                                                                      |
| `auth.jwt.key`                               | Fetched from Hasura sercrets when `hasura.enabled` is set to `true`. Otherwise autogenerated if `null`.                                                      | `nil`                                                                                                                        |
| `auth.jwt.claims.namespace`                  | Fetched from Hasura config map config when `hasura.enabled` is set to `true`.                                                                                | `'https://hasura.io/jwt/claims'`                                                                                             |
| `auth.jwt.expires.in`                        |                                                                                                                                                              | `15`                                                                                                                         |
| `auth.jwt.expires.refresh`                   |                                                                                                                                                              | `43200`                                                                                                                      |
| `auth.jwt.customFields`                      |                                                                                                                                                              | `[]`                                                                                                                         |
| `auth.mfa.enabled`                           |                                                                                                                                                              | `true`                                                                                                                       |
| `auth.mfa.issuer`                            |                                                                                                                                                              | `HBP`                                                                                                                        |
| `auth.providers.redirect.success`            |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.redirect.error`              |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.github.enabled`              |                                                                                                                                                              | `false `                                                                                                                     |
| `auth.providers.github.clientId`             |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.github.clientSecret`         |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.github.authenticationUrl`    |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.github.tokenUrl`             |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.github.userProfileUrl`       |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.google.enabled`              |                                                                                                                                                              | `false `                                                                                                                     |
| `auth.providers.google.clientId`             |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.google.clientSecret`         |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.facebook.enabled`            |                                                                                                                                                              | `false `                                                                                                                     |
| `auth.providers.facebook.clientId`           |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.facebook.clientSecret`       |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.linkedin.enabled`            |                                                                                                                                                              | `false `                                                                                                                     |
| `auth.providers.linkedin.clientId`           |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.linkedin.clientSecret`       |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.windowsLive.enabled`         |                                                                                                                                                              | `false `                                                                                                                     |
| `auth.providers.windowsLive.clientId`        |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.windowsLive.clientSecret`    |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.twitter.enabled`             |                                                                                                                                                              | `false `                                                                                                                     |
| `auth.providers.twitter.consumerKey`         |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.twitter.consumerSecret`      |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.apple.enabled`               |                                                                                                                                                              | `false `                                                                                                                     |
| `auth.providers.apple.clientId`              |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.apple.teamId`                |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.apple.keyId`                 |                                                                                                                                                              | `nil`                                                                                                                        |
| `auth.providers.apple.privateKey`            |                                                                                                                                                              | `nil`                                                                                                                        |

## Configuration and installation details

### Configuring Hasura

A child [Hasura Helm chart](https://github.com/platyplus/platyplus/tree/master/charts/hasura) is embedded by default.

If you want to connect to an existing Hasura instance, you must set the following parameters in your `values.yaml` file:

```yaml
auth:
  enabled: true # default
  jwt:
    algorithm: HS256 # defaults to HS256. Possible values: HS256, HS384, HS512, RS256, RS384, RS512
    key: my-jwt-key-that-will-be-stored-as-a-secret
    claims:
      namespace: 'https://hasura.io/jwt/claims' # set as default
hasura:
  enabled: false
  endpoint: https:my-existing-endpoint/v1/graphql
  adminSecret: my-hasura-admin-secret-that-will-be-stored-as-a-secret
```

JWT parameters are only required if you plan to use the auth endpoints,
and of course that you plan to authenticate users in this Hasura instance from JWT tokens generated by HBP.

### Configuring Minio/S3

A child [Bitnami Minio Helm chart](https://github.com/bitnami/charts/tree/master/bitnami/minio) is embedded by default.

If you want to use storage endpoints and connect to an existing S3-compatible instance, you must set the following parameters in your `values.yaml` file:

```yaml
storage:
  enabled: true # default
  external:
    enabled: true
    endpoint: 'my-s3-endpoint.com'
    accessKey: my-s3-access-key-that-will-be-stored-as-a-secret
    secretKey: my-s3-secret-key-that-will-be-stored-as-a-secret
    bucket: hasura-plus # default
    ssl: true # default
```

### Securing traffic using TLS

### Use of global variables

### Expose service with Ingress

## Contribute

This chart may not fit with your needs yet, as some options may still be missing, or may need further documentation. Don't hesitate to open an issue of to ask your questions through [Discord](https://discord.gg/Bez8xY).
