# fixNumber <Badge type="info" text="v1.0.2" />

将数字保留指定小数位数。

## 用法

```js
import { fixNumber } from 'js-cool'
```

## 签名

```typescript
function fixNumber(num: number, decimals?: number): number
```

## 参数

| 参数       | 类型     | 描述                |
| ---------- | -------- | ------------------- |
| `num`      | `number` | 要处理的数字        |
| `decimals` | `number` | 小数位数（默认：2） |

## 返回值

`number` - 处理后的数字。

## 示例

```js
fixNumber(3.14159) // 3.14
fixNumber(3.14159, 4) // 3.1416
fixNumber(10.5, 0) // 11
```
