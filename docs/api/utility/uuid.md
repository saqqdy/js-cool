# uuid

Generate a UUID (v4).

## Usage

```js
import { uuid } from 'js-cool'
```

## Signature

```typescript
function uuid(): string
```

## Returns

`string` - UUID string.

## Examples

```js
uuid() // 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
uuid() // 'a1b2c3d4-e5f6-4789-a012-3456789abcde'

// Use as unique ID
const id = uuid()
document.getElementById('form').id = id
```
