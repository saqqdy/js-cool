# binary.compare() <Badge type="info" text="v6.0.0" />

比较两个二进制数据的内容是否相同。

## 用法

```js
import { binary } from 'js-cool'

const same = await binary.compare(a, b)
```

## 签名

```typescript
function compare(a: BinaryInput, b: BinaryInput): Promise<boolean>

type BinaryInput = Blob | File | ArrayBuffer | Uint8Array | string
```

## 参数

| 参数 | 类型          | 描述           |
| ---- | ------------- | -------------- |
| `a`  | `BinaryInput` | 第一个二进制数据 |
| `b`  | `BinaryInput` | 第二个二进制数据 |

## 返回值

`Promise<boolean>` - 两个数据内容是否相同。

## 示例

### 比较 Blob

```js
const blob1 = new Blob(['Hello'])
const blob2 = new Blob(['Hello'])
const blob3 = new Blob(['World'])

await binary.compare(blob1, blob2) // true
await binary.compare(blob1, blob3) // false
```

### 比较 File

```js
const file1 = input1.files[0]
const file2 = input2.files[0]

const same = await binary.compare(file1, file2)
if (same) {
  console.log('两个文件内容相同')
}
```

### 比较不同类型

```js
const blob = new Blob(['Hello'])
const buffer = new TextEncoder().encode('Hello').buffer
const base64 = 'SGVsbG8='

// 不同类型也可以比较内容
await binary.compare(blob, buffer) // true
await binary.compare(buffer, base64) // true
```

### 去重

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

console.log(`去重后: ${uniqueFiles.length} 个文件`)
```

## 工作原理

1. 首先比较大小，大小不同直接返回 `false`
2. 将两个输入转换为 ArrayBuffer
3. 逐字节比较内容

## 性能考虑

对于大文件，比较操作可能耗时较长。建议：
- 先比较文件大小
- 使用哈希值比较（更快但不精确）
- 对于去重场景，可以先计算哈希值缓存

```js
// 使用哈希去重（更快）
const hashes = new Map()

for (const file of files) {
  const hash = await binary.hash.md5(file)

  if (hashes.has(hash)) {
    console.log('重复:', file.name)
  } else {
    hashes.set(hash, file)
  }
}
```

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
- [binary.hash](/zh/api/binary/hash) - 哈希子模块
