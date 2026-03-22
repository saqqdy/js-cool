# parseUrlParam <Badge type="info" text="v5.0.0" />

解析 URL 参数并支持类型转换。

## 用法

```js
import { parseUrlParam } from 'js-cool'
```

## 签名

```typescript
function parseUrlParam(url: string, covert?: boolean): Record<string, unknown>
```

## 参数

| 参数     | 类型      | 描述                          |
| -------- | --------- | ----------------------------- |
| `url`    | `string`  | 以 ? 开头的 URL 字符串        |
| `covert` | `boolean` | 是否转换类型（默认：`false`） |

## 返回值

`Record<string, unknown>` - 解析后的参数对象。

## 示例

```js
// 不转换类型
parseUrlParam('?name=John&age=30')
// { name: 'John', age: '30' }

// 转换类型
parseUrlParam('?count=100&active=true&price=99.99', true)
// { count: 100, active: true, price: 99.99 }

// 特殊值
parseUrlParam('?val=null&flag=true', true)
// { val: null, flag: true }
```
