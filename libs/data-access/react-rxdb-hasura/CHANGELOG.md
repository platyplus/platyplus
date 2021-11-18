# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [0.4.2](https://github.com/platyplus/platydev/compare/data-access-react-rxdb-hasura@0.4.1...data-access-react-rxdb-hasura@0.4.2) (2021-11-18)



## [0.4.1](https://github.com/platyplus/platydev/compare/data-access-react-rxdb-hasura@0.4.0...data-access-react-rxdb-hasura@0.4.1) (2021-11-18)



# [0.4.0](https://github.com/platyplus/platydev/compare/data-access-react-rxdb-hasura@0.3.3...data-access-react-rxdb-hasura@0.4.0) (2021-11-14)


### Bug Fixes

* load and save pages correctly ([3207c71](https://github.com/platyplus/platydev/commit/3207c712522872ef55f38ab30fd23de59669874f))


### Features

* editable page in the user context ([ccc9b80](https://github.com/platyplus/platydev/commit/ccc9b80ad62764cad2b2170235a8208dd7cdfa50))



## [0.3.3](https://github.com/platyplus/platydev/compare/data-access-react-rxdb-hasura@0.3.2...data-access-react-rxdb-hasura@0.3.3) (2021-11-10)



## [0.3.2](https://github.com/platyplus/platydev/compare/data-access-react-rxdb-hasura@0.3.1...data-access-react-rxdb-hasura@0.3.2) (2021-11-10)



## [0.3.1](https://github.com/platyplus/platydev/compare/data-access-react-rxdb-hasura@0.3.0...data-access-react-rxdb-hasura@0.3.1) (2021-11-10)



# [0.3.0](https://github.com/platyplus/platydev/compare/data-access-react-rxdb-hasura@0.2.0...data-access-react-rxdb-hasura@0.3.0) (2021-11-08)


### Bug Fixes

* avoid concurrent subscriptions on DB and replication initialisation ([e9303f4](https://github.com/platyplus/platydev/commit/e9303f4cf13ca797070f8699144121d1c20f4515))
* correct things here and there ([4cf9a2a](https://github.com/platyplus/platydev/commit/4cf9a2a6c9f67e4c52b98d81ed94e0705314388c))
* correctly logout so loging in again works ([503d548](https://github.com/platyplus/platydev/commit/503d548f34821beaaa0c7dbe882368d346c82861))
* custom pages ([4a3418d](https://github.com/platyplus/platydev/commit/4a3418d961d403f411f4bfa4310595b97c73b9bd))
* improve offline mode - remaining stuff in todo.md ([685b7e7](https://github.com/platyplus/platydev/commit/685b7e7fd7ecb5b0f1353211ab2186bd2ec0129e))
* improve permissions, FK contraints and UI routing between documents ([890e7b7](https://github.com/platyplus/platydev/commit/890e7b730f0a04db75622575c62cd0f0888a4cff))
* use useRxCollection now that rxdb-hooks has fixed the issue ([ff84d34](https://github.com/platyplus/platydev/commit/ff84d3453eab801b2294f26340a1d5541dcea39b))


### Features

* check if required values are present in canSave ([fd15876](https://github.com/platyplus/platydev/commit/fd158769612f4117f7e217bffdfb10f90f04be44))
* configurable default home page ([ef74e79](https://github.com/platyplus/platydev/commit/ef74e79a8e84967c32a371bb1d463ee55043bbb3))
* custom menu ([1167c8d](https://github.com/platyplus/platydev/commit/1167c8df5a3a993682b17ec1b4e36af16a57a54a))
* dark/light mode ([c45eb13](https://github.com/platyplus/platydev/commit/c45eb135535b6df72b71ef28fb9f450e10b43324))
* rich text editor ([9efd07a](https://github.com/platyplus/platydev/commit/9efd07a05c7ac28d712e9bb054a054f9b93572ec))



# [0.2.0](https://github.com/platyplus/platyplus/compare/data-access-react-rxdb-hasura@0.1.0...data-access-react-rxdb-hasura@0.2.0) (2021-10-09)

### Bug Fixes

- always hide config side status menu when user is not authenticated ([995f91e](https://github.com/platyplus/platyplus/commit/995f91e6c6c4092638f2196ecaf219c56ebd6d65))
- post-demo bug fixing ([cbf9fc6](https://github.com/platyplus/platyplus/commit/cbf9fc662a541831a6fc3a682015b5de3e7f5011))
- remove bugs, upgrade packages ([826f1c2](https://github.com/platyplus/platyplus/commit/826f1c2c2147ed1b436e9f58b36d1fc4346d7f91))

### Features

- dynamic config.json file that can be rewritten on static file 'runtime' ([8eebae6](https://github.com/platyplus/platyplus/commit/8eebae64d4039e6a05503abb58b03c11dfaaf9b6))

# 0.1.0 (2021-09-15)

### Bug Fixes

- better handling of form state, nullable values and input accepters ([578eb91](https://github.com/platyplus/platyplus/commit/578eb91f62517a350cbaf92119bacf7c8fcea504))
- correct collections loading ([3766214](https://github.com/platyplus/platyplus/commit/3766214b38a75e225044a7589ab15960812a9816))
- correct inline document label template ([5aaf57a](https://github.com/platyplus/platyplus/commit/5aaf57a5c3aee4d99cc93512bcfed29bc258a31c))
- create document, and other improvements ([8b42fd9](https://github.com/platyplus/platyplus/commit/8b42fd9e0e43df227d2ea48687a6346e18c5a736))
- de-regress ([2f9351a](https://github.com/platyplus/platyplus/commit/2f9351a5ad544f1f837ca42bdb1696bbc5804a80))
- do not use relationships with absent remote table, and do not push non permitted columns ([6a7710a](https://github.com/platyplus/platyplus/commit/6a7710a1d778f796aaee430a2543d2e9b56d9dd6))
- filter relationships with no table info ([1f90770](https://github.com/platyplus/platyplus/commit/1f9077076e723d056d272b874a8a1317f5dce516))
- modify app config either through the migration API or the graphql API ([14dcf55](https://github.com/platyplus/platyplus/commit/14dcf556fe8b4aa6e821bdd77d8ef732b8e2138c))
- solve multiple bugs ([ae7113f](https://github.com/platyplus/platyplus/commit/ae7113fb3c02ebc31df2b827320478ffc4128e92))

### Features

- add default values when missing on insert/update - and refactor rxdb-hasura contents directory ([16f89d0](https://github.com/platyplus/platyplus/commit/16f89d084d881e0d8f12fdb115f91b0bfc4636cd))
- app config as document contents, sortable menu, and refactoring ([65b77f1](https://github.com/platyplus/platyplus/commit/65b77f1db86f93df601f8d31d014124dc104833c))
- better config navigation ([addbc3c](https://github.com/platyplus/platyplus/commit/addbc3c053e9b324ca738ba36db09c51f2476d53))
- check if the user is allowed to remove items from a m2m relation ([aeafacc](https://github.com/platyplus/platyplus/commit/aeafaccb3ea30ddeff6f6e3a8d359465ab2ee33a))
- column-level edit permisssions ([20d5aff](https://github.com/platyplus/platyplus/commit/20d5aff7c5a8eb39a249833e9207941aa7572660))
- configurable property icon ([61ed9d4](https://github.com/platyplus/platyplus/commit/61ed9d4f22f6b7cc032787a42f34aec01a5365e7))
- configuration module ([2e69a12](https://github.com/platyplus/platyplus/commit/2e69a12f05ae1d92749539f2d97a37f237218e96))
- datepicker, numeric field and form reset ([d48d160](https://github.com/platyplus/platyplus/commit/d48d16020de1684674fc767c7c7f348a35022ec8))
- detect form changes ([3fcb21e](https://github.com/platyplus/platyplus/commit/3fcb21eb70795913ff4d357cda75e7a6cb5118aa))
- document details ([522fcda](https://github.com/platyplus/platyplus/commit/522fcdaf7c48a9da6b37c4239a57b23ea82dfe22))
- edit label template when value is empty ([b4be0dc](https://github.com/platyplus/platyplus/commit/b4be0dc7189ad5b394dba0c6ad5edb3d985af1f4))
- edit property titles ([f793a47](https://github.com/platyplus/platyplus/commit/f793a472eb42a2b1065ce782131f66abb5f37426))
- editable label and create documents ([fd3368e](https://github.com/platyplus/platyplus/commit/fd3368e74e7e4228b94209a9bb1583ff85c0914f))
- form validation structure, and make it work with required values ([8513b52](https://github.com/platyplus/platyplus/commit/8513b5233d2990e54aced08538d6b8ab30a1bcc6))
- generate migrations for table and property config ([e53603c](https://github.com/platyplus/platyplus/commit/e53603cd85f75c3e8a5bdbcd29690932c80e62a3))
- indexeddb adaptor, and better db initiation ([bd78e02](https://github.com/platyplus/platyplus/commit/bd78e02bcaa4ff533080409e3e84b7ba96089f9c))
- make document and collection titles (almost) editable ([4ea45a7](https://github.com/platyplus/platyplus/commit/4ea45a7b62d24ff3b4e29769c17fde040cc161bb))
- make metadata observable ([c9dd88d](https://github.com/platyplus/platyplus/commit/c9dd88d9a31d741116378ce3db551c1b0fb02592))
- many to many ([9be9718](https://github.com/platyplus/platyplus/commit/9be971873f36d4e142a6f19eed8a889391dc68ae))
- monitor network state ([15f43cf](https://github.com/platyplus/platyplus/commit/15f43cf36985ed0968bf851bbfde070e9015f591))
- profile and react-rxdb-hasura libs ([4c4d7bf](https://github.com/platyplus/platyplus/commit/4c4d7bf9656b6d8ed2ef7a1ca4817127365d7caf))
- reactive collection icon in the menu ([c8a7bf2](https://github.com/platyplus/platyplus/commit/c8a7bf25407032c6f9c02b67ced6c457cb00477b))
- required many2one relationships, and some code refactoring ([2ab3794](https://github.com/platyplus/platyplus/commit/2ab379423d9a5c34e06b7fa468723b19520a5e3e))
- reverse relationships, and lots of refactoring ([ecabef2](https://github.com/platyplus/platyplus/commit/ecabef2080edac98a193e74e696c08fa169e6e11))
- save document ([ee5bb1f](https://github.com/platyplus/platyplus/commit/ee5bb1feb3dd3a14b961bd02630210d499e4ab13))
- save property config migrations ([2f3f31e](https://github.com/platyplus/platyplus/commit/2f3f31ede8bdad1d473613cac04adfe950c5e450))
- select multiple, and collection as label ([067928b](https://github.com/platyplus/platyplus/commit/067928bfc777480fd71d044c40ba347bf818781e))
- smoother animation when loading components, and additional reactive metadata ([b4516a0](https://github.com/platyplus/platyplus/commit/b4516a081b3885676e77626c1114e01d43958e2e))
- sortable properties ([3bd8310](https://github.com/platyplus/platyplus/commit/3bd831068b0db08efdfe26b9e949bb4a0b3f0a0d))
- watch live schema changes: remove columns or properties ([53a96a7](https://github.com/platyplus/platyplus/commit/53a96a7e24afd275033881dcf6c9a746996357f6))
- wIP edit property titles ([6265b66](https://github.com/platyplus/platyplus/commit/6265b66f4d4016884b52f3647b61bdfeef112415))

### Performance Improvements

- avoid reloading title component needlessly ([6dff331](https://github.com/platyplus/platyplus/commit/6dff331a57a526e8d2bf7db059fa183855aa4d88))
- generate batch config SQL migrations ([e6f045d](https://github.com/platyplus/platyplus/commit/e6f045d540f13549e85ed42ff88ca96cb470bf01))
- unnest form hooks to avoid component re-rendering ([f2270d0](https://github.com/platyplus/platyplus/commit/f2270d071e26a2dd62243990f0d8291f7bcf19f1))
- usememo ([bc91717](https://github.com/platyplus/platyplus/commit/bc9171703fe4a44fec1ff545de3c92f87569dd57))
