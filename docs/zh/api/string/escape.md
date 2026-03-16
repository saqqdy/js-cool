# escape

转义字符串中的 HTML 特殊字符。

## 用法

```js
import { escape } from 'js-cool'
```

## 签名

```typescript
function escape(string: string): string
```

## 参数

| 参数     | 类型     | 描述           |
| -------- | -------- | -------------- |
| `string` | `string` | 要转义的字符串 |

## 返回值

`string` - 转义后的字符串。

## 示例

```js
escape('<div>Hello</div>') // '&lt;div&gt;Hello&lt;/div&gt;'
escape('a & b') // 'a &amp; b'
escape('"hello"') // '&quot;hello&quot;'
```

## 相关

- [unescape](/zh/api/string/unescape) - 反转义 HTML 实体
