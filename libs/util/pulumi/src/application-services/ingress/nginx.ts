import * as kubernetes from '@pulumi/kubernetes'
import { ProviderResource } from '@pulumi/pulumi'

import { childName, getNameSpace } from '../../helpers'

export const ingressNginx = (
  parentName: string,
  provider: ProviderResource,
  namespace: string
): kubernetes.helm.v3.Release => {
  const ns = getNameSpace(provider, namespace)
  const releaseName = 'ingress-nginx'
  const release = new kubernetes.helm.v3.Release(
    childName(parentName, releaseName),
    {
      chart: 'ingress-nginx',
      version: '4.0.5',
      name: releaseName,
      namespace: ns.metadata.name,
      repositoryOpts: {
        repo: 'https://kubernetes.github.io/ingress-nginx'
      },
      values: {
        controller: {
          ingressClass: 'nginx'
        }
      },
      skipAwait: false
    },
    { provider, dependsOn: [provider] }
  )
  return release
}
