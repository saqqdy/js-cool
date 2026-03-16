# isRegExp

Check if value is a RegExp.

## Usage

```js
import { isRegExp } from 'js-cool'
```

## Signature

```typescript
function isRegExp(value: any): value is RegExp
```

## Parameters

| Parameter | Type  | Description    |
| --------- | ----- | -------------- |
| `value`   | `any` | Value to check |

## Returns

`boolean` - `true` if value is a RegExp.

## Examples

```js
isRegExp(/test/) // true
isRegExp(new RegExp('test')) // true
isRegExp('test') // false
```
