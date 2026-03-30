# capitalize <Badge type="info" text="v6.0.0" />

首字母大写，其余小写。

## 用法

```js
import { capitalize } from 'js-cool'
```

## 签名

```typescript
function capitalize(string: string): string
```

## 参数

| 参数     | 类型     | 描述         |
| -------- | -------- | ------------ |
| `string` | `string` | 要处理的字符串 |

## 返回值

`string` - 首字母大写、其余小写的字符串。

## 示例

```js
capitalize('FRED') // 'Fred'
capitalize('hello world') // 'Hello world'
capitalize('HELLO WORLD') // 'Hello world'
capitalize('') // ''
capitalize('a') // 'A'
```

## 注意

- 只处理第一个字符为大写，其余全部转为小写
- 空字符串返回空字符串
- 与 `upperFirst` 不同，`capitalize` 会将其余字符转为小写
