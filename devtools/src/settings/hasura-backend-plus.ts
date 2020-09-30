import { ServiceTypeConfig } from './types'

export const hasuraBackendPlusConfig: ServiceTypeConfig = ({
  directory,
  name
}) => ({
  main: {
    build: {
      image: `${directory}-${name}`,
      context: name
    }
  },
  dev: {
    build: false
    // helm: {
    //   setValues: {
    //     adminSecret: 'development-hasura-admin-secret',
    //     jwt: {
    //       key: 'long-hasura-jwt-more-than-thirty-two-characters',
    //       algorithm: 'HS256'
    //     }
    //   }
    // }
  },
  chartName: 'hasura-backend-plus'
})
