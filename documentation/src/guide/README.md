# Introduction

Platy DevTools are a set of tools that aim to make development of microservices easier.

They also aim to avoid vendor lockin and to be able to deliver applications on most cloud providers, or on premises. As a consequence, their target environment is Kubernetes.

As developping applications in Kubernetes can be challenging, the devtools are extensively using Helm Charts and Skaffold, so the development and deployment pipelines are simplified as much as possible, and so the produced artifacts can be used in another context.

The set of tools presented in this documentation reflect some [development principles](./development-principles.md). In particular, a great effort has been made to ease code reuse, hence the code organisation as monorepo, and the use of Lerna and Yarn Workspaces.

Finally, on an applicative standpoint, some functionnalities are reccurrent, such as database design, storage, authentication, authorisation, API... The tools are strongly oriented towards GraphQL and Hasura.

Last, applications need strong, reliable frontends. PlatyPlus DevTools are mostly oriented towards Vue, in particular Quasar, in order to rapidly deliver hybrid apps.

For further information or any suggestion, [open an issue on GitHub](https://github.com/platyplus/platyplus/issues/new) or connect to [Discord](https://discord.gg/Bez8xY).
