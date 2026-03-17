# flatten

将数组扁平化一层。

## 用法

```js
import { flatten, flattenDeep } from 'js-cool'
```

## 签名

```typescript
function flatten<T>(array: (T | T[])[]): T[]
function flattenDeep<T>(array: any[]): T[]
```

## 参数

| 参数    | 类型          | 描述         |
| ------- | ------------- | ------------ |
| `array` | `(T \| T[])[]` | 要扁平化的数组 |

## 返回值

`T[]` - 扁平化后的新数组。

## 示例

```js
flatten([1, [2, 3], [4, [5]]])
// [1, 2, 3, [5]]

flattenDeep([1, [2, [3, [4]], 5]])
// [1, 2, 3, 4, 5]
```

## 注意

- `flatten` 只扁平化一层
- `flattenDeep` 递归扁平化所有嵌套数组
- 如果输入不是数组，返回空数组
- 返回新数组，不修改原数组

## 相关

- [chunk](./chunk.md)
