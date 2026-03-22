# isPlainObject <Badge type="info" text="since v5.0.0" />

Check if value is a plain object (created by `{}` or `new Object()`).

## Usage

```js
import { isPlainObject } from 'js-cool'
```

## Signature

```typescript
function isPlainObject(value: any): value is Record<string, any>
```

## Parameters

| Parameter | Type  | Description    |
| --------- | ----- | -------------- |
| `value`   | `any` | Value to check |

## Returns

`boolean` - `true` if value is a plain object.

## Examples

```js
isPlainObject({}) // true
isPlainObject({ a: 1 }) // true
isPlainObject(new Date()) // false
isPlainObject([]) // false
isPlainObject(null) // false
```
