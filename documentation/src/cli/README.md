---
sidebar: auto
---

# Platy DevTools Command-line interface

Platy DevTools

## Prerequisites

- Docker >= 19.03.13
- An accessible Kubernetes and `kubectl` installed
- Skaffold >= v1.17
- Helm >= v3.3.4
- Node >= v14.10
- Git >= v2.28
- Yarn >= v1.22.10

Depending on the services you would use:

- Hasura CLI >= v1.3.3
- Quasar CLI >= v1.2.2

## Installation

```
yarn global add @platyplus/devtools
```

The Platyplus DevTools CLI is now installed. You can run it with the `platy` command line.

Most of the sub-commands are taking multiple arguments. You can either ask the syntax in adding `--help` to the command you want to use, or run the command without arguments: it will either print help on the command, or prompt you the missing information. [Find out more about the Platy CLI](../cli).

## Project configuration

## Usage

```
platy <command>

Commands:
  platy dev [project]               run `skaffold dev` for the given project
  platy init [name] [organisation]  create new monorepo
  platy create                      create new [project|package|service]
  platy list                        list [projects|services]
  platy sync [project]              synchronise project files. Create/update skaffold, and overrides dockerfiles
  platy version                     version [project|chart]
  platy completion                  generate completion script

Options:
  --help     Show help  [boolean]
  --version  Show version number  [boolean]
```
