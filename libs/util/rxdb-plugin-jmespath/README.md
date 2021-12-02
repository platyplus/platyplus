# RxDB JMESPath plugin

## Installation

```bash
yarn add @platyplus/rxdb-plugin-jmespath
```

Then load the plugin in your code:

```js
import { plugin } from '@platyplus/rxdb-plugin-jmespath'
import { addRxPlugin } from 'rxdb'
addRxPlugin(plugin)
```

## Usage

### `RxDocument.jmespath$`

```typescript
declare module 'rxdb' {
  export interface RxDocumentBase {
    jmespath$: (
      expression: string | Observable<string>,
      options?: { systemFields?: boolean = false; deleted?: boolean = false }
    ) => Observable<any>
  }
}
```

Example:

```typescript
const document = await myCollection.findOne('document-id')
document.jmespath$.subscribe((result) => {
  console.log(result)
})
```

## Options

### System fields

By default, every field starting with `_` will be ignored. Set the `systemFields` option to `true` to include them.

### Deleted documents

By default, documents marked as deleted are not taken into account in the result. Set the `deleted` option to `true` to include them.
