# omit

创建一个对象，由未排除的属性组成。

## 用法

```js
import { omit } from 'js-cool'
```

## 签名

```typescript
function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
```

## 参数

| 参数   | 类型  | 描述           |
| ------ | ----- | -------------- |
| `obj`  | `T`   | 源对象         |
| `keys` | `K[]` | 要排除的属性名 |

## 返回值

`Omit<T, K>` - 排除指定属性后的新对象。

## 示例

```js
const object = { a: 1, b: 2, c: 3 }

omit(object, ['a', 'c'])
// => { b: 2 }

omit(object, ['a'])
// => { b: 2, c: 3 }
```

## 相关

- [pick](./pick.md) - 仅保留指定的属性
