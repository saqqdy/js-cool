# trim <Badge type="danger" text="已废弃" /> <Badge type="info" text="v1.0.1" />

::: warning 已废弃
将在下一个主要版本中移除，请使用 String.prototype.trim() 代替。
:::

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
