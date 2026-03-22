# stopBubble <Badge type="info" text="since v1.0.2" />

Stop event bubbling.

## Usage

```js
import { stopBubble } from 'js-cool'
```

## Signature

```typescript
function stopBubble(e: Event): void
```

## Parameters

| Parameter | Type    | Description  |
| --------- | ------- | ------------ |
| `e`       | `Event` | Event object |

## Examples

```js
document.getElementById('child').addEventListener('click', e => {
  stopBubble(e)
  console.log("Event won't bubble to parent")
})
```

## Related

- [stopDefault](/api/dom/stop-default) - Prevent default behavior
