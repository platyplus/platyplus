import * as digitalocean from '@pulumi/digitalocean'

import { CommonServiceOptions, DnsDomain } from '../../types'

// TODO generic region type
export type HelmRegistryOptions = {
  name?: string
  bucketName?: string
  bucketRegion?: digitalocean.Region
  bucketPrefix?: string
  basicAuth?: {
    username: string
    password: string
  }
}

export type HelmRegistryInitOptions = HelmRegistryOptions &
  CommonServiceOptions & {
    tls?: boolean
    ingress?: boolean
    domain: DnsDomain[]
  }
