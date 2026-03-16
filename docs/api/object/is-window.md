# isWindow

Check if value is a window object.

## Usage

```js
import { isWindow } from 'js-cool'
```

## Signature

```typescript
function isWindow(value: any): value is Window
```

## Parameters

| Parameter | Type  | Description    |
| --------- | ----- | -------------- |
| `value`   | `any` | Value to check |

## Returns

`boolean` - `true` if value is a window object.

## Examples

```js
isWindow(window) // true
isWindow({}) // false
isWindow(document) // false
```
