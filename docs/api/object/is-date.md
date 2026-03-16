# isDate

Check if value is a Date object.

## Usage

```js
import { isDate } from 'js-cool'
```

## Signature

```typescript
function isDate(value: any): value is Date
```

## Parameters

| Parameter | Type  | Description    |
| --------- | ----- | -------------- |
| `value`   | `any` | Value to check |

## Returns

`boolean` - `true` if value is a Date.

## Examples

```js
isDate(new Date()) // true
isDate('2024-01-01') // false
isDate(1704067200000) // false
```
