# addEvent

Add event listener (cross-browser compatible).

## Usage

```js
import { addEvent } from 'js-cool'
```

## Signature

```typescript
function addEvent(
  element: any,
  type: string,
  handler: Function
): void
```

## Parameters

| Parameter | Type       | Description           |
| --------- | ---------- | --------------------- |
| `element` | `any`      | DOM element           |
| `type`    | `string`   | Event type (no 'on')  |
| `handler` | `Function` | Event handler         |

## Examples

```js
const btn = document.getElementById('btn')
addEvent(btn, 'click', (e) => {
  console.log('Button clicked!')
})

// Multiple events
addEvent(input, 'focus', onFocus)
addEvent(input, 'blur', onBlur)
```

## Related

- [removeEvent](/api/dom/remove-event) - Remove event listener
