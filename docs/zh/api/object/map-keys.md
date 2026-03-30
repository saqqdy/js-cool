# mapKeys <Badge type="info" text="v6.0.0" />

映射对象的键名。

## 用法

```js
import { mapKeys } from 'js-cool'
```

## 签名

```typescript
function mapKeys<T extends Record<string, unknown>>(
  object: T,
  iteratee: (value: T[keyof T], key: keyof T, object: T) => string
): Record<string, T[keyof T]>
```

## 参数

| 参数       | 类型                                                | 描述           |
| ---------- | --------------------------------------------------- | -------------- |
| `object`   | `T`                                                 | 要遍历的对象   |
| `iteratee` | `(value, key, object) => string`                    | 键转换函数     |

## 返回值

`Record<string, T[keyof T]>` - 映射后的新对象。

## 示例

```js
// 组合键名
mapKeys({ a: 1, b: 2 }, (value, key) => key + value)
// { a1: 1, b2: 2 }

// 添加前缀
mapKeys({ a: 1, b: 2 }, (value, key) => 'prefix_' + key)
// { prefix_a: 1, prefix_b: 2 }

// 转大写键名
mapKeys({ a: 1, b: 2 }, (value, key) => key.toUpperCase())
// { A: 1, B: 2 }
```

## 注意

- 值保持不变，只转换键
- 如果新键重复，后面的会覆盖前面的
- 返回新对象，不修改原对象
