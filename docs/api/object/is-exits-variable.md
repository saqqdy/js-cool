# isExitsVariable

The presence or absence of the specified variable.

## Usage

```js
import { isExitsVariable } from 'js-cool'
```

## Signature

```typescript
function isExitsVariable(name: string): boolean
```

## Parameters

| Parameter | Type     | Description       |
| --------- | -------- | ----------------- |
| `name`    | `string` | The variable name |

## Returns

`boolean` - `true` if the variable exists, `false` otherwise.

## Examples

```js
// Check global variable
isExitsVariable('window') // true

// Check non-existent variable
isExitsVariable('test') // false

// Check built-in variables
isExitsVariable('document') // true
isExitsVariable('navigator') // true
```

## Notes

- This function checks if the variable name is defined
- Uses a try-catch approach to safely check variable existence
- Returns `false` if accessing the variable would throw an error

## Related

- [isExitsFunction](./is-exits-function.md) - Check if a function exists
