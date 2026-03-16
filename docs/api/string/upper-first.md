# upperFirst

Capitalize the first letter of a string.

## Usage

```js
import { upperFirst } from 'js-cool'
```

## Signature

```typescript
function upperFirst(string: string): string
```

## Parameters

| Parameter | Type     | Description          |
| --------- | -------- | -------------------- |
| `string`  | `string` | The string to modify |

## Returns

`string` - The string with first letter capitalized.

## Examples

```js
upperFirst('hello') // 'Hello'
upperFirst('hello world') // 'Hello world'
upperFirst('h') // 'H'
```
