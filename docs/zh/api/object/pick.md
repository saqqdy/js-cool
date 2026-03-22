# pick

创建一个对象，由选中的属性组成。

## 用法

```js
import { pick } from 'js-cool'
```

## 签名

```typescript
function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>
```

## 参数

| 参数   | 类型  | 描述           |
| ------ | ----- | -------------- |
| `obj`  | `T`   | 源对象         |
| `keys` | `K[]` | 要选取的属性名 |

## 返回值

`Pick<T, K>` - 仅包含选中属性的新对象。

## 示例

```js
const object = { a: 1, b: 2, c: 3 }

pick(object, ['a', 'c'])
// => { a: 1, c: 3 }

pick(object, ['a'])
// => { a: 1 }
```

## 相关

- [omit](./omit.md) - 排除指定的属性
