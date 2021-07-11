import { TableFragment } from '../generated'
import { Metadata } from '../types'

export const modifier = (doc: TableFragment): Metadata => {
  const { propertiesConfig, ...metadata } = doc
  return {
    ...metadata,
    propertiesConfig: propertiesConfig.reduce(
      (aggr, { property_name, ...config }) => {
        aggr[property_name] = config
        return aggr
      },
      {}
    )
  }
}
