# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [1.1.3](https://github.com/platyplus/platydev/compare/charts-hasura@1.1.2...charts-hasura@1.1.3) (2021-11-18)



## [1.1.2](https://github.com/platyplus/platydev/compare/charts-hasura@1.1.1...charts-hasura@1.1.2) (2021-11-14)


### Bug Fixes

* same HASURA_GRAPHQL_ENABLED_APIS default as Hasura ([1f99edc](https://github.com/platyplus/platydev/commit/1f99edc056c4b38802028bf1b75c5792ee192f11))
* use networking.k8s.io/v1 ingress ([b153143](https://github.com/platyplus/platydev/commit/b153143331f81adc8f47c35584f9dcd4cb706a82)), closes [#17](https://github.com/platyplus/platydev/issues/17)



## [1.1.1](https://github.com/platyplus/platydev/compare/charts-hasura@1.1.0...charts-hasura@1.1.1) (2021-11-08)

### Bug Fixes

- specify jwk_url instead of key+type in Hasura helm chart ([66be084](https://github.com/platyplus/platydev/commit/66be0843ed481e993c0c1dfc36ae8a1bb0787f25)), closes [#16](https://github.com/platyplus/platydev/issues/16)

# [1.1.0](https://github.com/platyplus/platydev/compare/charts-hasura@0.1.8...charts-hasura@1.0.0) (2021-10-17)

### Features

- globally configurable ingress route ([16a7aa3](https://github.com/platyplus/platydev/commit/16a7aa34c922cb6ec1f8b3604fa69822e1120a0e))

# [1.0.0](https://github.com/platyplus/platydev/compare/charts-hasura@0.1.8...charts-hasura@1.0.0) (2021-10-17)

### Code Refactoring

- upgrade postgresql helm chart ([2522cdd](https://github.com/platyplus/platydev/commit/2522cddc8ebdf699669315723ccf03c0a48550b6))

### Features

- globally configurable ingress route ([16a7aa3](https://github.com/platyplus/platydev/commit/16a7aa34c922cb6ec1f8b3604fa69822e1120a0e))
- upgrade to Hasura v2 ([077c70e](https://github.com/platyplus/platydev/commit/077c70ed72bf373df25feaa3a77d55fd1e76aa8b))

### Performance Improvements

- wait for postgresql before starting hasura ([6648da6](https://github.com/platyplus/platydev/commit/6648da63e558c3efee149040d30ea645f40d5e86))

### BREAKING CHANGES

- Please read the official [migration
  instructions](https://hasura.io/blog/migrating-from-hasura-v1-3-to-v2-0/) from the Hasura blog
- Please check the [release
  notes](https://github.com/bitnami/charts/tree/master/bitnami/postgresql#breaking-changes) from the
  official Bitnami Helm Chart before upgrading
