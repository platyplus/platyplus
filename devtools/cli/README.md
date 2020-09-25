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
platy <command>

Commands:
  platy init <name> [organisation]  initialize new monorepo
  platy skaffold <project>          run `skaffold dev`
  platy create                      create new [project|package]
  platy sync <project>              synchronise project files. Create/update skaffold, and overrides dockerfiles
  platy list projects               list all available projects in the current monorepo
  platy completion                  Generate the autocompletion scripts

Options:
  --help     Show help  [boolean]
  --version  Show version number  [boolean]
```
