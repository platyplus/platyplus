import { CommonServiceOptions, DnsDomain } from '../../types'

export type CertManagerApplicationServicesOptions = CommonServiceOptions & {
  domain: DnsDomain[]
  email?: string
}
