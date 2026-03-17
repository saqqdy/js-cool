# getOsVersion

获取手机系统版本。

> **已弃用**：请使用 `osVersion` 代替。

## 用法

```js
import { getOsVersion } from 'js-cool'
```

## 签名

```typescript
function getOsVersion(
  osName: string,
  withOS?: boolean,
  userAgent?: string
): string | boolean | null
```

## 参数

| 参数       | 类型      | 描述                                                       |
| ---------- | --------- | ---------------------------------------------------------- |
| `osName`   | `string`  | 系统类型：Android、iPod、iWatch、iPhone、iPad 等           |
| `withOS`   | `boolean` | 是否在结果中包含 OS 名称                                   |
| `userAgent`| `string`  | 自定义 User Agent 字符串（可选，默认为 navigator.userAgent）|

## 返回值

`string | boolean | null` - 版本字符串，检测到 OS 但版本未知返回 `false`，不是指定的 OS 返回 `null`。

## 示例

```js
// 获取 iOS 版本
getOsVersion('iPhone') // '13.2.3'

// 包含 OS 名称
getOsVersion('iPhone', true) // 'iPhone/13.2.3'

// Android 设备
getOsVersion('Android') // '14'

// iPad
getOsVersion('iPad') // '16.5'
```

## 相关

- [osVersion](/api/url/os-version) - 此函数的现代替代
- [getAppVersion](/api/url/get-app-version) - 获取应用版本
- [client](/api/url/client) - 获取客户端信息
