# stopDefault

Prevent default event behavior.

## Usage

```js
import { stopDefault } from 'js-cool'
```

## Signature

```typescript
function stopDefault(e: Event): boolean
```

## Parameters

| Parameter | Type    | Description  |
| --------- | ------- | ------------ |
| `e`       | `Event` | Event object |

## Returns

`boolean` - Always returns `false`.

## Examples

```js
// Prevent form submission
document.querySelector('form').addEventListener('submit', e => {
  stopDefault(e)
  console.log('Form submission prevented')
})

// Prevent link navigation
document.querySelector('a').addEventListener('click', e => {
  stopDefault(e)
})
```

## Related

- [stopBubble](/api/dom/stop-bubble) - Stop event bubbling
