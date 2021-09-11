import { DnsRecord, Domain } from '@pulumi/digitalocean'
import * as pulumi from '@pulumi/pulumi'

import { getNameSpace } from '../../helpers'
import { ingressNginx } from './nginx'
import { IngressOptions } from './types'

export const digitalOceanIngress = (
  parentName: string,
  provider: pulumi.ProviderResource,
  options: IngressOptions
): { ingressIp: pulumi.Output<string> } => {
  const domain = options.domain
  const domainsResources = domain.map((d) => {
    return {
      ...d,
      resource: new Domain(d.name, {
        name: d.name
      })
    }
  })
  const namespace = getNameSpace(provider, options.namespace)

  const { chart: ingressChart, name: ingressChartName } = ingressNginx(
    parentName,
    provider,
    options.namespace
  )

  const ingressIp = namespace.metadata.name.apply(
    (ns) =>
      ingressChart.getResource(
        'v1/Service',
        ns,
        `${parentName}-${ingressChartName}-controller`
      ).status.loadBalancer.ingress[0].ip
  )

  for (const { name, root, resource } of domainsResources) {
    // * Root DNS 'A' record - add it by default, root param value otherwise
    new DnsRecord(
      `@.${name}`,
      {
        type: 'A',
        name: '@',
        domain: name,
        value: root || ingressIp
        // value: ingressIp
      },
      { dependsOn: [resource] }
    )

    // * Star DNS 'A' record
    new DnsRecord(
      `*.${name}`,
      {
        type: 'A',
        name: '*',
        domain: name,
        value: ingressIp
      },
      { dependsOn: [resource] }
    )
  }

  return {
    ingressIp
  }
}
