# countBy <Badge type="info" text="v6.0.0" />

按条件计数分组。

## 用法

```js
import { countBy } from 'js-cool'
```

## 签名

```typescript
function countBy<T>(
  array: T[],
  iteratee?: ((value: T) => string | number) | keyof T | null
): Record<string, number>
```

## 参数

| 参数       | 类型                                                | 描述               |
| ---------- | --------------------------------------------------- | ------------------ |
| `array`    | `T[]`                                               | 要处理的数组       |
| `iteratee` | `Function \| keyof T \| null`                       | 生成键的函数或属性名 |

## 返回值

`Record<string, number>` - 各键对应的计数对象。

## 示例

```js
// 使用函数
countBy([6.1, 4.2, 6.3], Math.floor)
// { '4': 1, '6': 2 }

// 使用属性名
countBy(['one', 'two', 'three'], 'length')
// { '3': 2, '5': 1 }

// 对象数组
countBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type')
// { 'a': 2, 'b': 1 }

// 自定义函数
countBy(['apple', 'banana', 'apricot'], item => item[0])
// { 'a': 2, 'b': 1 }
```

## 注意

- 返回的是一个计数对象，键为分组依据，值为出现次数
- 如果不提供 iteratee，使用元素自身作为键
