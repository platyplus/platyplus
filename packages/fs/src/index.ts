import * as fsExtra from 'fs-extra'
import glob from 'glob'

import * as yamlMethods from './yaml'

export * from 'fs-extra'
export { glob } from 'glob'
export * from './yaml'

export default {
  ...fsExtra,
  glob,
  ...yamlMethods
}
