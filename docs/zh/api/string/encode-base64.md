# encodeBase64 <Badge type="info" text="v1.0.1" />

将字符串编码为 Base64 格式。

## 用法

```js
import { encodeBase64 } from 'js-cool'
```

## 签名

```typescript
function encodeBase64(input: string): string
```

## 参数

| 参数    | 类型     | 描述           |
| ------- | -------- | -------------- |
| `input` | `string` | 要编码的字符串 |

## 返回值

`string` - Base64 编码后的字符串。

## 示例

```js
encodeBase64('Hello World') // 'SGVsbG8gV29ybGQ='
encodeBase64('你好') // '5L2g5aW9'
encodeBase64('{"name":"John"}') // 'eyJuYW1lIjoiSm9obiJ9'
```

## 相关

- [decodeBase64](/zh/api/string/decode-base64) - Base64 解码
