# clearAttr

Remove all attributes of HTML tags.

## Usage

```js
import { clearAttr } from 'js-cool'
```

## Signature

```typescript
function clearAttr(string: string): string
```

## Parameters

| Parameter | Type     | Description     |
| --------- | -------- | --------------- |
| `string`  | `string` | The HTML string |

## Returns

`string` - The HTML string with all attributes removed from tags.

## Examples

```js
clearAttr('<div class="container" id="main">content</div>')
// '<div>content</div>'

clearAttr('<a href="https://example.com" target="_blank">link</a>')
// '<a>link</a>'

clearAttr('<input type="text" name="username" required>')
// '<input>'

clearAttr('<span style="color:red" data-id="123">text</span>')
// '<span>text</span>'
```

## Related

- [clearHtml](/api/string/clear-html) - Remove all HTML tags from a string
