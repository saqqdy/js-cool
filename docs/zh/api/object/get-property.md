# getProperty

安全地获取嵌套属性值。

## 用法

```js
import { getProperty } from 'js-cool'
```

## 签名

```typescript
function getProperty(obj: any, path: string, defaultValue?: any): any
```

## 参数

| 参数          | 类型     | 描述                      |
| ------------- | -------- | ------------------------- |
| `obj`         | `any`    | 源对象                    |
| `path`        | `string` | 属性路径（如 'a.b.c'）    |
| `defaultValue`| `any`    | 未找到时的默认值          |

## 返回值

`any` - 属性值或默认值。

## 示例

```js
const obj = { a: { b: { c: 1 } } }

getProperty(obj, 'a.b.c') // 1
getProperty(obj, 'a.b.d', 'default') // 'default'
getProperty(obj, 'x.y.z') // undefined
```

## 相关

- [setProperty](/api/object/set-property) - 设置嵌套属性
