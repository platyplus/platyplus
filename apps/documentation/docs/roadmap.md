---
id: roadmap
title: Roadmap
sidebar_label: Roadmap
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
| Multiple roles per user                            |   📅   |
| Soft delete                                        |   ✅   |
| Required fields (SQL `not null` & contraints)      |   ✅   |
| Default values (SQL, column presets)               |   🟠   |
| Basic field validation rules                       |   📅   | Min-max length, emails, formats..                                         |
| Field validation rules based on Hasura permissions |   📅   |
| Isomorphic validation rules                        |   📅   |
| Indexes                                            |   📅   |
| Cascade delete                                     |   ✅   | reflect the `on delete cascade` constraint on foreign keys                |
| Persisted computed fields                          |   📅   |
| Transient computed fields                          |   📅   |
| Hasura remote schemas                              |   ❔   |
| Multiple databases                                 |   ❌   |
| `created_at` field                                 |   📅   |
| `created_by` field                                 |   📅   |
| `deleted_at` field                                 |   📅   |
| Conflict resolution                                |   📅   |
| Auditable modifications                            |   ❔   | Log the history of modifications done                                     |
| Auditable access                                   |   ❔   |
| Modify contents structure in a single place        |   ❔   | For the moment, both the Hasura Console and the Platyplus UI are required |
| Custom icon sets                                   |   ❔   |
| Internationalisation                               |   📅   |
| Encryption                                         |   📅   |

## User Interface

| Feature                                     | Status | Description                                                                                                                |
| ------------------------------------------- | :----: | -------------------------------------------------------------------------------------------------------------------------- |
| Custom public resources                     |   ❔   |                                                                                                                            |
| Customisable home page                      |   🟠   | The home page of authenticated users is stored in the backend, but the public home page isn't                              |
| Orderable side menu                         |   ✅   |
| Orderable columns                           |   ✅   |
| Collection/document/field component options |   📅   |
| Configurable side menu                      |   ✅   |
| Custom pages                                |   🟠   | Basic rich-text editor. Still missing: ability to use information from the user profile, or other documents or collections |
| Paginate a collection                       |   📅   |
| Filter a collection                         |   📅   |
| Find a document from QR code / barcode      |   📅   |
| Sort a collection                           |   📅   |

### User account management

| Feature                              | Status | Description                                                                       |
| ------------------------------------ | :----: | --------------------------------------------------------------------------------- |
| Registration page                    |   ✅   |
| Optional registration page           |   📅   | For the moment, registration is activated. It should be possible to deactivate it |
| Login page                           |   ✅   |
| Profile page                         |   🟠   | The avatar input field should be improved                                         |
| Password change                      |   📅   |
| OAuth                                |   📅   | Ability to authenticate with OAuth e.g. Google, Facebook, GitHub...               |
| Multi-factor authentication          |   📅   |
| Registration with email confirmation |   📅   |
| Dark/light mode                      |   ✅   | Not persisted in the backend but in the browser local storage                     |

## Developer Experience

| Feature                                                | Status | Description |
| ------------------------------------------------------ | :----: | ----------- |
| Deploy with Helm charts                                |   ✅   |
| Deploy with docker-compose                             |   📅   |
| Docker images                                          |   ✅   |
| NPM packages                                           |   ✅   |
| Pulumi plugin                                          |   ✅   |
| Tilt extension                                         |   ✅   |
| Build frontend from a new React project                |   📅   |
| Additional custom collection/document/field components |   🟠   |

## Components

### Collections

| Title    | Status | Details |
| -------- | :----: | ------- |
| Table    |   ✅   |
| List     |   ✅   |
| Gallery  |   📅   |
| Kanban   |   📅   |
| Map      |   📅   |
| Calendar |   📅   |
| Charts   |   📅   |

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
| Currency              |   📅   |
| Percent               |   📅   |
| Duration              |   📅   |
| Geometry              |   📅   |
| Rating                |   📅   |
| Phone number          |   📅   |
| Email                 |   📅   |
| Charts                |   📅   | show a many to many relationship as charts                                  |
| Icon                  |   🟠   | Icons are available in collection and field labels, but not in fields yet.  |
| Avatar                |   🟠   | Avatars are partially available in the user profile, but not in fields yet. |
| File                  |   📅   |
| URL                   |   📅   |
| Image/video link      |   📅   |
| Stored image/video    |   📅   |
| Time period (from-to) |   📅   |
| Markdown text         |   📅   |
