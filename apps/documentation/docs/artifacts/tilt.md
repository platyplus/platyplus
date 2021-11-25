---
id: tilt
title: Tilt extensions
sidebar_label: Tilt
---

import CodeBlock from '@theme/CodeBlock';
import Tiltfile from '!!raw-loader!@site/static/examples/Tiltfile';
import TiltfileAdvanced from '!!raw-loader!@site/static/examples/Tiltfile-advanced';

## Tilt extensions

To develop in a Kubernetes environment can be quite hard. [Tilt](https://tilt.dev) makes things way easier.

An Hasura extension is already part of the [Tilt extensions](https://github.com/tilt-dev/tilt-extensions/tree/master/hasura).

Another set of [Tilt helpers](https://github.com/platyplus/tilt-modules) is available to ease developping custom Platyplus applications.

### Basic usage

Here is the simplest `Tiltfile` that would start an new Platyplus project in the active Kubernetes cluser:

<CodeBlock className="language-python" title="Tiltfile">{Tiltfile}</CodeBlock>

### Advanced usage

<CodeBlock className="language-python" title="Tiltfile">{TiltfileAdvanced}</CodeBlock>

#### Options

| Argument                 | Description                                                                                                                                                                                                     | Default value         |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| release_name             | Helm Chart release name                                                                                                                                                                                         | `'platyplus'`         |
| frontend_port            | Local frontend port                                                                                                                                                                                             | `4200`                |
| hasura_port              | Local Hasura port                                                                                                                                                                                               | `8080`                |
| hasura_backend_plus_port | Local HBP port                                                                                                                                                                                                  | `9000`                |
| hasura_secret            | Hasura admin secret                                                                                                                                                                                             | `'hasura-dev-secret'` |
| postgres_password        | self explanatory                                                                                                                                                                                                | `'fixed1234'`         |
| hasura_path              | Local path where the Hasura files will be stored                                                                                                                                                                | `'.'`                 |
| frontend_build           | If `True` and `frontend_path` is set, will replace the standard frontend app by a custom one                                                                                                                    | `False`               |
| frontend_path            | Path of the sources of the custom app. If a `Dockerfile` is present, will use it. If not, will fall back to a basic [yarn Dockerfile](https://github.com/platyplus/tilt-modules/blob/main/platyplus/Dockerfile) | `None`                |
| entrypoint               | Entrypoint of the custom Docker image, when used                                                                                                                                                                | `'yarn start'`        |
| values                   | Additional key-values to be added to the Helm Chart                                                                                                                                                             | `{}`                  |
