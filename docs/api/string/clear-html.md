# clearHtml

Remove HTML tags from a string.

## Usage

```js
import { clearHtml } from 'js-cool'
```

## Signature

```typescript
function clearHtml(string: string): string
```

## Parameters

| Parameter | Type     | Description              |
| --------- | -------- | ------------------------ |
| `string`  | `string` | The HTML string to clean |

## Returns

`string` - The string with HTML tags removed.

## Examples

```js
clearHtml('<p>Hello <b>World</b></p>') // 'Hello World'
clearHtml('<div class="test">Content</div>') // 'Content'
```
