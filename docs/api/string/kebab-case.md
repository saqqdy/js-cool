# kebabCase <Badge type="info" text="since v6.0.0" />

Converts string to kebab case.

## Usage

```js
import { kebabCase } from 'js-cool'
```

## Signature

```typescript
function kebabCase(str: string): string
```

## Parameters

| Parameter | Type     | Description           |
| --------- | -------- | --------------------- |
| `str`     | `string` | The string to convert |

## Returns

`string` - The kebab case string.

## Examples

```js
kebabCase('Foo Bar') // 'foo-bar'
kebabCase('fooBar') // 'foo-bar'
kebabCase('__FOO_BAR__') // 'foo-bar'
kebabCase('fooBarBaz') // 'foo-bar-baz'
```

## Related

- [snakeCase](/api/string/snake-case) - Convert string to snake case
