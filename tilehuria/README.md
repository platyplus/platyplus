# TileHuria

TileHuria - a map tiles proxy

## Production

### Requirements

- A Kubernetes cluster.
- A DNS domain name.
- The [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) Kubernetes client.
- [Helm](https://helm.sh/docs/intro/install/).

### Create and connect to the cluster

You can run a cheap Kubernetes cluster on [Digital Ocean](https://www.digitalocean.com/docs/kubernetes/how-to/create-clusters/).

### Install Traefik

```sh
helm install traefik traefik \
  --repo https://charts.platyplus.io \
  --namespace traefik \
  --create-namespace
```

Check if you have access to the dashboard. First, forward the pod to a local port:

```sh
kubectl port-forward -n traefik $(kubectl get pods -n traefik --selector "app.kubernetes.io/name=traefik" --output=name) 9000:9000
```

Then you can check [http://127.0.0.1:9000/dashboard/](http://127.0.0.1:9000/dashboard/). Don't forget the trailing backslash...

### Install cert-manager

```sh
helm install cert-manager cert-manager \
  --repo https://charts.platyplus.io \
  --namespace cert-manager \
  --create-namespace \
  --version v0.15.2
```

Verify cert-manager installation:

```sh
kubectl get pods --namespace cert-manager
```

### Get IP bound to traefik, and update your DNS records

TODO: how to get the IP with kubectl

Given a `example.com` domain name, you must create a A record pointing to Traefik for the following hosts:

- example.com
- hasura.example.com
- hbp.example.com

### Install Tilehuria

```sh
helm install tilehuria tilehuria \
    --repo https://charts.platyplus.io
```

## Development

### Prerequisites

- Node 14
- Docker engine
- Hasura CLI

### Installation

```sh
git clone https://github.com/plmercereau/tilehuria
cd tilehuria
cp .env.example .env
# ATTENTION: change the values in the .env file you just created !!!
yarn install
```

### Run the stack

```sh
docker-compose up -d
yarn dev
```

Any change in the schema must be done through the Hasura console, that can be started in running `hasura console`.

## TODO

- ? Are zoom levels really part of the aoi or the tile set?
- ? what png compression means? How does it work? See https://sharp.pixelplumbing.com/api-output#png
- ! In dev, the tsconfig microservices are somehow linked. On a general basis, it is not properly configured
- case insensitive fields e.g. when ordering the list of tile providers

### Features

- upload mbtiles. see above
- set a progress system when generating the aoi's coordinates. To do so:
  - [ ] estimate the number of tiles from the aoi boundaries and the zoom levels

#### Frontend

- Area of Interest
  - import GeoJSON file
  - map buttons:
    - fullscreen
  - updated_at + subscribe to more
  - author
- Tileset
  - [ ] edit tileset from aoi screen
- Navigation
  - page titles
  - [ ] reproduce/fix the login/refresh token bug
  - confirm when logout
  - [ ] fancy home page
    - unauthenticated
    - authenticated -> redirect to aoi list?
- Tile Providers
  - to be considered: when changing the slug, change the object keys and the mbtile files
  - modify name
  - modify url (only if it has no tileset?)

#### Backend

- Why is rabbitmq restarted on evey helm upgrade???
- Selected tiles don't corver AOI entirely
- get one tile per zoom level that found no tile, until reaching the given minZoom
- get single tile: re-download after a certain period of time?
- get single tile: compare with the existing tile. If the downloaded tile is of better quality, replace the tile.
  - Set a `quality` metadata field when creating the tile (from an mbtile). Then if quality < 100, re-download
  - but what if we want to generate mbtiles without downloading anything more than what's already in the server?
- ? split aoi source update / tileset update -> when finishing the aoi coordinates calculation from source, save the source, that will trigger an aoi xyz coordinates updates, that will queue tile set updates if some exist
- Clean yarn cache in every Node image

### Refactor/performance

- rename event hooks
- [ ] Lerna package to use "@platyplus" packages e.g. gis etc
- remove unused Hasura actions in hooks
- GH action: build/deploy only when changes in the service
- move the frontend app to a dedicated directory

### Done

- [x] nicer AOI list with more info. Delete button when no tile set
- [x] validate the polygon being edited when saving the aoi
- [x] start subscription after creating a new item (1. create 2. subscribe to updates)
- [x] Reopen rabbitmq channel when closed!
- [x] create new aoi: use the same interface as the 'update' one
- [x] remove components and pages that are not used anymore (e.g. new aoi, new tileset etc)
- [x] zoom level 20
- [x] if format=png and quality=100 then don't run the image transformation when generating the mbtiles file
- [x] generic single item
- [x] generic item list
- [x] review the size limit of events sent to the hook service
- [x] navigation guards
- [x] edit aoi: zoom levels
- [x] center aoi on map
- [x] edit AOI source with leaflet
- Tile Sets
  - [x] create new tileset from aoi screen
- Tile Providers
  - [x] delete (only if it has no tileset)
  - [x] "copy" link of the local server
  - [x] list providers as cards

### Next

- package the server to automate local installation
- talk about user permissions with Ivan
- include a mapathon module?
- GH action: staging environment
