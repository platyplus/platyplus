# Incubator application

Application showcasing work in progress.

## Work in progress

Stack: Hasura + Hasura Backend Plus + Vue 3 + RxDB

## Installation

### Prepare you `values.yaml` file

Assuming your kubernetes ingress is set to handle https routes for `mydomain.com`:

```yaml
hbp:
  ingress:
    hosts:
      - name: hbp.mydomain.com
        tls: true
hasura:
  imageConfig:
    repository: platyplus/hasura-vue # Hasura docker image with correct migrations/metadata
    tag: latest
    pullPolicy: Always
  ingress:
    hosts:
      - name: hasura.mydomain.com
        tls: true
vue:
  imageConfig:
    repository: platyplus/incubator-vue # Nginx docker image
    tag: latest
    pullPolicy: Always
  ingress:
    hosts:
      - name: www.mydomain.com
        tls: true
  configFile:
    values:
      HBP_ENDPOINT: https://hbp.mydomain.com
      HASURA_ENDPOINT: https://hasura.mydomain.com
```

```sh
helm repo add platydev https://charts.platy.dev
helm install my-incubator platydev/incubator
```
