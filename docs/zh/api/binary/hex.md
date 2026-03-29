# binary.hex <Badge type="info" text="v6.0.0" />

十六进制编解码子模块。

## 用法

```js
import { binary } from 'js-cool'

const { hex } = binary
```

## 方法

### encode(buffer)

将 ArrayBuffer 编码为十六进制字符串。

```typescript
function encode(buffer: ArrayBuffer): string
```

```js
const buffer = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]).buffer
const hex = binary.hex.encode(buffer)
console.log(hex) // '48656c6c6f'
```

### decode(hex)

将十六进制字符串解码为 ArrayBuffer。

```typescript
function decode(hex: string): ArrayBuffer
```

```js
const buffer = binary.hex.decode('48656c6c6f')
const str = binary.arrayBuffer.toString(buffer)
console.log(str) // 'Hello'
```

## 示例

### 查看二进制数据的十六进制表示

```js
const file = input.files[0]
const buffer = await binary.file.toArrayBuffer(file)
const hex = binary.hex.encode(buffer)

console.log('File hex:', hex.substring(0, 100) + '...')
```

### 十六进制数据还原

```js
const hexString = '48656c6c6f20576f726c64' // 'Hello World'
const buffer = binary.hex.decode(hexString)
const blob = binary.arrayBuffer.toBlob(buffer, 'text/plain')

binary.download(blob, 'hello.txt')
```

### 与哈希配合

```js
// MD5 哈希已经是十六进制字符串
const md5Hash = await binary.hash.md5('Hello World')
console.log(md5Hash) // 'b10a8db164e0754105b7a99be72e3fe5'

// 如果需要转换为 ArrayBuffer
const hashBuffer = binary.hex.decode(md5Hash)
```

### 字节数组转十六进制

```js
const bytes = new Uint8Array([0xff, 0x00, 0x80, 0x40])
const hex = binary.hex.encode(bytes.buffer)
console.log(hex) // 'ff008040'
```

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
- [binary.hash](/zh/api/binary/hash) - 哈希子模块
