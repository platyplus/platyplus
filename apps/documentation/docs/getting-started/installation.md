---
id: installation
title: Installation
sidebar_label: Installation
slug: /guide
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import CodeBlock from '@theme/CodeBlock';

# Installation

## Tilt (recommended)

### Prerequisites

- [Tilt](https://docs.tilt.dev/install.html)
- [Helm](https://helm.sh/docs/intro/install/)
- [Docker](https://docs.docker.com/get-docker/)
- A Kubernetes cluster. It can for instance be activated locally when using Docker Desktop

### Prepare the project

<CodeBlock className="language-shell">{`mkdir my-project \ncd my-project\nwget ${useBaseUrl('/examples/Tiltfile', {absolute: true})} `}</CodeBlock>

### Start the development stack

```shell
tilt up
```

You can now open the Tilt interface to monitor the services status.
The frontend app will start on [http://localhost:4200](http://localhost:4200) and the Hasura console on [http://localhost:9695](http://localhost:9695).

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

-->
