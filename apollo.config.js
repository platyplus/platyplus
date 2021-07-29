module.exports = {
  client: {
    includes: ['./libs/data-access/rxdb-hasura/src/**/*.{ts,graphql}'],
    service: {
      name: 'platyplus-hasura',
      url: 'http://localhost:8080/v1/graphql',
      // optional headers
      headers: {
        'x-hasura-admin-secret': 'hasura-dev-secret'
      },
      // optional disable SSL validation check
      skipSSLValidation: true
    }
  }
}
