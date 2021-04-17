// * Load tsconfig-paths from monorepo root
// * See: https://github.com/pulumi/pulumi/issues/3061
/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path'
const tsConfig = require('./tsconfig.json')
const rootConfig = tsConfig.extends ? require(tsConfig.extends) : tsConfig
const rootPath = tsConfig.extends
  ? tsConfig.extends.substr(0, tsConfig.extends.lastIndexOf(path.sep) + 1)
  : ''
type Paths = Record<string, string[]>
const tsConfigPaths = require('tsconfig-paths')
tsConfigPaths.register({
  baseUrl: './',
  paths: Object.entries(
    (rootConfig.compilerOptions?.paths || {}) as Paths
  ).reduce<Paths>((prev, [key, value]) => {
    prev[key] = value.map(p => `${rootPath}${p}`)
    return prev
  }, {})
})
