# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [0.2.1](https://github.com/platyplus/platydev/compare/charts-hasura-backend-plus@0.2.0...charts-hasura-backend-plus@0.2.1) (2021-11-14)


### Bug Fixes

* bump hasura chart version ([0d94313](https://github.com/platyplus/platydev/commit/0d94313a87ff706d38597b63920e8fad13f0e177))
* use networking.k8s.io/v1 ingress ([b153143](https://github.com/platyplus/platydev/commit/b153143331f81adc8f47c35584f9dcd4cb706a82)), closes [#17](https://github.com/platyplus/platydev/issues/17)



# [0.2.0](https://github.com/platyplus/platydev/compare/charts-hasura-backend-plus@0.1.13...charts-hasura-backend-plus@0.2.0) (2021-10-17)

### Bug Fixes

- initi postgresql on startup when hbp chart connects to another hasura chart ([98b16aa](https://github.com/platyplus/platydev/commit/98b16aa3d774b33851d8ad7b8d85f8529664354d))
- remove bugs, upgrade packages ([826f1c2](https://github.com/platyplus/platydev/commit/826f1c2c2147ed1b436e9f58b36d1fc4346d7f91))

### Features

- globally configurable ingress route ([8367e86](https://github.com/platyplus/platydev/commit/8367e86806b71d2c05ff2d3bc6946603516d25b9))

## [0.1.14](https://github.com/platyplus/platyplus/compare/charts-hasura-backend-plus@0.1.13...charts-hasura-backend-plus@0.1.14) (2021-09-22)

### Bug Fixes

- hasura connect ([1fc59dc](https://github.com/platyplus/platyplus/commit/1fc59dcdb7ba3634a30ea36703b1a02f56be07e8))

## [0.1.14](https://github.com/platyplus/platyplus/compare/charts-hasura-backend-plus@0.1.13...charts-hasura-backend-plus@0.1.14) (2021-09-22)

## [0.1.13](https://github.com/platyplus/platyplus/compare/charts-hasura-backend-plus@0.1.12...charts-hasura-backend-plus@0.1.13) (2021-09-15)

### Bug Fixes

- connect HBP to postgres so HBP 2.7.1 works, and add init DB scripts in Hasura and HBP charts ([e84eff0](https://github.com/platyplus/platyplus/commit/e84eff043decd5eda73e3f686f4aca948200087d))
