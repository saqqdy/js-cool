# getCookie

获取 Cookie 值。

## 用法

```js
import { getCookie } from 'js-cool'
```

## 签名

```typescript
function getCookie(name: string): string | null
```

## 参数

| 参数   | 类型     | 描述        |
| ------ | -------- | ----------- |
| `name` | `string` | Cookie 名称 |

## 返回值

`string | null` - Cookie 值，不存在则返回 `null`。

## 示例

```js
setCookie('token', 'abc123')
getCookie('token') // 'abc123'
getCookie('missing') // null
```

## 相关

- [setCookie](/zh/api/storage/set-cookie) - 设置 Cookie
- [getCookies](/zh/api/storage/get-cookies) - 获取所有 Cookie
