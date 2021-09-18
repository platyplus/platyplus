---
id: configuration
title: Configuration
sidebar_label: Configuration
---

## Create a table

### Create the system columns

| name         | type                | default                  |
| ------------ | ------------------- | ------------------------ |
| `id`         | `gen_random_uuid()` | primary key              |
| `updated_at` | `timestamptz`       | Hasura built-in function |
| `deleted`    | `boolean`           | `false`                  |

### Create columns

- type mapping

- required fields and is_nullable

- default values

### Create relationships

- the primary key should be not used as a foreign key in the same table

- Many to One / One to Many

- unidirectional / bidirectional

- Many to Many
  - composite primary key
  - each pk is fk to the two colums
  - only two columns
  - permissions: select both columns, and aggregation queries
  - defines both relations in the join column

### Create indexes

Although the following indexes are not mandatory, they are strongly recommended to reach acceptable performance in the fetching data between the backend and the frontend in GraphQL:

- (updated_at)
- (updated_at, id)
-

- sortable fields?

### Update Hasura role permissions

You have to make sure the desired roles have read access to system columns.

| name          | select | insert                                    | update                                           | delete |
| ------------- | ------ | ----------------------------------------- | ------------------------------------------------ | ------ |
| id            | yes    | if the role is allowed to create a record | never                                            | never  |
| updated_at    | yes    | never                                     | never                                            | never  |
| deleted       | yes    | never                                     | if the role is allowed to soft delete the record | never  |
| {other}       |        |                                           |                                                  |        |
| {relation_id} |        |                                           |                                                  |        |

### Additional configuration

Some configuration cannot be inferred from the PostgreSQL schema or the Hasura metadata, such as column order etc. It is stored in the XXX YYY ZZZ tables. Configuration can be entered in using either the Hasura console to insert records, or from the Platyplus frontend as a user who has the `admin` role.

It is worth to mention that the Hasura migration system only tracks DDL and not DML (data) operations, meaning the information stored in these tables won't be automatically added to the migration files. It is recommended to [create manual migrations](https://hasura.io/docs/1.0/graphql/core/migrations/advanced/writing-migrations-manually.html) with this configuration data so it becomes part of any deployment of the application.

- tables

- column/properties

- bookmarks

## Roles and permissions

### System roles

Every user can have multiple roles, although Hasura does not combine multiple roles when running a given GraphQL operation.

Platyplus comes with four pre-defined system roles:

- `user` is the default role allocated to an end user.

- `me` is the role that allows access to information related to the authenticated user.

- `admin` corresponds to the Hasura admin role, meaning

- `anonymous` is the role used to define access rights to unauthenticated users i.e. public access to the GraphQL API. By default, nothing can be accessed publicly.

### Create a new role

1.  insert the role in the `auth.roles` table

2.  update the role permissions in the metadata schema

Make sure the role will be able to fetch metadata information

3.  Define permissions in data tables
