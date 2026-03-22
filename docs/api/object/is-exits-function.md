# isExitsFunction <Badge type="info" text="since v1.0.1" />

The presence or absence of the specified function.

## Usage

```js
import { isExitsFunction } from 'js-cool'
```

## Signature

```typescript
function isExitsFunction(name: string): boolean
```

## Parameters

| Parameter | Type     | Description       |
| --------- | -------- | ----------------- |
| `name`    | `string` | The function name |

## Returns

`boolean` - `true` if the function exists, `false` otherwise.

## Examples

```js
// Check global function
isExitsFunction('console.log') // true

// Check non-existent function
isExitsFunction('test') // false

// Check built-in functions
isExitsFunction('Array.isArray') // true
isExitsFunction('JSON.parse') // true

// Check nested function
isExitsFunction('document.querySelector') // true
```

## Notes

- Supports nested function names with dot notation
- Uses a safe evaluation method to check function existence
- Returns `false` if the function throws an error during evaluation

## Related

- [isExitsVariable](./is-exits-variable.md) - Check if a variable exists
