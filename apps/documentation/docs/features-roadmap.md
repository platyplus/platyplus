---
id: features
title: Features & Roadmap
sidebar_label: Features & Roadmap
---

#### Legend

- ✅ implemented
- 🟠 partially implemented
- 📅 planned
- ❔ considered feature, to be further analysed
- ❌ won't be implemented

## Contents Management

| Feature                                            | Status | Description                                                               |
| -------------------------------------------------- | :----: | ------------------------------------------------------------------------- |
| Real-time changes from/to the backend              |   ✅   |
| Offline mode                                       |   🟠   |
| One to Many relationships                          |   ✅   |
| Many to Many relationships                         |   ✅   |
| Many to One relationships                          |   ✅   |
| One to One relationships                           |   🟠   |
| Generation of migration files                      |   ✅   |
| Role-based permissions                             |   ✅   |
| Multiple roles permissions                         |   ✅   |
| Field-level create/insert/update permissions       |   ✅   |
| Inherited roles                                    |   📅   |
| Soft delete                                        |   ✅   |
| Required fields (SQL `not null` & contraints)      |   ✅   |
| Default values (SQL, column presets)               |   🟠   |
| Basic field validation rules                       |   📅   |
| Field validation rules based on Hasura permissions |   📅   |
| Isomorphic validation rules                        |   📅   |
| Indexes                                            |   📅   |
| Cascade delete                                     |   ✅   |
| `On Delete` constraints                            |   📅   |
| `On Update` constraints                            |   📅   |
| Persisted computed fields                          |   📅   |
| Transient computed fields                          |   📅   |
| Hasura remote schemas                              |   ❔   |
| Multiple databases                                 |   ❌   |
| `created_at` field                                 |   📅   |
| `deleted_at` field                                 |   📅   |
| Conflict resolution                                |   📅   |
| Auditable modifications                            |   ❔   |
| Modify contents structure in a single place        |   ❔   | For the moment, both the Hasura Console and the Platyplus UI are required |
| Custom icon sets                                   |   ❔   |
| Internationalisation                               |   📅   |
| Encryption                                         |   📅   |

## User Interface

| Feature                                     | Status | Description |
| ------------------------------------------- | :----: | ----------- |
| Customisable home page                      |   📅   |
| Orderable side menu                         |   ✅   |
| Orderable columns                           |   ✅   |
| Collection/document/field component options |   📅   |
| Configurable side menu items                |   📅   |
| Custom pages                                |   📅   |
| Paginate a collection                       |   📅   |
| Filter a collection                         |   📅   |
| Find a document from QR code / barcode      |   📅   |
| Sort a collection                           |   📅   |

### User account management

| Feature                     | Status | Description |
| --------------------------- | :----: | ----------- |
| Registration page           |   ✅   |
| Optional registration page  |   📅   |
| Login page                  |   ✅   |
| Profile page                |   🟠   |
| Password change             |   📅   |
| OAuth                       |   📅   |
| Multi-factor authentication |   📅   |
| Email verification          |   📅   |
| Dark/light mode             |   📅   |

## Developer Experience

| Feature                                                | Status | Description |
| ------------------------------------------------------ | :----: | ----------- |
| Deploy with Helm charts                                |   ✅   |
| Deploy with docker-compose                             |   📅   |
| Docker images                                          |   ✅   |
| NPM packages                                           |   ✅   |
| Pulumi plugin                                          |   ✅   |
| Platyplus Tilt extension                               |   📅   |
| Hasura & Hasura-backend-plus Tilt extensions           |   ✅   |
| Build frontend from a new React project                |   📅   |
| Additional custom collection/document/field components |   🟠   |

## Components

### Collections

| Title     | Status | Details |
| --------- | :----: | ------- |
| Table     |   ✅   |
| Card list |   ✅   |
| Map       |   📅   |
| Calendar  |   📅   |
| Charts    |   📅   |

### Documents

| Title            | Status | Details                                                       |
| ---------------- | :----: | ------------------------------------------------------------- |
| Basic form       |   ✅   |
| Grid layout      |   📅   |
| Tag              |   ✅   |
| Label            |   ✅   |
| Nested documents |   📅   | Create/update/delete/add/remove a child doc from a parent doc |

### Fields

| Title                 | Status | Details                                                                     |
| --------------------- | :----: | --------------------------------------------------------------------------- |
| Date                  |   ✅   |
| Date-time             |   ✅   |
| Time                  |   ✅   |
| Integer               |   ✅   |
| Number                |   ✅   |
| String                |   ✅   |
| Toggle                |   ✅   |
| Checkbox              |   ✅   |
| Select one            |   ✅   |
| Select multiple       |   ✅   |
| Email                 |   📅   |
| Charts                |   📅   |
| Map pin               |   📅   |
| Icon                  |   🟠   | Icons are available in collection and field labels, but not in fields yet.  |
| Avatar                |   🟠   | Avatars are partially available in the user profile, but not in fields yet. |
| File                  |   📅   |
| URL                   |   📅   |
| Image/video link      |   📅   |
| Stored image/video    |   📅   |
| Time period (from-to) |   📅   |
| Markdown text         |   📅   |
