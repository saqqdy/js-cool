# waiting <Badge type="info" text="v5.5.0" />

等待指定时间。

## 用法

```js
import { waiting } from 'js-cool'
```

## 签名

```typescript
function waiting(ms: number): Promise<void>
```

## 参数

| 参数 | 类型     | 描述       |
| ---- | -------- | ---------- |
| `ms` | `number` | 等待毫秒数 |

## 返回值

`Promise<void>` - 等待后 resolve。

## 示例

```js
await waiting(1000) // 等待 1 秒
console.log('等待完成')

// 与其他操作链式调用
waiting(500).then(() => console.log('半秒已过'))
```

## 相关

- [delay](/zh/api/utility/delay) - 延迟执行
