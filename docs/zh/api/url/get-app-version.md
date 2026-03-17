# getAppVersion

从 User Agent 获取 APP 版本号。

> **已弃用**：请使用 `appVersion` 代替。

## 用法

```js
import { getAppVersion } from 'js-cool'
```

## 签名

```typescript
function getAppVersion(
  appName: string,
  withApp?: boolean,
  userAgent?: string
): string | boolean | null
```

## 参数

| 参数       | 类型      | 描述                                                 |
| ---------- | --------- | ---------------------------------------------------- |
| `appName`  | `string`  | 要搜索的应用名称                                     |
| `withApp`  | `boolean` | 是否在结果中包含应用名称                             |
| `userAgent`| `string`  | 自定义 User Agent 字符串（可选，默认为 navigator.userAgent）|

## 返回值

`string | boolean | null` - 版本字符串，检测到应用但版本未知返回 `false`，不是指定客户端返回 `null`。

## 示例

```js
// 仅获取版本号
getAppVersion('Chrome') // '120.0.0.0'

// 包含应用名称
getAppVersion('Chrome', true) // 'Chrome/120.0.0.0'

// 自定义 User Agent
getAppVersion('MicroMessenger', false, 'MicroMessenger/8.0.0')
// '8.0.0'

// 检测到应用但版本未知
getAppVersion('SomeApp') // false（应用存在但没有版本）

// 不是指定的客户端
getAppVersion('NonExistent') // null
```

## 相关

- [appVersion](/api/url/app-version) - 此函数的现代替代
- [getOsVersion](/api/url/get-os-version) - 获取 OS 版本
