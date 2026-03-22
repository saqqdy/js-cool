# decodeBase64 <Badge type="info" text="v1.0.1" />

解码 Base64 编码的字符串。

## 用法

```js
import { decodeBase64 } from 'js-cool'
```

## 签名

```typescript
function decodeBase64(input: string): string
```

## 参数

| 参数    | 类型     | 描述                   |
| ------- | -------- | ---------------------- |
| `input` | `string` | 要解码的 Base64 字符串 |

## 返回值

`string` - 解码后的字符串。

## 示例

```js
decodeBase64('SGVsbG8gV29ybGQ=') // 'Hello World'
decodeBase64('5L2g5aW9') // '你好'
```

## 相关

- [encodeBase64](/zh/api/string/encode-base64) - Base64 编码
