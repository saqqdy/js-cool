# fingerprint

生成浏览器指纹。

## 用法

```js
import { fingerprint } from 'js-cool'
```

## 签名

```typescript
function fingerprint(domain?: string): string | null
```

## 参数

| 参数     | 类型     | 描述                            |
| -------- | -------- | ------------------------------- |
| `domain` | `string` | 域名键值（默认：location.host） |

## 返回值

`string | null` - 指纹字符串，非浏览器环境下返回 `null`。

## 示例

```js
const fp = fingerprint()
// 'a1b2c3d4e5f6'

// 使用自定义域名
const fp = fingerprint('myapp.com')

// 用于设备追踪
localStorage.setItem('deviceId', fingerprint())
```
