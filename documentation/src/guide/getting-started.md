# Getting started
## Prerequisites

## Installation

```
yarn global add @platyplus/devtools
```
The Platyplus DevTools CLI is now installed. You can run it with the `platy` command line.

Most of the sub-commands are taking multiple arguments. You can either ask the syntax in adding `--help` to the command you want to use, or run the command without arguments: it will either print help on the command, or prompt you the missing information. [Find out more about the Platy CLI](../cli).

## Initialise a monorepo
```sh
platy init <my-repo>
cd <my-repo>
```

## Create a project

```sh
platy create project
```

## Create a service
What are services? -> put in the CLI section
- Helm charts
- Source cde
- versionning
- routes
- Dockerfiles


```sh
platy create service
```
Three services are available out of the box:
- Hasura. It will create the structure of a typical Hasura project with migrations and metadata. When running in development mode, it will load the Hasura console and automatic open it in your browser. In development mode, changes will be saved in the service directory, while the production Dockerfile is set to embed the required migrations and metadata in a container.
- Hasura-backend-plus (HBP). When creating the service, it will check if an Hasura service is already present in the project. If yes, it will ask you to connect HBP and this Hasura service together. It will also load the HBP migrations and metadata into the Hasura service.
- Quasar. It will create a standard Quasar SPA project, that will be ready to work either in your development cluster (webpack-based `quasar dev` mode) or in your production cluster as a static file server by an NGINX pod.

## Create a package
```sh
platy create package
```

## Development
```sh
platy dev
```
Attention: localhost
## Versionning
```sh
yarn run version
```
## Publishing packages
```sh
yarn run publish
```
## Building images

## Deployment
