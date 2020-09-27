/* eslint-env node */
require('dotenv').config()
module.exports = {
  client: {
    includes: ['./hooks/src/**/*.ts', './worker/src/**/*.ts', './src/**/*'],
    excludes: ['./src/schema.graphql'],
    service: {
      name: 'hasura',
      // localSchemaFile: './schema.graphql',
      url: 'http://localhost:8080/v1/graphql',
      headers: {
        'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET
      },
      skipSSLValidation: true
    }
  }
}
