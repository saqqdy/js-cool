# isIterable <Badge type="info" text="since v5.7.0" />

Check if value is iterable.

## Usage

```js
import { isIterable } from 'js-cool'
```

## Signature

```typescript
function isIterable(value: any): boolean
```

## Parameters

| Parameter | Type  | Description    |
| --------- | ----- | -------------- |
| `value`   | `any` | Value to check |

## Returns

`boolean` - `true` if value is iterable.

## Examples

```js
isIterable([1, 2, 3]) // true
isIterable('hello') // true
isIterable(new Set()) // true
isIterable({}) // false
isIterable(null) // false
```
