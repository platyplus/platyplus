import { DnsRecord, Domain } from '@pulumi/digitalocean'
import * as pulumi from '@pulumi/pulumi'
import * as k8s from '@pulumi/kubernetes'

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

  const ingressRelease = ingressNginx(parentName, provider, options.namespace)

  const srv = k8s.core.v1.Service.get(
    `ingress-nginx-controller`,
    pulumi.interpolate`${ingressRelease.status.namespace}/${ingressRelease.status.name}-controller`,
    { provider }
  )
  const ingressIp = srv.status.loadBalancer.ingress[0].ip

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
