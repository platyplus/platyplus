# Hasura Backend Plus Helm Chart

This chart will install Postgresql, Minio, Hasura and Hasura Backend Plus (HBP).

It will also create the default traefik routes to HBP and Hasura with a valid Let's Encrypt certificate.

## Requirements

- A kubernetes cluster
- Cert-manager 0.15 installed in the `cert-manager` namespace
- Traefik 2 installed in the `traefik` namespace
- DNS records pointing to the cluster:
  - hbp.example.org
  - hasura.example.org

## Installation

```sh
helm install hbp hasura-backend-plus \
    --repo https://charts.platy.dev
```

## Configuration

Please have a look at the [Helm Chart source](https://github.com/platyplus/charts/tree/master/source/hasura-backend-plus) for further configuration.

Note that the Postgresql and Minio secrets cannot be changed through Helm once they have been set.
