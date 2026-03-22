# isExitsVariable <Badge type="info" text="v1.0.1" />

检查指定的变量是否存在。

## 用法

```js
import { isExitsVariable } from 'js-cool'
```

## 签名

```typescript
function isExitsVariable(name: string): boolean
```

## 参数

| 参数   | 类型     | 描述     |
| ------ | -------- | -------- |
| `name` | `string` | 变量名称 |

## 返回值

`boolean` - 如果变量存在返回 `true`，否则返回 `false`。

## 示例

```js
// 检查全局变量
isExitsVariable('window') // true

// 检查不存在的变量
isExitsVariable('test') // false

// 检查内置变量
isExitsVariable('document') // true
isExitsVariable('navigator') // true
```

## 注意

- 此函数检查变量名是否已定义
- 使用 try-catch 方法安全检查变量是否存在
- 如果访问变量会抛出错误，返回 `false`

## 相关

- [isExitsFunction](./is-exits-function.md) - 检查函数是否存在
