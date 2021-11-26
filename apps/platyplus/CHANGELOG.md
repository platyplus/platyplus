# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [0.3.13](https://github.com/platyplus/platydev/compare/platyplus@0.3.12...platyplus@0.3.13) (2021-11-26)



## [0.3.12](https://github.com/platyplus/platydev/compare/platyplus@0.3.11...platyplus@0.3.12) (2021-11-26)



## [0.3.11](https://github.com/platyplus/platydev/compare/platyplus@0.3.10...platyplus@0.3.11) (2021-11-24)


### Bug Fixes

* bump versions to use more secure docker images ([d839fd1](https://github.com/platyplus/platydev/commit/d839fd132a5be40d137a36ff661b65d054270b1c))



## [0.3.10](https://github.com/platyplus/platydev/compare/platyplus@0.3.9...platyplus@0.3.10) (2021-11-18)



## [0.3.9](https://github.com/platyplus/platydev/compare/platyplus@0.3.8...platyplus@0.3.9) (2021-11-18)



## [0.3.8](https://github.com/platyplus/platydev/compare/platyplus@0.3.7...platyplus@0.3.8) (2021-11-18)


### Bug Fixes

* correct way of build docker image ([6ad825b](https://github.com/platyplus/platydev/commit/6ad825b1ff27e2d5df3aa2dfb24cf1925167e031))



## [0.3.4](https://github.com/platyplus/platydev/compare/platyplus@0.3.3...platyplus@0.3.4) (2021-11-14)

### Bug Fixes

- remove invalid webpack options ([6f906b7](https://github.com/platyplus/platydev/commit/6f906b77bc40edfe5ee1a65dc0bc56ce87e5f0f5))

## [0.3.3](https://github.com/platyplus/platydev/compare/platyplus@0.3.2...platyplus@0.3.3) (2021-11-10)

### Bug Fixes

- adapt to post nx 13 bump ([df34b1f](https://github.com/platyplus/platydev/commit/df34b1f76497205536952dc3ec91aa66fb7f27c4))

## [0.3.2](https://github.com/platyplus/platydev/compare/platyplus@0.3.1...platyplus@0.3.2) (2021-11-10)

### Bug Fixes

- correct webpack config ([e3545bb](https://github.com/platyplus/platydev/commit/e3545bb1664d51d87c2a8d3996913750bf8759df))

## [0.3.1](https://github.com/platyplus/platydev/compare/platyplus@0.3.0...platyplus@0.3.1) (2021-11-10)

# [0.3.0](https://github.com/platyplus/platydev/compare/platyplus@0.2.1...platyplus@0.3.0) (2021-11-08)

### Bug Fixes

- add service worker fallback ([7f817a5](https://github.com/platyplus/platydev/commit/7f817a5661717672d1f09ecb879cd428865b86ae))
- avoid concurrent subscriptions on DB and replication initialisation ([e9303f4](https://github.com/platyplus/platydev/commit/e9303f4cf13ca797070f8699144121d1c20f4515))
- improve offline mode - remaining stuff in todo.md ([685b7e7](https://github.com/platyplus/platydev/commit/685b7e7fd7ecb5b0f1353211ab2186bd2ec0129e))
- reconfigure service worker, and apply correct policy to config.json ([7b614fa](https://github.com/platyplus/platydev/commit/7b614fabdc3308ac2c8b332f57a4e6a17ca6a112))

### Features

- custom pages ([4a3418d](https://github.com/platyplus/platydev/commit/4a3418d961d403f411f4bfa4310595b97c73b9bd))
- configurable default home page ([ef74e79](https://github.com/platyplus/platydev/commit/ef74e79a8e84967c32a371bb1d463ee55043bbb3))
- custom menu ([1167c8d](https://github.com/platyplus/platydev/commit/1167c8df5a3a993682b17ec1b4e36af16a57a54a))
- destroy db on logout ([8abe66f](https://github.com/platyplus/platydev/commit/8abe66f61e688dca373368ba0d19ed554ff9afa0))
- rich text editor ([9efd07a](https://github.com/platyplus/platydev/commit/9efd07a05c7ac28d712e9bb054a054f9b93572ec))
- dark/light mode ([c45eb13](https://github.com/platyplus/platydev/commit/c45eb135535b6df72b71ef28fb9f450e10b43324))

## [0.2.1](https://github.com/platyplus/platydev/compare/platyplus@0.2.0...platyplus@0.2.1) (2021-10-17)

### Bug Fixes

- copy dist files with the correct user permissions ([d23b557](https://github.com/platyplus/platydev/commit/d23b55771bc7ba6d4b03b659191dcfd31b5be81a))

# [0.2.0](https://github.com/platyplus/platyplus/compare/platyplus@0.1.0...platyplus@0.2.0) (2021-10-09)

### Bug Fixes

- post-demo bug fixing ([cbf9fc6](https://github.com/platyplus/platyplus/commit/cbf9fc662a541831a6fc3a682015b5de3e7f5011))

### Features

- dynamic config.json file that can be rewritten on static file 'runtime' ([8eebae6](https://github.com/platyplus/platyplus/commit/8eebae64d4039e6a05503abb58b03c11dfaaf9b6))

# 0.1.0 (2021-09-15)

### Bug Fixes

- correct collections loading ([3766214](https://github.com/platyplus/platyplus/commit/3766214b38a75e225044a7589ab15960812a9816))
- status menu items padding ([629126f](https://github.com/platyplus/platyplus/commit/629126f8b99a8aed0f424e6ff4c8ea67d1cee49d))
- use rxjs v7 that is installed in the 'root' node_modules instead of the nx/web one (v6) ([500a2c7](https://github.com/platyplus/platyplus/commit/500a2c730119ad4ce33b55f8bddf9d1eb2e5c04a))

### Features

- 'working' profile status menu ([41078d7](https://github.com/platyplus/platyplus/commit/41078d79e6d770a814d61b688ef236c75dcf0782))
- profile and react-rxdb-hasura libs ([4c4d7bf](https://github.com/platyplus/platyplus/commit/4c4d7bf9656b6d8ed2ef7a1ca4817127365d7caf))
- pwa ([523551f](https://github.com/platyplus/platyplus/commit/523551ff39efca5619ed732f3aa15004276b9e06))
- status menu ([f1738a5](https://github.com/platyplus/platyplus/commit/f1738a5c063e1a9b9e8a5e1df04ad238028fc59d))
- top menu item ([aaa104e](https://github.com/platyplus/platyplus/commit/aaa104e4e04c04ea3e9170b7c4fd1cd127da6a7e))
