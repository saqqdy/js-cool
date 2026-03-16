# isArray

Check if value is an array.

## Usage

```js
import { isArray } from 'js-cool'
```

## Signature

```typescript
function isArray(value: any): value is any[]
```

## Parameters

| Parameter | Type  | Description    |
| --------- | ----- | -------------- |
| `value`   | `any` | Value to check |

## Returns

`boolean` - `true` if value is an array.

## Examples

```js
isArray([1, 2, 3]) // true
isArray('hello') // false
isArray({ length: 3 }) // false
isArray(null) // false
```
