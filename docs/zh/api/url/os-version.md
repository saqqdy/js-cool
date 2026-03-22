# osVersion <Badge type="info" text="v5.1.0" />

获取系统名称和版本。

## 用法

```js
import { osVersion } from 'js-cool'
```

## 签名

```typescript
interface OsVersion {
  name: 'Windows' | 'MacOS' | 'Android' | 'iOS' | 'WindowsPhone' | 'Debian' | 'WebOS' | 'Harmony'
  version: string
}

function osVersion(ua?: string): OsVersion | null
```

## 参数

| 参数 | 类型     | 描述                                                        |
| ---- | -------- | ----------------------------------------------------------- |
| `ua` | `string` | User Agent 字符串（可选，未提供时使用 navigator.userAgent） |

## 返回值

`OsVersion | null` - 包含 `name` 和 `version` 属性的对象，或 `null`。

## 示例

```js
// iPad
osVersion() // { name: 'iOS', version: '13.3' }

// iPhone
osVersion() // { name: 'iOS', version: '13.2.3' }

// Mac OS
osVersion() // { name: 'MacOS', version: '10.15.7' }

// Windows
osVersion() // { name: 'Windows', version: '10.0' }

// Windows XP
osVersion() // { name: 'Windows', version: 'XP' }

// Windows Phone
osVersion() // { name: 'WindowsPhone', version: '10.0' }

// Android
osVersion() // { name: 'Android', version: '14' }

// HarmonyOS
osVersion() // { name: 'Harmony', version: '4.0.0' }
```

## 相关

- [getOsVersion](/api/url/get-os-version) - 获取特定 OS 版本（已弃用）
- [client](/api/url/client) - 获取客户端信息
