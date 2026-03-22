# decodeUtf8 <Badge type="info" text="v1.0.1" />

解码 UTF-8 编码的字符串。

## 用法

```js
import { decodeUtf8 } from 'js-cool'
```

## 签名

```typescript
function decodeUtf8(utftext: string): string
```

## 参数

| 参数      | 类型     | 描述               |
| --------- | -------- | ------------------ |
| `utftext` | `string` | UTF-8 编码的字符串 |

## 返回值

`string` - 解码后的字符串。

## 示例

```js
decodeUtf8(encodedString) // '你好'
```

## 相关

- [encodeUtf8](/zh/api/string/encode-utf8) - 编码字符串为 UTF-8
