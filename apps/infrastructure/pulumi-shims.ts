// * Load tsconfig-paths from monorepo root
// * See: https://github.com/pulumi/pulumi/issues/3061
import { register, loadConfig } from 'tsconfig-paths'
const config = loadConfig('.')
if (config.resultType === 'failed') {
  console.log('Could not load tsconfig to map paths, aborting.')
  process.exit(1)
}

register({
  baseUrl: config.absoluteBaseUrl,
  paths: config.paths
})
