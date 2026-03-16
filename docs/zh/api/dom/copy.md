# copy

复制文本到剪贴板。

## 用法

```js
import { copy } from 'js-cool'
```

## 签名

```typescript
function copy(value: string | number): boolean | undefined
```

## 参数

| 参数    | 类型              | 描述       |
| ------- | ----------------- | ---------- |
| `value` | `string \| number` | 要复制的文本 |

## 返回值

`boolean | undefined` - 成功返回 `true`，失败返回 `false` 或 `undefined`。

## 示例

```js
// 复制文本
copy('Hello World') // true

// 复制数字
copy(12345) // true

// 在事件处理器中使用
document.getElementById('btn').addEventListener('click', () => {
  const text = document.getElementById('content').textContent
  if (copy(text)) {
    alert('复制成功！')
  }
})
```

## 注意

- 仅在浏览器环境中工作
- Node.js 环境返回 `undefined`
- 内部使用 `document.execCommand('copy')`
