# spliceUrlParam

拼接参数到 URL。

## 用法

```js
import { spliceUrlParam } from 'js-cool'
```

## 签名

```typescript
function spliceUrlParam(url: string, params: Record<string, any>): string
```

## 参数

| 参数     | 类型                  | 描述       |
| -------- | --------------------- | ---------- |
| `url`    | `string`              | 基础 URL   |
| `params` | `Record<string, any>` | 参数对象   |

## 返回值

`string` - 带参数的 URL。

## 示例

```js
spliceUrlParam('https://example.com', { name: 'John', age: 30 })
// 'https://example.com?name=John&age=30'

spliceUrlParam('https://example.com?foo=bar', { name: 'John' })
// 'https://example.com?foo=bar&name=John'
```
