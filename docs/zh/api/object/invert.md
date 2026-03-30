# invert <Badge type="info" text="v6.0.0" />

键值反转。

## 用法

```js
import { invert } from 'js-cool'
```

## 签名

```typescript
function invert<T extends Record<string, string | number>>(object: T): Record<string, string>
```

## 参数

| 参数     | 类型                                      | 描述           |
| -------- | ----------------------------------------- | -------------- |
| `object` | `Record<string, string \| number>`        | 要反转的对象   |

## 返回值

`Record<string, string>` - 键值反转后的新对象。

## 示例

```js
// 字符串值
invert({ a: '1', b: '2', c: '3' })
// { '1': 'a', '2': 'b', '3': 'c' }

// 数字值
invert({ x: 1, y: 2 })
// { '1': 'x', '2': 'y' }

// 重复值（后者覆盖前者）
invert({ a: 1, b: 2, c: 1 })
// { '1': 'c', '2': 'b' }

// 字符串值示例
invert({ x: 'apple', y: 'banana' })
// { apple: 'x', banana: 'y' }
```

## 注意

- 如果有重复的值，后面的键会覆盖前面的
- 返回新对象，不修改原对象
