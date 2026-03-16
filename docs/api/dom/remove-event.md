# removeEvent

Remove event listener.

## Usage

```js
import { removeEvent } from 'js-cool'
```

## Signature

```typescript
function removeEvent(
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
const handler = (e) => console.log('clicked')
addEvent(btn, 'click', handler)

// Later, remove the handler
removeEvent(btn, 'click', handler)
```

## Related

- [addEvent](/api/dom/add-event) - Add event listener
