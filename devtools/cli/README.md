# `Devtools`

Platy DevTools

## Requirements

- Skaffold
- Kubernetes (kubectl)
- Helm
- Lerna

Depending on the services you would use:

- Hasura CLI
- Quasar CLI

## Installation

```sh
npm i -g @platyplus/devtools
```

## Project configuration

## Usage

```
Commands :
  platy skaffold <project>                              Runs skaffold for the given project
  platy package create <name> <dirname> [description]   Creates a Typescript package boilerplate
  platy sync                                            Generates the files required by all the services.
                                                      Overrides them if they already exist
Options :
  --help     Prints help  [boolean]
  --version  Prints version number [booléen]
```
