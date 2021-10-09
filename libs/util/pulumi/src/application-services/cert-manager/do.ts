import * as kubernetes from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'

import { childName, getNameSpace } from '../../helpers'
import { CertManagerApplicationServicesOptions } from './types'

export const doDns = (
  parentName: string,
  provider: pulumi.ProviderResource,
  options: CertManagerApplicationServicesOptions
) => {
  const doConfig = new pulumi.Config('digitalocean')
  const apiToken = doConfig.requireSecret('token')
  const { domain, namespace } = options
  const ns = getNameSpace(provider, namespace)
  const secret = new kubernetes.core.v1.Secret(
    childName(parentName, 'cert-manager-dns-secrets'),
    {
      metadata: {
        name: 'cert-manager-dns-secrets',
        namespace: ns.metadata.name
      },
      type: 'Opaque',
      data: {
        'digitalocean.token': apiToken.apply((token) =>
          Buffer.from(token).toString('base64')
        )
      }
    },
    {
      provider
    }
  )
  const solver = {
    dns01: {
      digitalocean: {
        tokenSecretRef: {
          name: 'cert-manager-dns-secrets',
          key: 'digitalocean.token'
        }
      }
    },
    selector: { dnsZones: domain.map(({ name }) => name) }
  }
  return { secret, solver }
}
