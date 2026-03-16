# setCookie

设置 Cookie。

## 用法

```js
import { setCookie } from 'js-cool'
```

## 签名

```typescript
function setCookie<T extends string | number | boolean>(
  name: string,
  value: T,
  seconds?: string | number,
  path?: string,
  samesite?: boolean
): void
```

## 参数

| 参数       | 类型                        | 描述                              |
| ---------- | --------------------------- | --------------------------------- |
| `name`     | `string`                    | Cookie 名称                       |
| `value`    | `string \| number \| boolean` | Cookie 值                         |
| `seconds`  | `string \| number`          | 过期时间（秒），默认 86400（1天） |
| `path`     | `string`                    | Cookie 路径，默认 '/'             |
| `samesite` | `boolean`                   | 是否启用 SameSite，默认 true      |

## 示例

```js
// 基本用法（1 天过期）
setCookie('token', 'xxxxxx')

// 自定义过期时间（20 秒）
setCookie('session', 'abc123', 20)

// 指定路径
setCookie('token', 'xxxxxx', 86400, '/app')

// 禁用 SameSite
setCookie('data', 'value', 86400, '/', false)
```

## 相关

- [getCookie](/zh/api/storage/get-cookie) - 获取 Cookie
- [delCookie](/zh/api/storage/del-cookie) - 删除 Cookie
