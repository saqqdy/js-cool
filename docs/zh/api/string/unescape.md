# unescape <Badge type="info" text="v5.5.0" />

反转义字符串中的 HTML 实体。

## 用法

```js
import { unescape } from 'js-cool'
```

## 签名

```typescript
function unescape(string: string): string
```

## 参数

| 参数     | 类型     | 描述             |
| -------- | -------- | ---------------- |
| `string` | `string` | 要反转义的字符串 |

## 返回值

`string` - 反转义后的字符串。

## 示例

```js
unescape('&lt;div&gt;Hello&lt;/div&gt;') // '<div>Hello</div>'
unescape('a &amp; b') // 'a & b'
unescape('&quot;hello&quot;') // '"hello"'
```

## 相关

- [escape](/zh/api/string/escape) - 转义 HTML 特殊字符
