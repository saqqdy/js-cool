# browserVersion

获取浏览器版本信息。

## 用法

```js
import { browserVersion } from 'js-cool'
```

## 签名

```typescript
function browserVersion(userAgent?: string): Record<string, string>
```

## 参数

| 参数        | 类型     | 描述              |
| ----------- | -------- | ----------------- |
| `userAgent` | `string` | 自定义 UA（可选） |

## 返回值

`Record<string, string>` - 包含浏览器版本的对象。

## 示例

```js
browserVersion()
// { chrome: '120.0.0.0', safari: '17.0', ... }
```
