# Development Principles

## Reuse code

- monorepo
- npm packages
- helm charts
- share services accross projects

## Version

- Git
- Semver
- Conventional changelog

### Conventionnal commits

Recommended to install `git-cz` globally.

Otherwise accessible locally with `yarn cz`

### Git hooks

Husky

### Tags

## Format & syntax

- Prettier

  `yarn format` and `yarn format-check`

  Prettier formats will be checks prior to any `git push`. If it fails, the pending commits won't be push to the git origin.

- ESLint
  `yarn lint-fix` and `yarn lint`

  Staged files will be linted with `lint-staged` before any commit, and will cancel the commit if it fails.

- Comments

## Document
