# isFunctionExists <Badge type="info" text="since v6.0.0" />

Check if a function exists in the global scope.

## Usage

```js
import { isFunctionExists } from 'js-cool'
```

## Signature

```typescript
function isFunctionExists(name: string): boolean
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
isFunctionExists('console.log') // true

// Check non-existent function
isFunctionExists('test') // false

// Check built-in functions
isFunctionExists('Array.isArray') // true
isFunctionExists('JSON.parse') // true

// Check nested function
isFunctionExists('document.querySelector') // true
```

## Notes

- Supports nested function names with dot notation
- Uses a safe evaluation method to check function existence
- Returns `false` if the function throws an error during evaluation
- To check if a global variable exists, use `getGlobal(name) !== undefined`

## Related

- [getGlobal](../utility/get-global.md) - Get global variable by path
