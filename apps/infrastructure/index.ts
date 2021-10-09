import './pulumi-shims'
import { clusters } from '@platyplus/pulumi'
import * as kubernetes from '@pulumi/kubernetes'
// TODO https://www.npmjs.com/package/@wanews/nx-pulumi
// (and https://github.com/nrwl/nx/issues/5710)
// TODO remove this test
const clusterName = 'platy-plus'
const config = clusters.get(clusterName)
if (config) {
  new kubernetes.yaml.ConfigFile(
    'kuard',
    {
      file: 'test.yaml',
      resourcePrefix: clusterName
    },
    { provider: config.pulumiProvider, dependsOn: [config.cluster] }
  )
}
