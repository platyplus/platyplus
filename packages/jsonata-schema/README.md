# `@platyplus/jsonata-schema`

JSONata variables extractor

## Installation

```sh
yarn add @platyplus/jsonata-schema
```

## Usage

```js
import { jsonataPaths } from '@platyplus/jsonata-schema'
const expression = '$sum(Account.Order.Product.(Price * Quantity))'
const schema = jsonataPaths(expression)
console.log(JSON.stringify(schema)) // outputs {"Account":{"Order":{"Product":{"Price":true,"Quantity":true}}}}
```
