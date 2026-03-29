# binary.compare() <Badge type="info" text="since v6.0.0" />

Compare two binary inputs for content equality.

## Usage

```js
import { binary } from 'js-cool'

const same = await binary.compare(a, b)
```

## Signature

```typescript
function compare(a: BinaryInput, b: BinaryInput): Promise<boolean>

type BinaryInput = Blob | File | ArrayBuffer | Uint8Array | string
```

## Parameters

| Parameter | Type          | Description              |
| --------- | ------------- | ------------------------ |
| `a`       | `BinaryInput` | First binary data        |
| `b`       | `BinaryInput` | Second binary data       |

## Returns

`Promise<boolean>` - Whether the two data contents are identical.

## Examples

### Compare Blobs

```js
const blob1 = new Blob(['Hello'])
const blob2 = new Blob(['Hello'])
const blob3 = new Blob(['World'])

await binary.compare(blob1, blob2) // true
await binary.compare(blob1, blob3) // false
```

### Compare Files

```js
const file1 = input1.files[0]
const file2 = input2.files[0]

const same = await binary.compare(file1, file2)
if (same) {
  console.log('Two files have identical content')
}
```

### Compare Different Types

```js
const blob = new Blob(['Hello'])
const buffer = new TextEncoder().encode('Hello').buffer
const base64 = 'SGVsbG8='

// Different types can still compare content
await binary.compare(blob, buffer) // true
await binary.compare(buffer, base64) // true
```

### Deduplication

```js
const files = [file1, file2, file3]
const uniqueFiles = []

for (const file of files) {
  let isDuplicate = false

  for (const unique of uniqueFiles) {
    if (await binary.compare(file, unique)) {
      isDuplicate = true
      break
    }
  }

  if (!isDuplicate) {
    uniqueFiles.push(file)
  }
}

console.log(`After dedup: ${uniqueFiles.length} files`)
```

## How It Works

1. First compares size, returns `false` if different
2. Converts both inputs to ArrayBuffer
3. Compares content byte by byte

## Performance Considerations

For large files, comparison may take time. Suggestions:
- Compare file sizes first
- Use hash comparison (faster but less precise)
- For deduplication, calculate and cache hash values first

```js
// Using hash for deduplication (faster)
const hashes = new Map()

for (const file of files) {
  const hash = await binary.hash.md5(file)

  if (hashes.has(hash)) {
    console.log('Duplicate:', file.name)
  } else {
    hashes.set(hash, file)
  }
}
```

## Related

- [binary](/api/binary/) - Binary module overview
- [binary.hash](/api/binary/hash) - Hash sub-module
