# isNil

Checks if value is null or undefined.

## Usage

```js
import { isNil } from 'js-cool'
```

## Signature

```typescript
function isNil(value: unknown): value is null | undefined
```

## Parameters

| Parameter | Type      | Description      |
| --------- | --------- | ---------------- |
| `value`   | `unknown` | The value to check |

## Returns

`boolean` - `true` if value is null or undefined, `false` otherwise.

## Examples

```js
isNil(null)
// => true

isNil(undefined)
// => true

isNil('')
// => false

isNil(0)
// => false

isNil(false)
// => false

isNil([])
// => false

isNil({})
// => false
```

## Related

- [isEmpty](./is-empty.md) - Check if value is empty
