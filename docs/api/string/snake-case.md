# snakeCase <Badge type="info" text="since v6.0.0" />

Converts string to snake case.

## Usage

```js
import { snakeCase } from 'js-cool'
```

## Signature

```typescript
function snakeCase(str: string): string
```

## Parameters

| Parameter | Type     | Description           |
| --------- | -------- | --------------------- |
| `str`     | `string` | The string to convert |

## Returns

`string` - The snake case string.

## Examples

```js
snakeCase('Foo Bar') // 'foo_bar'
snakeCase('fooBar') // 'foo_bar'
snakeCase('--FOO-BAR--') // 'foo_bar'
snakeCase('fooBarBaz') // 'foo_bar_baz'
```

## Related

- [kebabCase](/api/string/kebab-case) - Convert string to kebab case
