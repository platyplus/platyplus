// TODO make it work monorepo
module.exports = {
  client: {
    includes: ['./platyplus/frontend/src/**/*.graphql'],
    service: {
      name: 'incubator-hasura',
      url: 'http://hasura.localhost/v1/graphql',
      // optional headers
      headers: {
        'x-hasura-admin-secret': 'development-hasura-admin-secret'
      },
      // optional disable SSL validation check
      skipSSLValidation: true
    }
  }
}
