# any

检查数组中是否有任意元素满足条件。

## 用法

```js
import { any } from 'js-cool'
```

## 签名

```typescript
function any<T>(arr: T[], fn: (item: T) => boolean): boolean
```

## 参数

| 参数  | 类型                   | 描述         |
| ----- | ---------------------- | ------------ |
| `arr` | `T[]`                  | 要检查的数组 |
| `fn`  | `(item: T) => boolean` | 测试函数     |

## 返回值

`boolean` - 如果有任意元素通过测试则返回 `true`。

## 示例

```js
any([1, 2, 3], x => x > 2) // true
any([1, 2, 3], x => x > 5) // false
any([], x => x > 0) // false
```

## 相关

- [all](/api/array/all) - 检查所有元素是否都通过测试
