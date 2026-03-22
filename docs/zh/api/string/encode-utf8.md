# encodeUtf8 <Badge type="info" text="v1.0.1" />

将字符串编码为 UTF-8 格式。

## 用法

```js
import { encodeUtf8 } from 'js-cool'
```

## 签名

```typescript
function encodeUtf8(string: string): string
```

## 参数

| 参数     | 类型     | 描述           |
| -------- | -------- | -------------- |
| `string` | `string` | 要编码的字符串 |

## 返回值

`string` - UTF-8 编码后的字符串。

## 示例

```js
encodeUtf8('Hello') // 'Hello'
encodeUtf8('你好') // 编码后的字符串
```

## 相关

- [decodeUtf8](/zh/api/string/decode-utf8) - UTF-8 解码
