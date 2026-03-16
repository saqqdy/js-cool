# all

检查数组中所有元素是否都满足条件。

## 用法

```js
import { all } from 'js-cool'
```

## 签名

```typescript
function all<T>(arr: T[], fn: (item: T) => boolean): boolean
```

## 参数

| 参数  | 类型                   | 描述         |
| ----- | ---------------------- | ------------ |
| `arr` | `T[]`                  | 要检查的数组 |
| `fn`  | `(item: T) => boolean` | 测试函数     |

## 返回值

`boolean` - 如果所有元素都通过测试则返回 `true`。

## 示例

```js
all([1, 2, 3], x => x > 0) // true
all([1, 2, 3], x => x > 1) // false
all([], x => x > 0) // true
```

## 相关

- [any](/api/array/any) - 检查是否有任意元素通过测试
