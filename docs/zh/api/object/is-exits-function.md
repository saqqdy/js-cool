# isExitsFunction

检查指定的函数是否存在。

## 用法

```js
import { isExitsFunction } from 'js-cool'
```

## 签名

```typescript
function isExitsFunction(name: string): boolean
```

## 参数

| 参数   | 类型     | 描述     |
| ------ | -------- | -------- |
| `name` | `string` | 函数名称 |

## 返回值

`boolean` - 如果函数存在返回 `true`，否则返回 `false`。

## 示例

```js
// 检查全局函数
isExitsFunction('console.log') // true

// 检查不存在的函数
isExitsFunction('test') // false

// 检查内置函数
isExitsFunction('Array.isArray') // true
isExitsFunction('JSON.parse') // true

// 检查嵌套函数
isExitsFunction('document.querySelector') // true
```

## 注意

- 支持使用点表示法的嵌套函数名
- 使用安全的求值方法检查函数是否存在
- 如果函数在求值过程中抛出错误，返回 `false`

## 相关

- [isExitsVariable](./is-exits-variable.md) - 检查变量是否存在
