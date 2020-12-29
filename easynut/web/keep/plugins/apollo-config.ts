// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export default (context: any) => {
  // do stuff
  console.log('client config')
  return {
    httpEndpoint: 'http://hasura.localhost/graphql',
    /*
     * For permanent authentication provide `getAuth` function.
     * The string returned will be used in all requests as authorization header
     */
    getAuth: () => {
      console.log('get auth')
      const token = context.$auth.getJWTToken()
      return token ? `Bearer ${token}` : ''
    }
  }
}
