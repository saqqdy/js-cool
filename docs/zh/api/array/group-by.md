# groupBy <Badge type="info" text="v6.0.0" />

创建一个对象，其键由遍历每个元素后通过迭代器生成的结果组成。

## 用法

```js
import { groupBy } from 'js-cool'
```

## 签名

```typescript
function groupBy<T>(
  array: T[],
  iteratee: keyof T | ((value: T) => string | number)
): Record<string, T[]>
```

## 参数

| 参数       | 类型                                          | 描述           |
| ---------- | --------------------------------------------- | -------------- |
| `array`    | `T[]`                                         | 要遍历的数组   |
| `iteratee` | `keyof T \| ((value: T) => string \| number)` | 转换键的迭代器 |

## 返回值

`Record<string, T[]>` - 组合后的聚合对象，每个键对应一个元素数组。

## 示例

```js
groupBy([{ a: 1 }, { a: 2 }, { a: 1 }], 'a')
// { '1': [{ a: 1 }, { a: 1 }], '2': [{ a: 2 }] }

groupBy([6.1, 4.2, 6.3], Math.floor)
// { '4': [4.2], '6': [6.1, 6.3] }

groupBy(['one', 'two', 'three'], 'length')
// { '3': ['one', 'two'], '5': ['three'] }
```

## 注意

- 如果输入不是数组，返回空对象
- 迭代器可以是属性名或函数
- 键在结果对象中会被转换为字符串

## 相关

- [keyBy](./key-by.md)
