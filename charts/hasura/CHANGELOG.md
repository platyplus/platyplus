# Changelog
# [1.0.0](https://github.com/platyplus/platydev/compare/charts-hasura@0.1.8...charts-hasura@1.0.0) (2021-09-22)


### Code Refactoring

* upgrade postgresql helm chart ([2522cdd](https://github.com/platyplus/platydev/commit/2522cddc8ebdf699669315723ccf03c0a48550b6))


### Features

* upgrade to Hasura v2 ([077c70e](https://github.com/platyplus/platydev/commit/077c70ed72bf373df25feaa3a77d55fd1e76aa8b))


### Performance Improvements

* wait for postgresql before starting hasura ([6648da6](https://github.com/platyplus/platydev/commit/6648da63e558c3efee149040d30ea645f40d5e86))


### BREAKING CHANGES

* Please read the official [migration
instructions](https://hasura.io/blog/migrating-from-hasura-v1-3-to-v2-0/) from the Hasura blog
* Please check the [release
notes](https://github.com/bitnami/charts/tree/master/bitnami/postgresql#breaking-changes) from the
official Bitnami Helm Chart before upgrading



## [0.1.8](https://github.com/platyplus/platydev/compare/charts-hasura@0.1.7...charts-hasura@0.1.8) (2021-09-15)


### Bug Fixes

* connect HBP to postgres so HBP 2.7.1 works, and add init DB scripts in Hasura and HBP charts ([e84eff0](https://github.com/platyplus/platydev/commit/e84eff043decd5eda73e3f686f4aca948200087d))
