# Platyplus Pulumi package

## Configure Digital Ocean credentials

```sh
pulumi config set digitalocean:token --secret <DO_TOKEN>
```

When uing spaces e.g. in the Chartmuseum Helm Charts registry:

```sh
pulumi config set digitalocean:spacesAccessId --secret <DO_SPACES_ACCESS_ID>
pulumi config set digitalocean:spacesSecretKey --secret <DO_SPACES_SECRET_KEY>
```

## Configure your clusters

<!-- TODO See https://www.pulumi.com/docs/guides/crossguard/ -->

See `Pulumi.example.yaml` and the `ClusterConfig` type in `packages/types.ts`

```sh
pulumi config set --path 'clusters.<cluster-name>.appServices.helmRegistry.basicAuth.username' --secret chartmuseum
pulumi config set --path 'clusters.<cluster-name>.appServices.helmRegistry.basicAuth.password' --secret Pilette1
```
