# `Devtools`

Platyplus DevTools

## Requirements

- Skaffold
- Kubernetes
- Helm
- Lerna

## Installation

```sh
npm i -g @platyplus/devtools
```

## Project configuration

## Usage

```
Commands :
  pdt skaffold <project>                             Runs skaffold for the given project
  pdt package create <name> <dirname> [description]  Creates a Typescript package boilerplate
  pdt sync                                           Generates the files required by all the services. Overrides them if they already exist
Options :
  --help     Prints help  [boolean]
  --version  Prints version number [booléen]
```
