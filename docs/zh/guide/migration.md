# 迁移指南

## 从 v5.x 升级到 v6.x

> **[更新日志](https://github.com/saqqdy/js-cool/blob/master/CHANGELOG.md)** • **[English](https://github.com/saqqdy/js-cool/blob/master/MIGRATION-v5-to-v6.md)**

### 概述

v6.0.0 是一个包含破坏性变更的主要版本。主要变化包括：

1. **构建输出重构** - 新的文件名和 ESM 优先方式
2. **包导出** - 正确的 `exports` 字段和条件导出
3. **移除 `client` 模块** - 替换为新的 `ua` 模块
4. **移除废弃函数** - `getAppVersion`、`getOsVersion`、`getDirParam`、`getScrollPosition`
5. **移除 `pattern` 对象** - 替换为 `patterns` / `validation`

### 快速迁移清单

- [ ] 更新导入路径（如果使用直接文件导入）
- [ ] 更新 CDN 链接和全局变量名（`JsCool` → `jsCool`）
- [ ] 将 `client` 替换为 `ua`
- [ ] 将 `pattern` 替换为 `validation`
- [ ] 替换废弃的函数
- [ ] 更新 TypeScript 类型

### 构建系统迁移

v6.0 从 Rollup 迁移到 Rolldown，简化了构建产物并提升了构建速度。

### 输出文件映射

| v5.x                             | v6.x                     | 格式                  |
| -------------------------------- | ------------------------ | --------------------- |
| `dist/index.cjs.js`              | `dist/index.js`          | CJS                   |
| `dist/index.mjs`                 | `dist/index.mjs`         | ESM                   |
| `dist/index.esm-browser.js`      | `dist/index.mjs`         | ESM（直接使用）       |
| `dist/index.esm-browser.prod.js` | `dist/index.mjs`         | ESM（让打包工具压缩） |
| `dist/index.global.js`           | `dist/index.iife.js`     | IIFE                  |
| `dist/index.global.prod.js`      | `dist/index.iife.min.js` | IIFE（压缩版）        |

### CDN 迁移

```html
<!-- v5.x -->
<script src="https://unpkg.com/js-cool/dist/index.global.prod.js"></script>
<script>
  const { copy, randomString } = window.JsCool
</script>

<!-- v6.x -->
<script src="https://unpkg.com/js-cool/dist/index.iife.min.js"></script>
<script>
  const { copy, randomString } = window.jsCool
</script>
```

::: warning
全局变量名从 `JsCool`（帕斯卡命名）改为 `jsCool`（驼峰命名）。
:::

### 导入路径迁移

```js
// v5.x - 直接文件导入
import jsCool from 'js-cool/dist/index.esm-browser.js'

// v6.x - 使用包导出
import jsCool from 'js-cool'
```

### 废弃函数替换

| v5.x（已废弃）        | v6.x（替代方案）       |
| --------------------- | ---------------------- |
| `getAppVersion()`     | `appVersion()`         |
| `getOsVersion()`      | `osVersion()`          |
| `getScrollPosition()` | `scroll.getPosition()` |

```js
// v5.x
const version = getAppVersion('Chrome')
const os = getOsVersion()
const pos = getScrollPosition()

// v6.x
const version = appVersion('Chrome')
const os = osVersion()
const pos = scroll.getPosition()
```

### 滚动工具迁移

`getScrollPosition` 函数已被功能更全面的 `scroll` 工具模块替代：

```js
// v5.x
import { getScrollPosition } from 'js-cool'
const pos = getScrollPosition() // 'top' | 'bottom' | undefined

// v6.x
import { scroll } from 'js-cool'
// 或 import scrollUtils from 'js-cool/scroll'

scroll.getPosition() // 'top' | 'bottom' | undefined
scroll.getProgress() // 0-100（滚动进度百分比）
scroll.createDirectionTracker() // 追踪滚动方向（'up' | 'down'）
scroll.isInViewport(el) // 检测元素是否在视口内
scroll.scrollTo('#section') // 滚动到指定元素
scroll.scrollToTop() // 滚动到顶部
scroll.scrollToBottom() // 滚动到底部
scroll.lock() // 锁定滚动（适用于弹窗）
scroll.unlock() // 解锁滚动
scroll.getScrollbarWidth() // 获取滚动条宽度
```

#### 新增功能

| 方法                         | 说明                        |
| ---------------------------- | --------------------------- |
| `getPosition(el, threshold)` | 支持自定义元素和阈值        |
| `getProgress(el)`            | 新增：获取滚动进度（0-100） |
| `createDirectionTracker()`   | 新增：追踪滚动方向          |
| `isInViewport(el, opts)`     | 新增：检测元素是否在视口内  |
| `scrollTo(target, opts)`     | 新增：滚动到元素/位置       |
| `lock()` / `unlock()`        | 新增：锁定/解锁滚动         |
| `getScrollbarWidth()`        | 新增：获取滚动条宽度        |

### 包导出配置

v6.x 使用条件导出以提供更好的模块解析：

```json
{
  "exports": {
    ".": {
      "require": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "import": {
        "types": "./dist/index.d.mts",
        "default": "./dist/index.mjs"
      }
    }
  }
}
```

这确保了：

- CJS 和 ESM 的正确类型声明
- 不同环境下的正确模块解析
- 更好的 tree-shaking 支持

### 构建性能对比

| 指标     | v5.x (Rollup) | v6.x (Rolldown) |
| -------- | ------------- | --------------- |
| 构建时间 | ~6-8s         | ~110ms          |
| 配置文件 | ~190 行       | ~65 行          |
| 依赖     | 10+ 插件      | 内置            |

## 模块迁移

### `client` → `ua`

::: warning
`client` 模块已在 v6.0.0 中**移除**。必须迁移到 `ua`。
:::

#### 导入变更

```js
// 之前 (v5.x)
import { client, ClientDetector } from 'js-cool'

// 之后 (v6.x)
import { ua, UAParser } from 'js-cool'

// 或使用 tree-shake 导入（推荐）
import { isMobile, isWeChat, isiOS } from 'js-cool/ua'
```

#### API 迁移对照表

| 之前 (`client`)             | 之后 (`ua`)             | 说明         |
| --------------------------- | ----------------------- | ------------ |
| `client()`                  | `ua()` 或 `ua.info`     | 获取所有信息 |
| `client.info`               | `ua.info`               | 相同属性访问 |
| `client.get('browser')`     | `ua.get('browser')`     | 相同方法     |
| `client.getMultiple([...])` | `ua.getMultiple([...])` | 相同方法     |
| `client.isMobile()`         | `ua.isMobile()`         | 相同方法     |
| `client.isWeChat()`         | `ua.isWeChat()`         | 相同方法     |
| `client.has('Chrome')`      | `ua.has('Chrome')`      | 相同方法     |
| `client.getNetwork()`       | `ua.getNetwork()`       | 相同方法     |
| `client.getScreen()`        | `ua.getScreen()`        | 相同方法     |
| `new ClientDetector(ua)`    | `new UAParser(ua)`      | 类重命名     |

#### 旧属性迁移

| 之前 (`client`)  | 之后 (`ua`)                                    | 说明             |
| ---------------- | ---------------------------------------------- | ---------------- |
| `client.mobile`  | `ua.isMobile()` 或 `ua.device.mobile`          | 推荐使用方法调用 |
| `client.ios`     | `ua.isiOS()` 或 `ua.os.name === 'iOS'`         | 推荐使用方法调用 |
| `client.android` | `ua.isAndroid()` 或 `ua.os.name === 'Android'` | 推荐使用方法调用 |
| `client.weixin`  | `ua.isWeChat()` 或 `ua.environment.wechat`     | 推荐使用方法调用 |
| `client.qq`      | `ua.isQQ()` 或 `ua.environment.qq`             | 推荐使用方法调用 |
| `client.iPad`    | `ua.device.ipad`                               | 属性访问         |
| `client.iPhone`  | `ua.device.iphone`                             | 属性访问         |

#### 代码示例

```js
// 之前 (v5.x)
import { client, ClientDetector } from 'js-cool'
const info = client()
if (client.mobile) {
  /* ... */
}
if (client.weixin) {
  /* ... */
}
const detector = new ClientDetector(customUA)

// 之后 (v6.x)
import { ua, UAParser } from 'js-cool'
const info = ua.info // 或 ua()
if (ua.isMobile()) {
  /* ... */
}
if (ua.isWeChat()) {
  /* ... */
}
const detector = new UAParser(customUA)
```

#### `ua` 新增功能

```js
// 新增设备检测
ua.device.phone // 是否为手机设备
ua.device.ipad // 是否为 iPad
ua.device.iphone // 是否为 iPhone
ua.device.androidPhone // 是否为 Android 手机
ua.device.androidTablet // 是否为 Android 平板

// 新增操作系统检测
ua.isHarmonyOS() // 检测鸿蒙系统
ua.isiPadOS() // 检测 iPadOS

// 新增环境检测（国产应用）
ua.environment.wxwork // 企业微信
ua.environment.dingtalk // 钉钉
ua.environment.douyin // 抖音
ua.environment.kuaishou // 快手
ua.environment.baidu // 百度 App
ua.environment.xiaomi // 小米浏览器
ua.environment.huawei // 华为浏览器
ua.environment.miniProgram // 小程序
ua.environment.miniGame // 小游戏
```

#### 类型迁移

```ts
// 之前 (v5.x)
import type { ClientInfo, IClientDetector } from 'js-cool'

// 之后 (v6.x)
import type { UAInfo, IUAParser } from 'js-cool'
```

| 旧类型            | 新类型      |
| ----------------- | ----------- |
| `ClientInfo`      | `UAInfo`    |
| `IClientDetector` | `IUAParser` |
| `ClientGetType`   | `UAGetType` |
| `ClientDetector`  | `UAParser`  |

### `pattern` → `patterns` / `validation`

::: warning 重大变更
v5.x 的 `pattern` 对象已在 v6.0.0 中**移除**。必须迁移到新的 `patterns` 模块。
:::

#### 快速迁移

```js
// v5.x（已移除）
import { pattern } from 'js-cool'
pattern.email.test('user@example.com')
pattern.ip4.test('192.168.1.1')
pattern.pass.test('abc123')

// v6.x
import { validation } from 'js-cool'
validation.email.test('user@example.com')
validation.ipv4.test('192.168.1.1') // 重命名：ip4 → ipv4
validation.password.test('abc123') // 重命名：pass → password
```

#### 模式名称变更

| v5.x (`pattern`) | v6.x (`validation`) | 说明                     |
| ---------------- | ------------------- | ------------------------ |
| `ip4`            | `ipv4`              | 重命名                   |
| `ip4_pri`        | `ipv4Private`       | 重命名                   |
| `pass`           | `password`          | 重命名                   |
| `isjson`         | `jsonLike`          | 重命名                   |
| `mobile`         | `mobile`            | 更新：现在支持 1[3-9]    |
| `qq`             | `qq`                | 更新：现在支持 5-14 位   |
| -                | `idCard`            | **新增**：中国身份证     |
| -                | `hexColor`          | **新增**：十六进制颜色码 |

### `getDirParam` → `getDirParams`

::: warning 重大变更
`getDirParam` 已在 v6.0.0 中**移除**。请迁移到 `getDirParams`。
:::

#### 返回值映射

| `getDirParam` (v5.x) | `getDirParams` (v6.x) | 说明                 |
| -------------------- | --------------------- | -------------------- |
| `host`               | `origin`              | 现在包含协议         |
| -                    | `host`                | 新增：主机名 + 端口  |
| -                    | `hostname`            | 新增：仅主机名       |
| -                    | `pathname`            | 新增：完整路径字符串 |
| `path`               | `segments`            | 重命名               |
| -                    | `query`               | 新增：查询字符串     |
| -                    | `hash`                | 新增：hash 值        |

#### 迁移示例

```js
// v5.x（已废弃）
import { getDirParam } from 'js-cool'
const { host, path } = getDirParam('https://example.com/user/123')
// host: 'https://example.com'
// path: ['user', '123']

// v6.x
import { getDirParams } from 'js-cool'
const { origin, segments } = getDirParams('https://example.com/user/123')
// origin: 'https://example.com'
// segments: ['user', '123']
```

#### 修复的问题

旧的 `getDirParam` 会错误地将 query string 混入最后一个路径段：

```js
// v5.x - Bug：query 混入路径
getDirParam('https://example.com/api/users?id=123')
// { host: 'https://example.com', path: ['api', 'users?id=123'] }

// v6.x - 已修复：query 正确分离
getDirParams('https://example.com/api/users?id=123')
// { origin: 'https://example.com', segments: ['api', 'users'], query: 'id=123', ... }
```

### URL 工具

`url` 命名空间和 `Url` 类是 v6.0.0 新增功能。现有函数如 `getUrlParam`、`parseUrlParam` 等无需迁移，继续正常工作。

```js
// v5.x（仍然有效）
import { getUrlParam, parseUrlParam } from 'js-cool'
getUrlParam('id', '?id=123')

// v6.x（新的链式 API）
import { url, Url } from 'js-cool'
url.get('id', '?id=123')
new Url('?id=123').get('id')
```

## TypeScript 迁移

### 类型重命名

```ts
// v5.x
import type { ClientInfo, ClientGetType, IClientDetector } from 'js-cool'

// v6.x
import type { UAInfo, UAGetType, IUAParser } from 'js-cool'
// 或从子路径导入
import type { UAInfo, DeviceInfo, OSInfo, BrowserInfo } from 'js-cool/ua'
```

### 新增类型

```ts
// 设备信息类型
interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop'
  mobile: boolean
  tablet: boolean
  desktop: boolean
  touch: boolean
  phone: boolean
  ipad: boolean
  iphone: boolean
  androidPhone: boolean
  androidTablet: boolean
  model: string
}

// 操作系统信息类型
interface OSInfo {
  name: OSName
  version: string
}

// 浏览器信息类型
interface BrowserInfo {
  name: BrowserName
  version: string
  engine: EngineName
  major: string
}

// 环境信息类型
interface EnvironmentInfo {
  wechat: boolean
  qq: boolean
  weibo: boolean
  alipay: boolean
  wxwork: boolean
  dingtalk: boolean
  douyin: boolean
  kuaishou: boolean
  baidu: boolean
  xiaomi: boolean
  huawei: boolean
  miniProgram: boolean
  miniGame: boolean
}

// 完整 UA 信息类型
interface UAInfo {
  device: DeviceInfo
  os: OSInfo
  browser: BrowserInfo
  environment: EnvironmentInfo
  userAgent: string
}
```

## 分步迁移指南

### 第一步：更新依赖

```bash
# 更新到 v6.x
pnpm add js-cool@^6.0.0

# 或
npm install js-cool@^6.0.0
```

### 第二步：更新导入路径

如果你之前使用直接文件导入：

```js
// v5.x
import jsCool from 'js-cool/dist/index.esm-browser.js'

// v6.x
import jsCool from 'js-cool'
```

### 第三步：更新 CDN 链接

```html
<!-- v5.x -->
<script src="https://unpkg.com/js-cool/dist/index.global.prod.js"></script>

<!-- v6.x -->
<script src="https://unpkg.com/js-cool/dist/index.iife.min.js"></script>
```

### 第四步：更新全局变量

```js
// v5.x
const { copy } = window.JsCool

// v6.x
const { copy } = window.jsCool
```

### 第五步：替换废弃函数

```js
// v5.x
const version = getAppVersion('Chrome')
const os = getOsVersion()

// v6.x
const version = appVersion('Chrome')
const os = osVersion()
```

### 第六步：将 `client` 替换为 `ua`

```js
// v5.x
import { client, ClientDetector } from 'js-cool'
const info = client()
const isMobile = client.isMobile()

// v6.x
import { ua, UAParser } from 'js-cool'
const info = ua.info // 或 ua()
const isMobile = ua.isMobile()

// 或使用 tree-shaking
import { isMobile, getDeviceInfo } from 'js-cool/ua'
```

### 第七步：将 `pattern` 替换为 `validation`

```js
// v5.x
import { pattern } from 'js-cool'
pattern.email.test('user@example.com')
pattern.ip4.test('192.168.1.1')

// v6.x
import { validation } from 'js-cool'
validation.email.test('user@example.com')
validation.ipv4.test('192.168.1.1')
```

### 第八步：更新 TypeScript 类型

```ts
// v5.x
import type { ClientInfo } from 'js-cool'

// v6.x
import type { UAInfo } from 'js-cool'
// 或
import type { UAInfo, DeviceInfo } from 'js-cool/ua'
```

## 常见问题

### 问题：`window.JsCool is undefined`

**解决方案：** 全局变量名从 `JsCool` 改为 `jsCool`（小写）。

```html
<!-- 之前 -->
<script>
  const { copy } = window.JsCool
</script>

<!-- 之后 -->
<script>
  const { copy } = window.jsCool
</script>
```

### 问题：`client is not exported from 'js-cool'`

**解决方案：** 将 `client` 替换为 `ua`。

```js
// 之前
import { client } from 'js-cool'

// 之后
import { ua } from 'js-cool'
```

### 问题：`getAppVersion is not a function`

**解决方案：** 使用 `appVersion` 替代。

```js
// 之前
getAppVersion('Chrome')

// 之后
appVersion('Chrome')
```

### 问题：`ClientInfo type not found`

**解决方案：** 使用 `UAInfo` 替代。

```ts
// 之前
import type { ClientInfo } from 'js-cool'

// 之后
import type { UAInfo } from 'js-cool'
```

### 问题：`pattern is not defined`

**解决方案：** 使用 `validation` 替代。

```js
// 之前
import { pattern } from 'js-cool'
pattern.email.test(email)

// 之后
import { validation } from 'js-cool'
validation.email.test(email)
```

## 需要帮助？

- **GitHub Issues:** [https://github.com/saqqdy/js-cool/issues](https://github.com/saqqdy/js-cool/issues)
- **更新日志:** [CHANGELOG.md](https://github.com/saqqdy/js-cool/blob/master/CHANGELOG.md)
- **文档:** [README.md](https://github.com/saqqdy/js-cool/blob/master/README.md)
