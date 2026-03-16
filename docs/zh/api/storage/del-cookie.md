# delCookie

删除 Cookie。

## 用法

```js
import { delCookie } from 'js-cool'
```

## 签名

```typescript
function delCookie(name: string): void
```

## 参数

| 参数   | 类型     | 描述       |
| ------ | -------- | ---------- |
| `name` | `string` | Cookie 名称 |

## 示例

```js
setCookie('token', 'abc123')
delCookie('token')
getCookie('token') // null
```

## 相关

- [setCookie](/zh/api/storage/set-cookie) - 设置 Cookie
- [getCookie](/zh/api/storage/get-cookie) - 获取 Cookie
