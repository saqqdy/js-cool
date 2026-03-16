# clearHtml

移除字符串中的 HTML 标签。

## 用法

```js
import { clearHtml } from 'js-cool'
```

## 签名

```typescript
function clearHtml(string: string): string
```

## 参数

| 参数    | 类型     | 描述           |
| ------- | -------- | -------------- |
| `string` | `string` | 包含 HTML 的字符串 |

## 返回值

`string` - 移除 HTML 标签后的字符串。

## 示例

```js
clearHtml('<p>Hello <b>World</b></p>') // 'Hello World'
clearHtml('<div class="test">Content</div>') // 'Content'
```
