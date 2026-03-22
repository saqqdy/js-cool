# contains <Badge type="info" text="since v2.2.1" />

Check if an array contains an element.

## Usage

```js
import { contains } from 'js-cool'
```

## Signature

```typescript
function contains<T>(arr: T[], item: T): boolean
```

## Parameters

| Parameter | Type  | Description         |
| --------- | ----- | ------------------- |
| `arr`     | `T[]` | The array to search |
| `item`    | `T`   | The item to find    |

## Returns

`boolean` - `true` if item is in array.

## Examples

```js
contains([1, 2, 3], 2) // true
contains([1, 2, 3], 4) // false
contains(['a', 'b'], 'a') // true
```
