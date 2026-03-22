# trim

去除字符串首尾空白。

## 用法

```js
import { trim } from 'js-cool'
```

## 签名

```typescript
function trim(string: string): string
```

## 参数

| 参数     | 类型     | 描述           |
| -------- | -------- | -------------- |
| `string` | `string` | 要修剪的字符串 |

## 返回值

`string` - 修剪后的字符串。

## 示例

```js
trim('  hello  ') // 'hello'
trim('\nhello\n') // 'hello'
```
