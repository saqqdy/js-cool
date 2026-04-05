# isFunctionExists <Badge type="info" text="v6.0.0" />

检查指定的函数是否存在。

## 用法

```js
import { isFunctionExists } from 'js-cool'
```

## 签名

```typescript
function isFunctionExists(name: string): boolean
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
isFunctionExists('console.log') // true

// 检查不存在的函数
isFunctionExists('test') // false

// 检查内置函数
isFunctionExists('Array.isArray') // true
isFunctionExists('JSON.parse') // true

// 检查嵌套函数
isFunctionExists('document.querySelector') // true
```

## 注意

- 支持使用点表示法的嵌套函数名
- 使用安全的求值方法检查函数是否存在
- 如果函数在求值过程中抛出错误，返回 `false`
- 如需检查全局变量是否存在，可使用 `getGlobal(name) !== undefined`

## 相关

- [getGlobal](../utility/get-global.md) - 通过路径获取全局变量
