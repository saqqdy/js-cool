# getCHSLength

获取中文字符串长度（中文算 2 个字节）。

## 用法

```js
import { getCHSLength } from 'js-cool'
```

## 签名

```typescript
function getCHSLength(string: string): number
```

## 参数

| 参数    | 类型     | 描述         |
| ------- | -------- | ------------ |
| `string` | `string` | 要计算的字符串 |

## 返回值

`number` - 长度（中文=2，英文=1）。

## 示例

```js
getCHSLength('Hello世界') // 9 (5 + 2*2)
getCHSLength('中文') // 4
getCHSLength('abc') // 3
```
