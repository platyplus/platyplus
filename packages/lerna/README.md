# `@platyplus/lerna`

A simple node API that wraps some Lerna commands

## Installation

```sh
yarn add @platyplus/lerna
```

## Usage

```js
import lerna from '@platyplus/lerna'

...

const p = await getLernaPackage ('@my-org/package-name')
console.log(p)
/*
{
    name: '@my-org/package-name'
    location: '/absolute/path/to/package'
    version: 'package-version'
    private: true/false
}
*/

// Scope is optional
const list = await getLernaPackages(scope)
console.log(list)
/*
[{
    name: '@my-org/package-name'
    location: '/absolute/path/to/package'
    version: 'package-version'
    private: true/false
},
{
    name: '@my-org/other-package'
    location: '/absolute/path/to/other-package'
    version: 'package-version'
    private: true/false
}]
*/

// Scope is optional
const deps = await getLernaDependencies(scope)

// Scope is optional
const exists = await hasLernaPackage(scope)

```
