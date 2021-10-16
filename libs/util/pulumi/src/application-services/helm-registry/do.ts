import * as digitalocean from '@pulumi/digitalocean'
import * as kubernetes from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'

import { DO_DEFAULT_REGION } from '../../clusters'
import { childName, getNameSpace } from '../../helpers'
import { HelmRegistryInitOptions } from './types'

export const digitalOceanHelmRegistry = (
  parentName: string,
  provider: pulumi.ProviderResource,
  options: HelmRegistryInitOptions
): kubernetes.helm.v3.Release => {
  const { domain, namespace, additionalRoutes } = options
  const ns = getNameSpace(provider, namespace)
  const name = options.name || 'charts'

  const tls = options.tls !== false
  const ingress = options.ingress !== false
  const basicAuth = options.basicAuth
    ? {
        BASIC_AUTH_USER: options.basicAuth.username,
        BASIC_AUTH_PASS: options.basicAuth.password
      }
    : {}

  const bucketRegion = options.bucketRegion || DO_DEFAULT_REGION
  const bucketName = options.bucketName || childName(parentName, name)
  const bucketPrefix = options.bucketPrefix || 'charts'

  const spacesBucket = new digitalocean.SpacesBucket(
    childName(parentName, name),
    {
      acl: 'private',
      // forceDestroy: false,
      name: bucketName,
      region: bucketRegion
    },
    {
      // protect: true
    }
  )

  const doConfig = new pulumi.Config('digitalocean')
  const spacesAccessId = doConfig.requireSecret('spacesAccessId')
  const spacesSecretKey = doConfig.requireSecret('spacesSecretKey')

  return new kubernetes.helm.v3.Release(
    childName(parentName, name),
    {
      chart: 'chartmuseum',
      version: '3.3.0',
      name,
      namespace: ns.metadata.name,
      repositoryOpts: {
        repo: 'https://chartmuseum.github.io/charts'
      },
      values: {
        env: {
          open: {
            DISABLE_API: false,
            AUTH_ANONYMOUS_GET: true,
            ALLOW_OVERWRITE: true,
            STORAGE: 'amazon',
            STORAGE_AMAZON_REGION: bucketRegion,
            STORAGE_AMAZON_BUCKET: bucketName,
            STORAGE_AMAZON_PREFIX: bucketPrefix,
            STORAGE_AMAZON_ENDPOINT: `https://${bucketRegion}.digitaloceanspaces.com`
          },
          secret: {
            AWS_ACCESS_KEY_ID: spacesAccessId,
            AWS_SECRET_ACCESS_KEY: spacesSecretKey,
            ...basicAuth
          }
        },
        ingress: ingress
          ? {
              enabled: true,
              ingressClassName: 'nginx',
              annotations: {
                'kubernetes.io/tls-acme': 'true'
              },
              hosts: [
                ...domain.map((d) => d.name),
                ...(additionalRoutes || [])
              ].map((d) => {
                const host: Record<string, unknown> = {
                  name: `${name}.${d}`,
                  path: '/'
                }
                if (tls) {
                  host.tls = true
                  host.tlsSecret = `${name}.tls-secret`
                }
                return host
              })
            }
          : { enabled: false }
      }
    },
    { provider, dependsOn: [spacesBucket] }
  )
}
