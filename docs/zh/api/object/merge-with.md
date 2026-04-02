# mergeWith <Badge type="info" text="v6.0.0" />

使用自定义策略函数合并对象。

## 用法

```js
import { mergeWith } from 'js-cool'
```

## 签名

```typescript
function mergeWith<T extends Record<string, unknown>>(
  object: T,
  ...sources: [...sources: Record<string, unknown>[], strategy: MergeStrategy]
): T

type MergeStrategy = (
  objValue: unknown,
  srcValue: unknown,
  key: string | number,
  object: Record<string, unknown> | unknown[],
  source: Record<string, unknown> | unknown[]
) => unknown
```

## 参数

| 参数       | 类型             | 描述                       |
| ---------- | ---------------- | -------------------------- |
| `object`   | `T`              | 目标对象                   |
| `sources`  | `object[]`       | 源对象                     |
| `strategy` | `MergeStrategy`  | 自定义合并策略函数         |

## 返回值

`T` - 合并后的对象。

## 示例

```js
// 自定义数组合并（拼接而非替换）
mergeWith(
  { a: [1, 2] },
  { a: [3, 4] },
  (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  }
)
// { a: [1, 2, 3, 4] }

// 自定义属性合并
mergeWith(
  { a: 1, b: 2 },
  { a: 3, c: 4 },
  (objValue, srcValue, key) => {
    if (key === 'a') return objValue + srcValue
  }
)
// { a: 4, b: 2, c: 4 }

// 合并多个对象
mergeWith(
  { a: 1 },
  { b: 2 },
  { c: 3 },
  (objValue, srcValue) => srcValue ?? objValue
)
// { a: 1, b: 2, c: 3 }

// 跳过特定属性
mergeWith(
  { a: 1, b: 2 },
  { a: 10, b: 20, c: 30 },
  (objValue, srcValue, key) => {
    if (key === 'b') return objValue // 保留原值
  }
)
// { a: 10, b: 2, c: 30 }
```

## 注意

- 策略函数返回 `undefined` 时使用默认合并行为
- 嵌套对象会递归调用策略函数
- 数组默认替换而非拼接
