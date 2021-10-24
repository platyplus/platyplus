---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /
---

Platyplus fastens the delivery of applications in defining a PostgreSQL schema, enriching it with Hasura permissions and relationships, and bringing the logic to the frontend, in order to avoid the hussle to redefine forms, validation rules and schema logic again.

Contents is then exposed as collections, documents, and fields. As configuration can sometimes not be guessed from the Postgres DDL and the Hasura metadata (e.g. order of the fields, human-readable column names...), an additional customisation layer is stored on the backend, in order to always keep the same frontend application and avoid writing a single line of code.

As Platyplus brings the Hasura roles and permissions system to the frontend, users can share the same records of a table, but with different permissions, so it can support quite complex collaborative logic such as workflows.

Platyplus is designed to work real-time: it will reflect every available change in the Postgres database to the frontend, and vice-versa. It is also meant to be offline-first.

Platyplus is currently based on four main blocks:

- A PostgreSQL database
- All the (awesome) features of [Hasura](https://hasura.io/) are therefore available. Data definition and configuration is shared with the frontend through a dedicated SQL schema
- [Hasura-backend-plus](https://github.com/nhost/hasura-backend-plus) acts as a Hasura side-car to handle user management and authentication.
- A PWA application build on React and RxDB is available as a static site that can be served by any web server.

Platyplus has been designed to avoid vendor lockin as much as possible. It is therefore designed to be deployed on Kubernetes cluster, i.e. either on-premises on in the cloud. Given its modular, containerised architecture, it can also be deployed on less agnostic stacks such as AWS RDS, ECS and Amplify.

Platyplus is and will always be open-source.
