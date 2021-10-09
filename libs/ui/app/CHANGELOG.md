# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

# 0.1.0 (2021-09-15)

### Bug Fixes

- accept any ISO value in date and date-time components ([f946cef](https://github.com/platyplus/platydev/commit/f946cef9d886f6a5a7fa848da0ec7529e382349e))
- better handling of form state, nullable values and input accepters ([578eb91](https://github.com/platyplus/platydev/commit/578eb91f62517a350cbaf92119bacf7c8fcea504))
- correct collection title when none exists in config table ([154cb19](https://github.com/platyplus/platydev/commit/154cb19ac766eba111b883993efa744a8bac3033))
- correct collections loading ([3766214](https://github.com/platyplus/platydev/commit/3766214b38a75e225044a7589ab15960812a9816))
- de-regress ([2f9351a](https://github.com/platyplus/platydev/commit/2f9351a5ad544f1f837ca42bdb1696bbc5804a80))
- disable dnd ([9f0462a](https://github.com/platyplus/platydev/commit/9f0462a0c08370fb860768456997c16c16b05c68))
- do not show document when id is null ([d5f79aa](https://github.com/platyplus/platydev/commit/d5f79aa7871977e5bc395e9ac6b7618d08d49459))
- filter relationships with no table info ([1f90770](https://github.com/platyplus/platydev/commit/1f9077076e723d056d272b874a8a1317f5dce516))
- modify app config either through the migration API or the graphql API ([14dcf55](https://github.com/platyplus/platydev/commit/14dcf556fe8b4aa6e821bdd77d8ef732b8e2138c))
- re-implement basic local indexing ([f6a98c9](https://github.com/platyplus/platydev/commit/f6a98c9e04472fb7293839e18b87745068012840))
- solve multiple bugs ([ae7113f](https://github.com/platyplus/platydev/commit/ae7113fb3c02ebc31df2b827320478ffc4128e92))

### Features

- add a 'previous' button to header title ([8b5315b](https://github.com/platyplus/platydev/commit/8b5315b36a418716fe8f264934f1f729c2b34685))
- add collections route ([ae7b39e](https://github.com/platyplus/platydev/commit/ae7b39e312983061df60069f7e01e84f5627890c))
- add property icon to the list of properties in the config module ([1815a00](https://github.com/platyplus/platydev/commit/1815a0079a511b1b40f0fede82317f4466032921))
- app config as document contents, sortable menu, and refactoring ([65b77f1](https://github.com/platyplus/platydev/commit/65b77f1db86f93df601f8d31d014124dc104833c))
- better config navigation ([addbc3c](https://github.com/platyplus/platydev/commit/addbc3c053e9b324ca738ba36db09c51f2476d53))
- check if the user is allowed to remove items from a m2m relation ([aeafacc](https://github.com/platyplus/platydev/commit/aeafaccb3ea30ddeff6f6e3a8d359465ab2ee33a))
- column-level edit permisssions ([20d5aff](https://github.com/platyplus/platydev/commit/20d5aff7c5a8eb39a249833e9207941aa7572660))
- configurable property icon ([61ed9d4](https://github.com/platyplus/platydev/commit/61ed9d4f22f6b7cc032787a42f34aec01a5365e7))
- configuration module ([2e69a12](https://github.com/platyplus/platydev/commit/2e69a12f05ae1d92749539f2d97a37f237218e96))
- datepicker, numeric field and form reset ([d48d160](https://github.com/platyplus/platydev/commit/d48d16020de1684674fc767c7c7f348a35022ec8))
- detect form changes ([3fcb21e](https://github.com/platyplus/platydev/commit/3fcb21eb70795913ff4d357cda75e7a6cb5118aa))
- document details ([522fcda](https://github.com/platyplus/platydev/commit/522fcdaf7c48a9da6b37c4239a57b23ea82dfe22))
- editable label and create documents ([fd3368e](https://github.com/platyplus/platydev/commit/fd3368e74e7e4228b94209a9bb1583ff85c0914f))
- form validation structure, and make it work with required values ([8513b52](https://github.com/platyplus/platydev/commit/8513b5233d2990e54aced08538d6b8ab30a1bcc6))
- indexeddb adaptor, and better db initiation ([bd78e02](https://github.com/platyplus/platydev/commit/bd78e02bcaa4ff533080409e3e84b7ba96089f9c))
- make document and collection titles (almost) editable ([4ea45a7](https://github.com/platyplus/platydev/commit/4ea45a7b62d24ff3b4e29769c17fde040cc161bb))
- make metadata observable ([c9dd88d](https://github.com/platyplus/platydev/commit/c9dd88d9a31d741116378ce3db551c1b0fb02592))
- many to many ([9be9718](https://github.com/platyplus/platydev/commit/9be971873f36d4e142a6f19eed8a889391dc68ae))
- monitor network state ([15f43cf](https://github.com/platyplus/platydev/commit/15f43cf36985ed0968bf851bbfde070e9015f591))
- number and integer components ([239ded8](https://github.com/platyplus/platydev/commit/239ded82941e4e9cac0b8ba1275a662456adf753))
- profile page, and make things more DRY! ([298ffcf](https://github.com/platyplus/platydev/commit/298ffcf5dafb2f3717761feee0a420e9004e9be9))
- reactive collection icon in the menu ([c8a7bf2](https://github.com/platyplus/platydev/commit/c8a7bf25407032c6f9c02b67ced6c457cb00477b))
- required many2one relationships, and some code refactoring ([2ab3794](https://github.com/platyplus/platydev/commit/2ab379423d9a5c34e06b7fa468723b19520a5e3e))
- reverse relationships, and lots of refactoring ([ecabef2](https://github.com/platyplus/platydev/commit/ecabef2080edac98a193e74e696c08fa169e6e11))
- save document ([ee5bb1f](https://github.com/platyplus/platydev/commit/ee5bb1feb3dd3a14b961bd02630210d499e4ab13))
- save property config migrations ([2f3f31e](https://github.com/platyplus/platydev/commit/2f3f31ede8bdad1d473613cac04adfe950c5e450))
- select multiple, and collection as label ([067928b](https://github.com/platyplus/platydev/commit/067928bfc777480fd71d044c40ba347bf818781e))
- select one ref document ([0ef1e18](https://github.com/platyplus/platydev/commit/0ef1e1868e361cdcf384cd58c985ac414550eacf))
- show original collection name on list ([bc94b22](https://github.com/platyplus/platydev/commit/bc94b2254f2e798e49f07aacbc5633cf81f39dd3))
- smoother animation when loading components, and additional reactive metadata ([b4516a0](https://github.com/platyplus/platydev/commit/b4516a081b3885676e77626c1114e01d43958e2e))
- sort options ([58e26b1](https://github.com/platyplus/platydev/commit/58e26b1497a9f633ffc98bc79de7ab01b576be3f))
- sortable properties ([3bd8310](https://github.com/platyplus/platydev/commit/3bd831068b0db08efdfe26b9e949bb4a0b3f0a0d))
- watch live schema changes: remove columns or properties ([53a96a7](https://github.com/platyplus/platydev/commit/53a96a7e24afd275033881dcf6c9a746996357f6))
- wIP edit property titles ([6265b66](https://github.com/platyplus/platydev/commit/6265b66f4d4016884b52f3647b61bdfeef112415))
- working date and date-time components ([7d65e24](https://github.com/platyplus/platydev/commit/7d65e24c48deb51aca1a963a7ae703e459172bca))

### Performance Improvements

- avoid reloading title component needlessly ([6dff331](https://github.com/platyplus/platydev/commit/6dff331a57a526e8d2bf7db059fa183855aa4d88))
- unnest form hooks to avoid component re-rendering ([f2270d0](https://github.com/platyplus/platydev/commit/f2270d071e26a2dd62243990f0d8291f7bcf19f1))
