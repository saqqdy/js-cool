# appVersion

从 User Agent 获取应用版本。

## 用法

```js
import { appVersion } from 'js-cool'
```

## 签名

```typescript
function appVersion(appName: string, userAgent?: string): string | null
```

## 参数

| 参数        | 类型     | 描述              |
| ----------- | -------- | ----------------- |
| `appName`   | `string` | 要查找的应用名称  |
| `userAgent` | `string` | 自定义 UA（可选） |

## 返回值

`string | null` - 版本字符串或 `null`。

## 示例

```js
appVersion('Chrome') // '120.0.0.0'
appVersion('Safari') // '17.0'
appVersion('NonExistent') // null
```
