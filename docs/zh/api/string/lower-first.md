# lowerFirst <Badge type="info" text="v6.0.0" />

首字母小写。

## 用法

```js
import { lowerFirst } from 'js-cool'
```

## 签名

```typescript
function lowerFirst(string: string): string
```

## 参数

| 参数     | 类型     | 描述         |
| -------- | -------- | ------------ |
| `string` | `string` | 要处理的字符串 |

## 返回值

`string` - 首字母小写的字符串。

## 示例

```js
lowerFirst('Fred') // 'fred'
lowerFirst('FRED') // 'fRED'
lowerFirst('Hello') // 'hello'
lowerFirst('') // ''
lowerFirst('a') // 'a'
```

## 注意

- 只将第一个字符转为小写，其余字符不变
- 空字符串返回空字符串
- 与 `upperFirst` 相反
