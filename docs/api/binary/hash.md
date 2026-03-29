# binary.hash <Badge type="info" text="since v6.0.0" />

Hash calculation sub-module, supporting MD5, SHA-1, SHA-256, and CRC32.

## Usage

```js
import { binary } from 'js-cool'

const { hash } = binary
```

## Methods

### md5(data)

Calculate MD5 hash.

```typescript
function md5(data: BinaryInput): Promise<string>
```

```js
const hash = await binary.hash.md5('Hello World')
// 'b10a8db164e0754105b7a99be72e3fe5'

// Also supports Blob, File, ArrayBuffer
const fileHash = await binary.hash.md5(file)
```

### sha1(data)

Calculate SHA-1 hash.

```typescript
function sha1(data: BinaryInput): Promise<string>
```

```js
const hash = await binary.hash.sha1('Hello World')
// '0a4d55a8d778e5022fab701977c5d840bbc486d0'
```

### sha256(data)

Calculate SHA-256 hash.

```typescript
function sha256(data: BinaryInput): Promise<string>
```

```js
const hash = await binary.hash.sha256('Hello World')
// 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'
```

### crc32(data)

Calculate CRC32 checksum (synchronous).

```typescript
function crc32(data: BinaryInput): number
```

```js
const crc = binary.hash.crc32('Hello World')
// -1370929426 (number)
```

## Examples

### File Integrity Check

```js
const input = document.querySelector('input[type="file"]')
const file = input.files[0]

// Calculate file SHA-256
const sha256 = await binary.hash.sha256(file)
console.log('File SHA-256:', sha256)

// Compare with expected hash
if (sha256 === expectedHash) {
  console.log('File integrity verified')
}
```

### Password Hashing

```js
const password = 'user-password'
const hash = await binary.hash.sha256(password)
// Store hash instead of plain text password
```

### Data Deduplication

```js
const files = [file1, file2, file3]
const hashes = new Set()

for (const file of files) {
  const hash = await binary.hash.md5(file)
  if (hashes.has(hash)) {
    console.log('Duplicate file:', file.name)
  } else {
    hashes.add(hash)
  }
}
```

### Quick Check

```js
// CRC32 is synchronous, good for quick checks
const crc1 = binary.hash.crc32(data1)
const crc2 = binary.hash.crc32(data2)

if (crc1 !== crc2) {
  console.log('Data is different')
}
```

## Supported Input Types

All hash methods support the following input types:

| Type          | Description         |
| ------------- | ------------------- |
| `string`      | String              |
| `Blob`        | Blob object         |
| `File`        | File object         |
| `ArrayBuffer` | ArrayBuffer         |
| `Uint8Array`  | Uint8Array          |

## Performance Notes

- **CRC32**: Fastest, synchronous, good for quick checks
- **MD5**: Fast, for non-security scenarios
- **SHA-1**: Medium speed, not recommended for security
- **SHA-256**: Most secure, recommended for passwords and security

::: warning Security Note
MD5 and SHA-1 have known collision vulnerabilities and are not recommended for security-sensitive scenarios. For password storage and digital signatures, use SHA-256 or stronger hash algorithms.
:::

## Related

- [binary](/api/binary/) - Binary module overview
