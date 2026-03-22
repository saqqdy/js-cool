# clearAttr <Badge type="info" text="v1.0.1" />

移除 HTML 标签的所有属性。

## 用法

```js
import { clearAttr } from 'js-cool'
```

## 签名

```typescript
function clearAttr(string: string): string
```

## 参数

| 参数     | 类型     | 描述        |
| -------- | -------- | ----------- |
| `string` | `string` | HTML 字符串 |

## 返回值

`string` - 移除所有标签属性后的 HTML 字符串。

## 示例

```js
clearAttr('<div class="container" id="main">content</div>')
// '<div>content</div>'

clearAttr('<a href="https://example.com" target="_blank">link</a>')
// '<a>link</a>'

clearAttr('<input type="text" name="username" required>')
// '<input>'

clearAttr('<span style="color:red" data-id="123">text</span>')
// '<span>text</span>'
```

## 相关

- [clearHtml](/api/string/clear-html) - 移除字符串中的 HTML 标签
