# binary.clone() <Badge type="info" text="since v6.0.0" />

Clone binary data, creating a new copy.

## Usage

```js
import { binary } from 'js-cool'

const cloned = binary.clone(data)
```

## Signature

```typescript
function clone(data: Blob | File | ArrayBuffer): Blob | ArrayBuffer
```

## Parameters

| Parameter | Type                          | Description   |
| --------- | ----------------------------- | ------------- |
| `data`    | `Blob \| File \| ArrayBuffer` | Data to clone |

## Returns

`Blob | ArrayBuffer` - Cloned data copy.

## Examples

### Clone Blob

```js
const original = new Blob(['Hello World'], { type: 'text/plain' })
const cloned = binary.clone(original)

console.log(cloned !== original) // true
console.log(cloned.size) // 11
console.log(cloned.type) // 'text/plain'
```

### Clone ArrayBuffer

```js
const original = new TextEncoder().encode('Hello').buffer
const cloned = binary.clone(original)

console.log(cloned !== original) // true
console.log(cloned.byteLength) // 5
```

### Clone File

```js
const file = input.files[0]
const cloned = binary.clone(file)

// File is cloned as Blob (loses filename)
console.log(cloned instanceof Blob) // true
console.log(cloned.name) // undefined
```

### Safe Data Modification

```js
const original = new Blob(['Original Data'])
const cloned = binary.clone(original)

// Modifying clone doesn't affect original
// ...operate on cloned
```

## Notes

- File is cloned as Blob, losing filename and modification time
- Clone operation creates new memory space
- For large files, cloning may consume significant memory

## Related

- [binary](/api/binary/) - Binary module overview
