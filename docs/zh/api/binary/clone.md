# binary.clone() <Badge type="info" text="v6.0.0" />

克隆二进制数据，创建新的副本。

## 用法

```js
import { binary } from 'js-cool'

const cloned = binary.clone(data)
```

## 签名

```typescript
function clone(data: Blob | File | ArrayBuffer): Blob | ArrayBuffer
```

## 参数

| 参数   | 类型                          | 描述         |
| ------ | ----------------------------- | ------------ |
| `data` | `Blob \| File \| ArrayBuffer` | 要克隆的数据 |

## 返回值

`Blob | ArrayBuffer` - 克隆后的数据副本。

## 示例

### 克隆 Blob

```js
const original = new Blob(['Hello World'], { type: 'text/plain' })
const cloned = binary.clone(original)

console.log(cloned !== original) // true
console.log(cloned.size) // 11
console.log(cloned.type) // 'text/plain'
```

### 克隆 ArrayBuffer

```js
const original = new TextEncoder().encode('Hello').buffer
const cloned = binary.clone(original)

console.log(cloned !== original) // true
console.log(cloned.byteLength) // 5
```

### 克隆 File

```js
const file = input.files[0]
const cloned = binary.clone(file)

// File 会被克隆为 Blob（丢失文件名）
console.log(cloned instanceof Blob) // true
console.log(cloned.name) // undefined
```

### 安全修改数据

```js
const original = new Blob(['Original Data'])
const cloned = binary.clone(original)

// 修改克隆版本不影响原始数据
// ...对 cloned 进行操作
```

## 注意事项

- File 克隆后会变成 Blob，丢失文件名和修改时间
- 克隆操作会创建新的内存空间
- 对于大文件，克隆可能消耗较多内存

## 相关

- [binary](/zh/api/binary/) - Binary 模块概述
