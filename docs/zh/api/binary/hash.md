# binary.hash <Badge type="info" text="v6.0.0" />

哈希计算子模块，支持 MD5、SHA-1、SHA-256 和 CRC32。

## 用法

```js
import { binary } from 'js-cool'

const { hash } = binary
```

## 方法

### md5(data)

计算 MD5 哈希值。

```typescript
function md5(data: BinaryInput): Promise<string>
```

```js
const hash = await binary.hash.md5('Hello World')
// 'b10a8db164e0754105b7a99be72e3fe5'

// 也支持 Blob、File、ArrayBuffer
const fileHash = await binary.hash.md5(file)
```

### sha1(data)

计算 SHA-1 哈希值。

```typescript
function sha1(data: BinaryInput): Promise<string>
```

```js
const hash = await binary.hash.sha1('Hello World')
// '0a4d55a8d778e5022fab701977c5d840bbc486d0'
```

### sha256(data)

计算 SHA-256 哈希值。

```typescript
function sha256(data: BinaryInput): Promise<string>
```

```js
const hash = await binary.hash.sha256('Hello World')
// 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'
```

### crc32(data)

计算 CRC32 校验值（同步）。

```typescript
function crc32(data: BinaryInput): number
```

```js
const crc = binary.hash.crc32('Hello World')
// -1370929426 (数字)
```

## 示例

### 文件完整性校验

```js
const input = document.querySelector('input[type="file"]')
const file = input.files[0]

// 计算文件 SHA-256
const sha256 = await binary.hash.sha256(file)
console.log('File SHA-256:', sha256)

// 与服务器提供的哈希比对
if (sha256 === expectedHash) {
  console.log('文件完整性验证通过')
}
```

### 密码哈希

```js
const password = 'user-password'
const hash = await binary.hash.sha256(password)
// 存储哈希值而非明文密码
```

### 数据去重

```js
const files = [file1, file2, file3]
const hashes = new Set()

for (const file of files) {
  const hash = await binary.hash.md5(file)
  if (hashes.has(hash)) {
    console.log('重复文件:', file.name)
  } else {
    hashes.add(hash)
  }
}
```

### 快速校验

```js
// CRC32 是同步的，适合快速校验
const crc1 = binary.hash.crc32(data1)
const crc2 = binary.hash.crc32(data2)

if (crc1 !== crc2) {
  console.log('数据不同')
}
```

## 支持的输入类型

所有哈希方法支持以下输入类型：

| 类型          | 描述        |
| ------------- | ----------- |
| `string`      | 字符串      |
| `Blob`        | Blob 对象   |
| `File`        | File 对象   |
| `ArrayBuffer` | ArrayBuffer |
| `Uint8Array`  | Uint8Array  |

## 性能说明

- **CRC32**: 最快，同步执行，适合快速校验
- **MD5**: 较快，用于非安全场景的校验
- **SHA-1**: 中等速度，已不推荐用于安全场景
- **SHA-256**: 最安全，推荐用于密码和安全场景

::: warning 安全提示
MD5 和 SHA-1 已被证明存在碰撞漏洞，不建议用于安全敏感场景。对于密码存储和数字签名，请使用 SHA-256 或更强的哈希算法。
:::

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
