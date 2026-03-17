# snakeCase

将字符串转换为蛇形命名法（snake case）。

## 用法

```js
import { snakeCase } from 'js-cool'
```

## 签名

```typescript
function snakeCase(str: string): string
```

## 参数

| 参数  | 类型     | 描述           |
| ----- | -------- | -------------- |
| `str` | `string` | 要转换的字符串 |

## 返回值

`string` - 蛇形命名字符串。

## 示例

```js
snakeCase('Foo Bar') // 'foo_bar'
snakeCase('fooBar') // 'foo_bar'
snakeCase('--FOO-BAR--') // 'foo_bar'
snakeCase('fooBarBaz') // 'foo_bar_baz'
```

## 相关

- [kebabCase](/api/string/kebab-case) - 将字符串转换为短横线命名法
