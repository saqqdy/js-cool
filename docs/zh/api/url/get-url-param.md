# getUrlParam

获取单个 URL 参数值。

## 用法

```js
import { getUrlParam } from 'js-cool'
```

## 签名

```typescript
function getUrlParam(url: string, name: string): string | null
```

## 参数

| 参数   | 类型     | 描述       |
| ------ | -------- | ---------- |
| `url`  | `string` | URL 字符串 |
| `name` | `string` | 参数名     |

## 返回值

`string | null` - 参数值或 `null`。

## 示例

```js
getUrlParam('https://example.com?name=John&age=30', 'name')
// 'John'

getUrlParam('https://example.com?name=John', 'missing')
// null
```
