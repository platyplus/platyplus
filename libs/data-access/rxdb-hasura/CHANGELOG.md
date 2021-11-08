# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

# [0.3.0](https://github.com/platyplus/platydev/compare/data-access-rxdb-hasura@0.2.3...data-access-rxdb-hasura@0.3.0) (2021-11-08)


### Bug Fixes

* avoid concurrent subscriptions on DB and replication initialisation ([e9303f4](https://github.com/platyplus/platydev/commit/e9303f4cf13ca797070f8699144121d1c20f4515))
* correct things here and there ([4cf9a2a](https://github.com/platyplus/platydev/commit/4cf9a2a6c9f67e4c52b98d81ed94e0705314388c))
* correctly logout so loging in again works ([503d548](https://github.com/platyplus/platydev/commit/503d548f34821beaaa0c7dbe882368d346c82861))
* custom pages ([4a3418d](https://github.com/platyplus/platydev/commit/4a3418d961d403f411f4bfa4310595b97c73b9bd))
* improve offline mode - remaining stuff in todo.md ([685b7e7](https://github.com/platyplus/platydev/commit/685b7e7fd7ecb5b0f1353211ab2186bd2ec0129e))
* improve permissions, FK contraints and UI routing between documents ([890e7b7](https://github.com/platyplus/platydev/commit/890e7b730f0a04db75622575c62cd0f0888a4cff))
* resume online when application is loaded offline ([828cbc7](https://github.com/platyplus/platydev/commit/828cbc7ce014c653d47a722abafe18bd58691e1a))


### Features

* check if required values are present in canSave ([fd15876](https://github.com/platyplus/platydev/commit/fd158769612f4117f7e217bffdfb10f90f04be44))
* configurable default home page ([ef74e79](https://github.com/platyplus/platydev/commit/ef74e79a8e84967c32a371bb1d463ee55043bbb3))
* custom menu ([1167c8d](https://github.com/platyplus/platydev/commit/1167c8df5a3a993682b17ec1b4e36af16a57a54a))
* dark/light mode ([c45eb13](https://github.com/platyplus/platydev/commit/c45eb135535b6df72b71ef28fb9f450e10b43324))
* rich text editor ([9efd07a](https://github.com/platyplus/platydev/commit/9efd07a05c7ac28d712e9bb054a054f9b93572ec))



## [0.2.3](https://github.com/platyplus/platyplus/compare/data-access-rxdb-hasura@0.2.2...data-access-rxdb-hasura@0.2.3) (2021-10-09)

### Bug Fixes

- many to many ([eff74f3](https://github.com/platyplus/platyplus/commit/eff74f3b28c9cadd3e435bc16956836105d8249e))
- post-demo bug fixing ([cbf9fc6](https://github.com/platyplus/platyplus/commit/cbf9fc662a541831a6fc3a682015b5de3e7f5011))
- remove bugs, upgrade packages ([826f1c2](https://github.com/platyplus/platyplus/commit/826f1c2c2147ed1b436e9f58b36d1fc4346d7f91))

## [0.2.2](https://github.com/platyplus/platyplus/compare/@platyplus/rxdb-hasura@0.2.1...@platyplus/rxdb-hasura@0.2.2) (2021-01-26)

### Bug Fixes

- use cpy-cli, not cpy ([0050b57](https://github.com/platyplus/platyplus/commit/0050b574b848cf9a949a6f213f0965fc9fc29fd1))

## [0.2.1](https://github.com/platyplus/platyplus/compare/@platyplus/rxdb-hasura@0.2.0...@platyplus/rxdb-hasura@0.2.1) (2021-01-26)

### Bug Fixes

- correct import ([60bee2d](https://github.com/platyplus/platyplus/commit/60bee2d62db7b84b83e2ae9410685219012f6244))

# [0.2.0](https://github.com/platyplus/platyplus/compare/@platyplus/rxdb-hasura@0.1.0...@platyplus/rxdb-hasura@0.2.0) (2021-01-26)

### Bug Fixes

- avoid undefined values to be sent to hasura ([83540df](https://github.com/platyplus/platyplus/commit/83540df1f5d43746ab6c711b768918c2c1cce308))
- correct push modifier ([4a037e1](https://github.com/platyplus/platyplus/commit/4a037e141eefc5012207dbd6deddcb997ca1119c))
- reset websocket subscription when token is refreshed ([fa89747](https://github.com/platyplus/platyplus/commit/fa89747914eebb1d100aef3cfc56e7c31c74e510))
- update mirrored object/array relationships ([629daa0](https://github.com/platyplus/platyplus/commit/629daa0a35d75f3dbfeabe32a438054a39600b91))

### Features

- computed properties ([7a7a4f2](https://github.com/platyplus/platyplus/commit/7a7a4f2bab688420fc8397cd56c9f7e0abbf9e6f))
- custom components, and line char ([fd7527b](https://github.com/platyplus/platyplus/commit/fd7527b566a36b9bd0dc540f183529993cb4f664))
- delete a document ([44d09e0](https://github.com/platyplus/platyplus/commit/44d09e0dfc9e364b12b79c4fbe465e99ee9f8fad))
- document page and better object relationship sync ([9d696ba](https://github.com/platyplus/platyplus/commit/9d696baa9229173a1a60d111e2e296fcad54376f))
- edit array relationship ([323ecf5](https://github.com/platyplus/platyplus/commit/323ecf50230b37e54a1b855add5ae73ea115cdcb))
- insert documents, including references ([ad9a962](https://github.com/platyplus/platyplus/commit/ad9a962455cc4cc3f7bdd9a1e3fa503846547f74))
- insert new document ([bf810f0](https://github.com/platyplus/platyplus/commit/bf810f036e821b7d27eff921e764f77dc15624b5))
- optimistic compute properties from rxdb so it is available offline ([895d61a](https://github.com/platyplus/platyplus/commit/895d61a8bb84862ed1f2888a2366d0a1ebfa0a99))
- order properties, and show property icons ([331aea4](https://github.com/platyplus/platyplus/commit/331aea48bd83b12b8d5f724187275db9f673ba45))
- sync collections from multiple roles - and adapt it to profile management ([ef173de](https://github.com/platyplus/platyplus/commit/ef173decfe4c549214affce8fe83bf085bde65a8))
- update one-to-many changes ([10bb741](https://github.com/platyplus/platyplus/commit/10bb7415f1d246c484face0f1bc86a7b22638654))

### Performance Improvements

- simplify access to ref properties ([5d017c9](https://github.com/platyplus/platyplus/commit/5d017c9d83ffe8c3a7777bcab871a80557de05ae))

# 0.1.0 (2021-01-12)

### Features

- custom collection views and other bug fixes ([d2dd61b](https://github.com/platyplus/platyplus/commit/d2dd61b694ae0432cb97ab2d532a32ae13ae6d02))
