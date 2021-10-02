import * as kubernetes from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'

import { childName, getDomains, getNameSpace } from '../../helpers'
import { MonitoringInitOptions } from './types'

// !!!! Deactivated for now, too many problems... Following issues
// TODO grafana default username/password

export const monitoring = (
  parentName: string,
  provider: pulumi.ProviderResource,
  options: MonitoringInitOptions
): { chart: kubernetes.helm.v3.Chart } => {
  const { namespace, domain, ingress } = options
  const ns = getNameSpace(provider, namespace)
  const domains = getDomains(domain)

  const tls = options.tls !== false

  const values: Record<string, unknown> = {}
  for (const service of ['prometheus', 'alertManager', 'grafana'] as const) {
    const { enabled, subdomain, path } = ingress[service]
    if (enabled) {
      const subDomain = subdomain || ingress.subdomain
      const hosts = domains.map(({ name }) => `${subDomain}.${name}`)
      values[service] = {
        ingress: {
          enabled: ingress.enabled && enabled,
          annotations: tls
            ? {
                'kubernetes.io/tls-acme': 'true'
              }
            : {},
          hosts,
          // ! TODO grafana uses 'path', whereas others use 'paths'
          path,
          paths: [path],
          tls: tls ? [{ secretName: `${service}-tls`, hosts }] : []
        }
      }
    }
  }

  const chart = new kubernetes.helm.v3.Chart(
    childName(parentName, 'kube-prometheus-stack'),
    {
      chart: 'kube-prometheus-stack',
      version: '19.0.1',
      fetchOpts: {
        repo: 'https://prometheus-community.github.io/helm-charts'
      },
      namespace: ns.metadata.name,
      values
    },
    { provider }
  )

  return { chart }
}
