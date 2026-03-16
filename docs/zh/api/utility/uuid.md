# uuid

生成 UUID（v4 版本）。

## 用法

```js
import { uuid } from 'js-cool'
```

## 签名

```typescript
function uuid(): string
```

## 返回值

`string` - UUID 字符串。

## 示例

```js
uuid() // 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
uuid() // 'a1b2c3d4-e5f6-4789-a012-3456789abcde'

// 作为唯一 ID 使用
const id = uuid()
document.getElementById('form').id = id
```
