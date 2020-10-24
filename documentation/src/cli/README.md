---
sidebar: auto
---

# Platy DevTools Command-line interface

Platy DevTools

Work In Progress

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
  platy skaffold [project]  run `skaffold dev`
  platy create              create new [repo|project|package|service]
  platy sync <project>      synchronise project files. Create/update skaffold, and overrides dockerfiles
  platy list projects       list all available projects in the current monorepo
  platy completion          generate completion script

Options:
  --help     Show help  [boolean]
  --version  Show version number  [boolean]
```
