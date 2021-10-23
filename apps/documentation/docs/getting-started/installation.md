---
id: installation
title: Installation
sidebar_label: Installation
slug: /guide
---

# Installation

## Kubernetes

If not available already, install an Ingress controller:

```bash
helm install --namespace kube-system nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx
```

Set a DNS domain that points to your cluster. If working locally, you can use <a href="https://nip.io/" target="_blank">Nip</a>:

```bash
export PLATYPLUS_DOMAIN=127.0.0.1.nip.io
```

Then install the chart:

```bash
helm install my-release platyplus --namespace default \
  --repo https://charts.platy.plus \
  --set global.ingress.domain=127.0.0.1.nip.io
```

### Hasura console

```bash
export HASURA_GRAPHQL_ADMIN_SECRET=$(kubectl get secrets my-release-hasura \
  -o jsonpath='{.data.adminSecret}' | base64 --decode)
export HASURA_GRAPHQL_ENDPOINT=http://hasura.127.0.0.1.nip.io
export HASURA_GRAPHQL_VERSION=3
touch config.yaml
hasura console
```

<!--
## Docker-compose

TODO:

- wget docker-file
- set env: DNS, admin secret, endpoint, hasura version
- docker-compose up -d
- touch config.yaml
- hasura console

## Tilt -->
