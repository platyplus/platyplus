import * as kubernetes from '@pulumi/kubernetes'
import { ProviderResource } from '@pulumi/pulumi'

import { DnsDomain } from './types'

const nameFromUrn = (urn: string) => urn.substring(urn.lastIndexOf('::') + 1)

export const childName = (parentName: string, name: string): string =>
  `${nameFromUrn(parentName)}-${name}`

export const getDomains = (domain?: DnsDomain | DnsDomain[]): DnsDomain[] =>
  domain ? (Array.isArray(domain) ? domain : [domain]) : []

const registeredNamespaces: Record<string, kubernetes.core.v1.Namespace> = {}

export const getNameSpace = (
  provider: ProviderResource,
  namespace: string
): kubernetes.core.v1.Namespace => {
  if (!registeredNamespaces[`${provider.urn}.${namespace}`]) {
    registeredNamespaces[
      `${provider.urn}.${namespace}`
    ] = new kubernetes.core.v1.Namespace(
      namespace,
      {
        metadata: {
          name: namespace
        }
      },
      { provider }
    )
  }
  return registeredNamespaces[`${provider.urn}.${namespace}`]
}
