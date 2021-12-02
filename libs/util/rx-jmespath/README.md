# RxJS JMESPath package

Adaptation of the official [Javascript JMESPath package](https://github.com/jmespath/jmespath.js/) to work along with [RxJS](https://rxjs.dev/).

Passes all the original compliance tests.

## Installation

```bash
yarn add @platyplus/rx-jmespath
```

## Usage

### `search$` operator

```typescript
function search$(
  expression: string | Observable<string>,
  options: SearchOptions
): (data$: Observable<any>) => Observable<any>
```

Example:

```js
import { search$ } from '@platyplus/rx-jmespath'
import { of } from 'rxjs'

of({ a: { b: { c: 'hello' } } })
  .pipe(search$('a.b.c'))
  .subscribe((result) => {
    console.log(result) // <- returns 'hello'
  })
```

### `search`

Exact same function as in the official package:

```typescript
search(obj: any, expression: string ) => any
```

## Options

```typescript
type SearchOptions<T = CustomOptions> = T & {
  getField?: FieldGetter<T>
  getIdentity?: IdentityGetter<T>
  circularData?: boolean
}
```

### Field getter

```typescript
const getField: FieldGetter<T = Record<string,unknown>> = (
  obj: any,
  property: string | number,
  options: SearchOptions<T>
): Observable<any> => {
  return of(obj[key] ?? null)
}
```

### Identity getter

```typescript
const getIdentity: IdentityGetter<T = Record<string,unknown>> = (
  obj: any,
  options: SearchOptions<T>
): Observable<any> => {
  return of(obj)
}
```

### Circular data

Sometimes, objects are mutually referenced, so browsing them entirely would create an infinite loop. You can prevent this in setting this option to `true.

When `true`, the expression `*` expression raises an error instead of making the processing fail.

The `circularData` option defaults to `false`.
