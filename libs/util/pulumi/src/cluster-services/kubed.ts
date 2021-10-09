import * as kubernetes from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'

import { childName, getNameSpace } from '../helpers'
import { CommonServiceOptions } from '../types'

type KubedOptions = CommonServiceOptions

// * https://appscode.com/products/kubed/v0.12.0/setup/install/
// * (See GKE notes)
export const kubed = (
  parentName: string,
  provider: pulumi.ProviderResource,
  options: KubedOptions
): kubernetes.helm.v3.Release => {
  const ns = getNameSpace(provider, options.namespace)
  const name = 'kubed'
  return new kubernetes.helm.v3.Release(
    childName(parentName, name),
    {
      chart: 'kubed',
      name,
      version: '0.12.0',
      repositoryOpts: {
        repo: 'https://charts.appscode.com/stable'
      },
      namespace: ns.metadata.name,
      values: {}
    },
    { provider }
  )
}
