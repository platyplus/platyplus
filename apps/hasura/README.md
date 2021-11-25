# Hasura docker image

This Docker image wraps the SQL schema and Hasura metadata that are needed for the frontend to run correctly with the [official Hasura docker image](https://hub.docker.com/r/hasura/graphql-engine).

:::caution

This docker image cannot be used to wrap again custom Hasura metatada and migrations, as it won't be able to merge the core Platyplus metadata and migrations with the custom ones.

Although maybe not ideal, the current recommended approach to deploy is to:

1. use this docker image for deployment
2. Once Hasura is ready, apply the custom migrations and metadata with the Hasura console. Be sure your custom metadata includes all the information about the Platyplus schema and Hasura Backend Plus (this should be the case when following the [installation instructions](/docs/guide))

:::
