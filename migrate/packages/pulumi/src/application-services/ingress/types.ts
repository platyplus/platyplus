import { CommonServiceOptions, DnsDomain } from '../../types'

export type IngressOptions = CommonServiceOptions & {
  domain: DnsDomain[]
  email?: string
}
