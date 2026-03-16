# safeStringify

安全地将对象序列化为 JSON。

## 用法

```js
import { safeStringify } from 'js-cool'
```

## 签名

```typescript
function safeStringify(data: any, replacer?: any, space?: number): string | undefined
```

## 参数

| 参数       | 类型     | 描述           |
| ---------- | -------- | -------------- |
| `data`     | `any`    | 要序列化的数据 |
| `replacer` | `any`    | 替换函数       |
| `space`    | `number` | 缩进空格数     |

## 返回值

`string | undefined` - JSON 字符串，序列化失败时返回 `undefined`。

## 示例

```js
safeStringify({ a: 1 }) // '{"a":1}'
safeStringify({ a: 1 }, null, 2) // '{\n  "a": 1\n}'
safeStringify(circularRef) // undefined（不抛出错误）
```

## 相关

- [safeParse](/api/object/safe-parse) - 安全 JSON 解析
