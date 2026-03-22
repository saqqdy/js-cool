# isObject <Badge type="info" text="since v5.0.0" />

Check if value is an object (not null, not array).

## Usage

```js
import { isObject } from 'js-cool'
```

## Signature

```typescript
function isObject(value: any): value is object
```

## Parameters

| Parameter | Type  | Description    |
| --------- | ----- | -------------- |
| `value`   | `any` | Value to check |

## Returns

`boolean` - `true` if value is an object.

## Examples

```js
isObject({}) // true
isObject([]) // false
isObject(null) // false
isObject(new Date()) // true
```
