# safeParse

安全地解析 JSON 字符串。

## 用法

```js
import { safeParse } from 'js-cool'
```

## 签名

```typescript
function safeParse<T = any>(json: string): T | null
```

## 参数

| 参数   | 类型     | 描述        |
| ------ | -------- | ----------- |
| `json` | `string` | JSON 字符串 |

## 返回值

`T | null` - 解析后的值，解析失败时返回 `null`。

## 示例

```js
safeParse('{"a":1}') // { a: 1 }
safeParse('invalid') // null（不抛出错误）
safeParse('null') // null
```

## 相关

- [safeStringify](/api/object/safe-stringify) - 安全 JSON 序列化
