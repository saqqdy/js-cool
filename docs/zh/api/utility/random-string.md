# randomString <Badge type="info" text="v5.0.0" />

生成随机字符串。

## 用法

```js
import { randomString } from 'js-cool'
```

## 签名

```typescript
function randomString(length?: number, chars?: string): string
```

## 参数

| 参数     | 类型     | 描述                     |
| -------- | -------- | ------------------------ |
| `length` | `number` | 字符串长度（默认：32）   |
| `chars`  | `string` | 字符集（默认：字母数字） |

## 返回值

`string` - 随机字符串。

## 示例

```js
randomString() // 32 位随机字符串
randomString(8) // 8 位随机字符串
randomString(6, '0123456789') // 6 位数字验证码
randomString(10, 'ABCDEF') // 10 位十六进制风格字符串
```
