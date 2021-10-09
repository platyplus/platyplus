import * as kubernetes from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'

import { certmanager } from '../../crds/certificates'
import { childName, getNameSpace } from '../../helpers'
import { ClusterProvider } from '../../types'
import { doDns } from './do'
import { CertManagerApplicationServicesOptions } from './types'

export const certManager = (
  parentName: string,
  providerName: ClusterProvider,
  provider: pulumi.ProviderResource,
  options: CertManagerApplicationServicesOptions
): kubernetes.helm.v3.Release => {
  if (providerName !== 'digitalocean')
    throw Error(`Cert-manager not set for provider ${providerName}`)

  const { domain, namespace } = options
  const email = options?.email || `admin@${domain[0].name}`

  const ns = getNameSpace(provider, namespace)

  const ingressClass = 'nginx'

  const name = 'cert-manager'
  const release = new kubernetes.helm.v3.Release(
    childName(parentName, name),
    {
      chart: 'cert-manager',
      version: '1.5.4',
      repositoryOpts: {
        repo: 'https://charts.jetstack.io'
      },
      name,
      namespace: ns.metadata.name,
      values: {
        installCRDs: true,
        ingressShim: {
          defaultIssuerName: 'letsencrypt-production',
          defaultIssuerKind: 'ClusterIssuer',
          defaultIssuerGroup: 'cert-manager.io'
        }
      },
      skipAwait: false
    },
    { provider }
  )

  // ? install CRDS with Helm?
  // const crds = new kubernetes.yaml.ConfigFile(
  //   'cert-manager-crds',
  //   {
  //     file: 'https://github.com/jetstack/cert-manager/releases/download/v1.5.4/cert-manager.crds.yaml',
  //     resourcePrefix: parentName
  //   },
  //   { provider }
  // )
  const { secret, solver } = doDns(parentName, provider, options)

  // ? remove?
  // new certmanager.v1.Certificate(
  //   childName(parentName, 'acme-crt'),
  //   {
  //     metadata: {
  //       name: 'acme-crt',
  //       namespace: ns.metadata.name,
  //       annotations: {
  //         'reflector.v1.k8s.emberstack.com/secret-reflection-allowed': 'true',
  //         'reflector.v1.k8s.emberstack.com/secret-reflection-auto-enabled':
  //           'true'
  //       }
  //     },
  //     spec: {
  //       secretName: 'acme-crt-secret',
  //       dnsNames: domain.map(({ name }) => [name, `*.${name}`]).flat(),
  //       issuerRef: {
  //         name: 'letsencrypt-production',
  //         kind: 'ClusterIssuer'
  //       }
  //     }
  //   },
  //   {
  //     provider,
  //     dependsOn: [release]
  //   }
  // )

  // TODO use kubed and cert-manager's secretTemplate present in 1.5 - but very little documentation
  new kubernetes.core.v1.Secret(
    childName(parentName, 'acme-crt-secret-mirror'),
    {
      metadata: {
        name: 'acme-crt-secret-mirror',
        namespace: ns.metadata.name,
        annotations: {
          'reflector.v1.k8s.emberstack.com/reflects': pulumi.interpolate`${ns.metadata.name}/acme-certificate-secret`
        }
      },
      type: 'Opaque',
      data: {}
    },
    {
      provider,
      dependsOn: [release]
    }
  )

  // TODO certmanager provider: DO solver as a parameter
  new certmanager.v1.ClusterIssuer(
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
          privateKeySecretRef: { name: 'acme-certificate-secret' },
          solvers: [{ http01: { ingress: { class: ingressClass } } }, solver]
        }
      }
    },
    {
      provider,
      dependsOn: [release, secret]
    }
  )

  return release
}
