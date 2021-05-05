# Tests

## One

```
visites.{
  'period': $toMillis(updated_at) ~> $fromMillis('[D01]/[M01]/[Y]')
  }{`period`:  $count($)}
```

returns

```js
{
  visites: {
    updated_at: true
  }
}
```

## Two

```
$each(
  visites.{
      'period': $toMillis(updated_at) ~> $fromMillis('[Y][M01][D01]'),
      'label': $toMillis(updated_at) ~> $fromMillis('[D01]/[M01]/[Y]'),
      'other': 1
      }{`period`: {
          'value': $count($),
          'label': $distinct(label)
          }},
          function($v, $k) {
              {
                  'x': $number($k),
              'y': $v.value,
              'label': $v.label
              }
              }
          )
```

returns

```js
{
  visites: {
    updated_at: true
  }
}
```
