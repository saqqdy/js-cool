# getCookies

获取所有 Cookie 为对象形式。

## 用法

```js
import { getCookies } from 'js-cool'
```

## 签名

```typescript
function getCookies(): Record<string, string>
```

## 返回值

`Record<string, string>` - 包含所有 Cookie 的对象。

## 示例

```js
// 获取所有 Cookie
getCookies()
// { token: 'abc123', session: 'xyz789' }

// 检查 Cookie 是否存在
const cookies = getCookies()
if ('token' in cookies) {
  console.log('用户已登录')
}
```

## 相关

- [getCookie](/zh/api/storage/get-cookie) - 获取单个 Cookie
