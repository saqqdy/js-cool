# kebabCase <Badge type="info" text="v6.0.0" />

将字符串转换为短横线命名法（kebab case）。

## 用法

```js
import { kebabCase } from 'js-cool'
```

## 签名

```typescript
function kebabCase(str: string): string
```

## 参数

| 参数  | 类型     | 描述           |
| ----- | -------- | -------------- |
| `str` | `string` | 要转换的字符串 |

## 返回值

`string` - 短横线命名字符串。

## 示例

```js
kebabCase('Foo Bar') // 'foo-bar'
kebabCase('fooBar') // 'foo-bar'
kebabCase('__FOO_BAR__') // 'foo-bar'
kebabCase('fooBarBaz') // 'foo-bar-baz'
```

## 相关

- [snakeCase](/api/string/snake-case) - 将字符串转换为蛇形命名法
