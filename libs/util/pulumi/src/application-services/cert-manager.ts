import * as kubernetes from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'

import { certmanager } from '../crds/certificates'
import { childName, getNameSpace } from '../helpers'
import { CommonServiceOptions, DnsDomain } from '../types'

/* 
https://cert-manager.io/next-docs/usage/ingress/
- --default-issuer-name=letsencrypt-prod
- --default-issuer-kind=ClusterIssuer
- --default-issuer-group=cert-manager.io
*/
// * ---> the above seems OK

type CertManagerApplicationServicesOptions = CommonServiceOptions & {
  domain: DnsDomain[]
  email?: string
}

export const certManager = (
  parentName: string,
  provider: pulumi.ProviderResource,
  options: CertManagerApplicationServicesOptions
): { chart: kubernetes.helm.v3.Chart } => {
  const { domain, namespace } = options
  const email = options?.email || `admin@${domain[0].name}`

  const ns = getNameSpace(provider, namespace)

  const ingressClass = 'nginx'
  const doConfig = new pulumi.Config('digitalocean')
  const apiToken = doConfig.requireSecret('token')

  const crds = new kubernetes.yaml.ConfigFile(
    'cert-manager-crds',
    {
      file: 'https://github.com/jetstack/cert-manager/releases/download/v1.2.0/cert-manager.crds.yaml',
      resourcePrefix: parentName
    },
    { provider }
  )

  const dnsSecret = new kubernetes.core.v1.Secret(
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

  // TODO remove?
  new certmanager.v1.Certificate(
    childName(parentName, 'acme-crt'),
    {
      metadata: {
        name: 'acme-crt',
        namespace: ns.metadata.name,
        annotations: {
          'reflector.v1.k8s.emberstack.com/secret-reflection-allowed': 'true',
          'reflector.v1.k8s.emberstack.com/secret-reflection-auto-enabled':
            'true'
        }
      },
      spec: {
        secretName: 'acme-crt-secret',
        dnsNames: domain.map(({ name }) => [name, `*.${name}`]).flat(),
        issuerRef: {
          name: 'letsencrypt-production',
          kind: 'ClusterIssuer'
        }
      }
    },
    {
      provider
    }
  )

  ns.metadata.name.apply(
    (namespace) =>
      new kubernetes.core.v1.Secret(
        childName(parentName, 'acme-crt-secret-mirror'),
        {
          metadata: {
            name: 'acme-crt-secret-mirror',
            namespace: ns.metadata.name,
            annotations: {
              'reflector.v1.k8s.emberstack.com/reflects': `${namespace}/acme-crt-secret`
            }
          },
          type: 'Opaque',
          data: {}
        },
        {
          provider
        }
      )
  )

  //
  // TODO certmanager provider: DO solver as a parameter
  const clusterIssuer = new certmanager.v1.ClusterIssuer(
    childName(parentName, 'letsencrypt-production'),
    {
      metadata: {
        name: 'letsencrypt-production',
        namespace: ns.metadata.name
      },
      spec: {
        acme: {
          email,
          server: 'https://acme-v02.api.letsencrypt.org/directory',
          privateKeySecretRef: { name: 'acme-crt-secret' },
          solvers: [
            { http01: { ingress: { class: ingressClass } } },
            {
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
          ]
        }
      }
    },
    {
      provider,
      dependsOn: [crds, dnsSecret]
      // transformations: [(o) => {
      //   o.metadata
      // }]
    }
  )

  const chart = new kubernetes.helm.v3.Chart(
    childName(parentName, 'cert-manager'),
    {
      chart: 'cert-manager',
      // TODO upgrade
      version: '1.2.0',
      fetchOpts: {
        repo: 'https://charts.jetstack.io'
      },
      namespace: ns.metadata.name,
      values: {
        // installCRDs: true,
        ingressShim: {
          defaultIssuerName: 'letsencrypt-production',
          defaultIssuerKind: 'ClusterIssuer',
          defaultIssuerGroup: 'cert-manager.io'
        }
      }
    },
    { provider, dependsOn: [clusterIssuer] }
  )

  return { chart }
}
