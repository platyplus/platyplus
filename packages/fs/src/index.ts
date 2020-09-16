import * as fsExtra from 'fs-extra'
import glob from 'glob'
import * as yaml from './yaml'

export * from 'fs-extra'
export { glob } from 'glob'
export * from './yaml'

export default {
  ...fsExtra,
  glob,
  ...yaml,
}
