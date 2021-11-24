# Platyplus Helm Chart

If not available already, install an Ingress controller:

```sh
helm install --namespace kube-system nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx
```

Then install the chart

```sh
helm install my-release platyplus --namespace default \
  --repo https://charts.platy.plus \
  --set global.ingress.enabled=true \
  --set global.ingress.domain=127.0.0.1.nip.io
```

## Hasura console

```sh
export HASURA_GRAPHQL_ADMIN_SECRET=$(kubectl get secrets my-release-hasura \
  -o jsonpath='{.data.adminSecret}' | base64 --decode)
export HASURA_GRAPHQL_ENDPOINT=http://hasura.127.0.0.1.nip.io
export HASURA_GRAPHQL_VERSION=3
touch config.yaml
hasura console
```
