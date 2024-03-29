# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [1.1.6](https://github.com/platyplus/platyplus/compare/charts-hasura@1.1.5...charts-hasura@1.1.6) (2021-11-26)

### Bug Fixes

- correct tls host names ([39d30b4](https://github.com/platyplus/platyplus/commit/39d30b40dca22021f64b90462f64a16d378ae7c3))

## [1.1.5](https://github.com/platyplus/platyplus/compare/charts-hasura@1.1.4...charts-hasura@1.1.5) (2021-11-24)

### Bug Fixes

- disable console assets if consoled is disabled ([dc55d22](https://github.com/platyplus/platyplus/commit/dc55d22e5b44a7f99e9036a1ae33c1dcd11e7226))

## [1.1.4](https://github.com/platyplus/platyplus/compare/charts-hasura@1.1.3...charts-hasura@1.1.4) (2021-11-24)

### Bug Fixes

- bump versions to use more secure docker images ([d839fd1](https://github.com/platyplus/platyplus/commit/d839fd132a5be40d137a36ff661b65d054270b1c))
- correct way of build docker image ([6ad825b](https://github.com/platyplus/platyplus/commit/6ad825b1ff27e2d5df3aa2dfb24cf1925167e031))

## [1.1.2](https://github.com/platyplus/platyplus/compare/charts-hasura@1.1.1...charts-hasura@1.1.2) (2021-11-14)

### Bug Fixes

- same HASURA_GRAPHQL_ENABLED_APIS default as Hasura ([1f99edc](https://github.com/platyplus/platyplus/commit/1f99edc056c4b38802028bf1b75c5792ee192f11))
- use networking.k8s.io/v1 ingress ([b153143](https://github.com/platyplus/platyplus/commit/b153143331f81adc8f47c35584f9dcd4cb706a82)), closes [#17](https://github.com/platyplus/platyplus/issues/17)

## [1.1.1](https://github.com/platyplus/platyplus/compare/charts-hasura@1.1.0...charts-hasura@1.1.1) (2021-11-08)

### Bug Fixes

- specify jwk_url instead of key+type in Hasura helm chart ([66be084](https://github.com/platyplus/platyplus/commit/66be0843ed481e993c0c1dfc36ae8a1bb0787f25)), closes [#16](https://github.com/platyplus/platyplus/issues/16)

# [1.1.0](https://github.com/platyplus/platyplus/compare/charts-hasura@0.1.8...charts-hasura@1.0.0) (2021-10-17)

### Features

- globally configurable ingress route ([16a7aa3](https://github.com/platyplus/platyplus/commit/16a7aa34c922cb6ec1f8b3604fa69822e1120a0e))

# [1.0.0](https://github.com/platyplus/platyplus/compare/charts-hasura@0.1.8...charts-hasura@1.0.0) (2021-10-17)

### Code Refactoring

- upgrade postgresql helm chart ([2522cdd](https://github.com/platyplus/platyplus/commit/2522cddc8ebdf699669315723ccf03c0a48550b6))

### Features

- globally configurable ingress route ([16a7aa3](https://github.com/platyplus/platyplus/commit/16a7aa34c922cb6ec1f8b3604fa69822e1120a0e))
- upgrade to Hasura v2 ([077c70e](https://github.com/platyplus/platyplus/commit/077c70ed72bf373df25feaa3a77d55fd1e76aa8b))

### Performance Improvements

- wait for postgresql before starting hasura ([6648da6](https://github.com/platyplus/platyplus/commit/6648da63e558c3efee149040d30ea645f40d5e86))

### BREAKING CHANGES

- Please read the official [migration
  instructions](https://hasura.io/blog/migrating-from-hasura-v1-3-to-v2-0/) from the Hasura blog
- Please check the [release
  notes](https://github.com/bitnami/charts/tree/master/bitnami/postgresql#breaking-changes) from the
  official Bitnami Helm Chart before upgrading
