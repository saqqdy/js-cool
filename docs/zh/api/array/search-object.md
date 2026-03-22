# searchObject

在嵌套对象/数组中搜索。

## 用法

```js
import { searchObject } from 'js-cool'
```

## 签名

```typescript
function searchObject(
  tree: any[],
  expression: string | number | ((item: any) => boolean),
  key?: string
): any
```

## 参数

| 参数         | 类型                           | 描述       |
| ------------ | ------------------------------ | ---------- |
| `tree`       | `any[]`                        | 要搜索的树 |
| `expression` | `string \| number \| Function` | 搜索表达式 |
| `key`        | `string`                       | 要匹配的键 |

## 返回值

`any` - 找到的元素或 `undefined`。

## 示例

```js
const data = [{ id: 1, name: 'John', children: [{ id: 2, name: 'Jane' }] }]

searchObject(data, 'Jane', 'name') // { id: 2, name: 'Jane' }
searchObject(data, item => item.id === 2) // { id: 2, name: 'Jane' }
```
