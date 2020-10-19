# Tilehuria Helm Chart

## Requirements

- A kubernetes cluster
- Cert-manager 0.15 installed in the `cert-manager` namespace
- Traefik 2 installed in the `traefik` namespace
- DNS records pointing to the cluster:
  - web.example.org
  - hasura-backend-plus.example.org
  - hasura.example.org

## Installation

```sh
helm install tilehuria tilehuria \
    --repo https://charts.platyplus.io
```

## Configuration

Please have a look at the [Helm Chart source](https://github.com/platyplus/charts/tree/master/source/tilehuria) for further configuration.

Note that the RabbitMQ, Postgresql and Minio secrets cannot be updated through Helm once they have been set.
