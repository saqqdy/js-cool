# binary.hex <Badge type="info" text="since v6.0.0" />

Hexadecimal encoding/decoding sub-module.

## Usage

```js
import { binary } from 'js-cool'

const { hex } = binary
```

## Methods

### encode(buffer)

Encode ArrayBuffer to hex string.

```typescript
function encode(buffer: ArrayBuffer): string
```

```js
const buffer = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]).buffer
const hex = binary.hex.encode(buffer)
console.log(hex) // '48656c6c6f'
```

### decode(hex)

Decode hex string to ArrayBuffer.

```typescript
function decode(hex: string): ArrayBuffer
```

```js
const buffer = binary.hex.decode('48656c6c6f')
const str = binary.arrayBuffer.toString(buffer)
console.log(str) // 'Hello'
```

## Examples

### View Binary Data as Hex

```js
const file = input.files[0]
const buffer = await binary.file.toArrayBuffer(file)
const hex = binary.hex.encode(buffer)

console.log('File hex:', hex.substring(0, 100) + '...')
```

### Restore Hex Data

```js
const hexString = '48656c6c6f20576f726c64' // 'Hello World'
const buffer = binary.hex.decode(hexString)
const blob = binary.arrayBuffer.toBlob(buffer, 'text/plain')

binary.download(blob, 'hello.txt')
```

### Working with Hash

```js
// MD5 hash is already a hex string
const md5Hash = await binary.hash.md5('Hello World')
console.log(md5Hash) // 'b10a8db164e0754105b7a99be72e3fe5'

// If you need to convert to ArrayBuffer
const hashBuffer = binary.hex.decode(md5Hash)
```

### Byte Array to Hex

```js
const bytes = new Uint8Array([0xff, 0x00, 0x80, 0x40])
const hex = binary.hex.encode(bytes.buffer)
console.log(hex) // 'ff008040'
```

## Related

- [binary](/api/binary/) - Binary module overview
- [binary.hash](/api/binary/hash) - Hash sub-module
