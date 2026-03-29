# 迁移指南：v5.x → v6.x

本指南帮助你从 js-cool v5.x 迁移到 v6.x。

> **[更新日志](./CHANGELOG.md)** • **[English](./MIGRATION-v5-to-v6.md)**

---

## 概述

v6.0.0 是一个包含破坏性变更的主要版本。主要变化包括：

1. **构建输出重构** - 新的文件名和 ESM 优先方式
2. **包导出** - 正确的 `exports` 字段和条件导出
3. **移除 `client` 模块** - 替换为新的 `ua` 模块
4. **移除废弃函数** - `getAppVersion`、`getOsVersion`
5. **新增 `binary` 模块** - 统一的二进制数据转换 API（推荐替代旧的转换函数）

---

## 快速迁移清单

- [ ] 更新导入路径（如果使用直接文件导入）
- [ ] 更新 CDN 链接和全局变量名
- [ ] 将 `client` 替换为 `ua`
- [ ] 替换废弃的函数
- [ ] 迁移到新的 `binary` 模块（推荐）
- [ ] 更新 TypeScript 类型

---

## 破坏性变更

### 1. 构建输出文件

构建输出文件已重命名：

| v5.x                             | v6.x                     | 说明                                |
| -------------------------------- | ------------------------ | ----------------------------------- |
| `dist/index.cjs.js`              | `dist/index.js`          | CJS 输出重命名                      |
| `dist/index.mjs`                 | `dist/index.mjs`         | ESM 输出（不变）                    |
| `dist/index.esm-browser.js`      | `dist/index.mjs`         | 直接使用 ESM 输出                   |
| `dist/index.esm-browser.prod.js` | `dist/index.mjs`         | 直接使用 ESM 输出（构建工具会压缩） |
| `dist/index.global.js`           | `dist/index.iife.js`     | IIFE 输出重命名                     |
| `dist/index.global.prod.js`      | `dist/index.iife.min.js` | IIFE 压缩版重命名                   |

### 2. CDN 使用方式

CDN 使用方式已更改：

```html
<!-- v5.x -->
<script src="https://unpkg.com/js-cool/dist/index.global.prod.js"></script>
<script>
  const { copy } = window.JsCool
</script>

<!-- v6.x -->
<script src="https://unpkg.com/js-cool/dist/index.iife.min.js"></script>
<script>
  const { copy } = window.jsCool // 注意：小写 'jsCool'
</script>
```

### 3. Package.json 导出

v6.x 使用正确的条件导出：

```json
// v5.x
{
  "main": "dist/index.cjs.js",
  "module": "dist/index.mjs"
}

// v6.x
{
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "exports": {
    ".": {
      "require": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
      "import": { "types": "./dist/index.d.mts", "default": "./dist/index.mjs" }
    },
    "./ua": {
      "require": { "types": "./dist/ua/index.d.ts", "default": "./dist/ua/index.js" },
      "import": { "types": "./dist/ua/index.d.mts", "default": "./dist/ua/index.mjs" }
    }
  }
}
```

### 4. 移除废弃函数

| 已移除                | 替代方案                                   |
| --------------------- | ------------------------------------------ |
| `getAppVersion()`     | `appVersion()`                             |
| `getOsVersion()`      | `osVersion()`                              |
| `getDirParam()`       | `getDirParams()`                           |
| `getScrollPosition()` | `scroll.getPosition()`                     |
| `getQueryParam()`     | `url.get()` 或 `new Url(url).get()`        |
| `getQueryParams()`    | `url.parse()` 或 `new Url(url).toObject()` |
| `getUrlParam()`       | `url.get()` 或 `new Url(url).get()`        |
| `getUrlParams()`      | `url.parse()` 或 `new Url(url).toObject()` |
| `parseUrlParam()`     | `url.parse()`                              |
| `spliceUrlParam()`    | `url.stringify()` 或 `new Url(url).set()`  |

### 5. 移除 `pattern` 对象

`pattern` 对象已被移除，替换为新的 `patterns` 模块。

```js
// v5.x（已移除）
import { pattern } from 'js-cool'
pattern.email.test('user@example.com')

// v6.x
import { patterns, validation } from 'js-cool'
patterns.validation.email.test('user@example.com')
// 或
validation.email.test('user@example.com')
```

详见 [迁移：`pattern` → `patterns`](#迁移pattern--patterns)。

### 5. 移除 `client` 模块

`client` 模块已被完全移除，替换为 `ua`。

### 6. 存储函数替换为命名空间 API

独立的存储函数已被统一的 `storage` 命名空间替代：

| v5.x (已移除)              | v6.x                                             |
| -------------------------- | ------------------------------------------------ |
| `setCache(k, v)`           | `storage.local.set(k, v)`                        |
| `setCache(k, v, seconds)`  | `storage.local.set(k, v, { expires: seconds })`  |
| `getCache(k)`              | `storage.local.get(k)`                           |
| `delCache(k)`              | `storage.local.delete(k)`                        |
| `setSession(k, v)`         | `storage.session.set(k, v)`                      |
| `getSession(k)`            | `storage.session.get(k)`                         |
| `delSession(k)`            | `storage.session.delete(k)`                      |
| `setCookie(k, v, seconds)` | `storage.cookie.set(k, v, { expires: seconds })` |
| `getCookie(k)`             | `storage.cookie.get(k)`                          |
| `getCookies()`             | `storage.cookie.getAll()`                        |
| `delCookie(k)`             | `storage.cookie.delete(k)`                       |

---

## 构建系统迁移

v6.0 从 Rollup 迁移到 Rolldown，简化了构建产物并提升了构建速度。

### 构建性能对比

| 指标     | v5.x (Rollup) | v6.x (Rolldown) |
| -------- | ------------- | --------------- |
| 构建时间 | ~6-8s         | ~110ms          |
| 配置文件 | ~190 行       | ~65 行          |
| 依赖     | 10+ 插件      | 内置            |

---

## 滚动工具迁移

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

### 新增功能

| 方法                         | 说明                        |
| ---------------------------- | --------------------------- |
| `getPosition(el, threshold)` | 支持自定义元素和阈值        |
| `getProgress(el)`            | 新增：获取滚动进度（0-100） |
| `createDirectionTracker()`   | 新增：追踪滚动方向          |
| `isInViewport(el, opts)`     | 新增：检测元素是否在视口内  |
| `scrollTo(target, opts)`     | 新增：滚动到元素/位置       |
| `lock()` / `unlock()`        | 新增：锁定/解锁滚动         |
| `getScrollbarWidth()`        | 新增：获取滚动条宽度        |

---

## 迁移：`client` → `ua`

### 为什么要改？

`client` 模块已被重写为 `ua`（User Agent），具有以下优势：

- **更好的 tree-shaking** - 通过 `js-cool/ua` 按需导入
- **更多功能** - 设备检测、操作系统检测、国产应用检测
- **更清晰的 API** - 更直观的方法名和结构
- **TypeScript 支持** - 完整的类型定义

### 基础迁移

```js
// v5.x（已废弃）
import { client } from 'js-cool'

client.isMobile()
client.info
client.get('browser')

// v6.x
import { ua } from 'js-cool'

ua.isMobile()
ua.info
ua.get('browser')
```

### 子路径导入实现 Tree-shaking

为获得更小的打包体积，可以按需导入：

```js
// v6.x - 支持按需引入
import { isMobile, isTablet, isWeChat, isiOS } from 'js-cool/ua'
import { getBrowserInfo, getDeviceInfo, getOSInfo } from 'js-cool/ua'
import { getNetworkInfo, getScreenInfo } from 'js-cool/ua'
import type { UAInfo, DeviceInfo, OSInfo, BrowserInfo } from 'js-cool/ua'
```

### API 对照表

| 旧 API (`client`)           | 新 API (`ua`)           | 说明         |
| --------------------------- | ----------------------- | ------------ |
| `client`                    | `ua`                    | 模块重命名   |
| `client()`                  | `ua()` 或 `ua.info`     | 返回完整信息 |
| `client.info`               | `ua.info`               | 不变         |
| `client.get('browser')`     | `ua.get('browser')`     | 不变         |
| `client.get('device')`      | `ua.get('device')`      | 不变         |
| `client.get('os')`          | `ua.get('os')`          | 不变         |
| `client.get('engine')`      | `ua.get('engine')`      | 不变         |
| `client.getMultiple([...])` | `ua.getMultiple([...])` | 不变         |
| `client.isMobile()`         | `ua.isMobile()`         | 不变         |
| `client.isWeChat()`         | `ua.isWeChat()`         | 不变         |
| `client.isQQ()`             | `ua.isQQ()`             | 不变         |
| `ClientDetector`            | `UAParser`              | 类重命名     |
| `IClientDetector`           | `IUAParser`             | 接口重命名   |
| `ClientInfo`                | `UAInfo`                | 类型重命名   |
| `ClientGetType`             | `UAGetType`             | 类型重命名   |

### `ua` 模块新功能

`ua` 模块包含旧 `client` 模块中没有的新功能：

#### 设备检测

```js
import { ua } from 'js-cool'

ua.device.phone // 是否为手机
ua.device.tablet // 是否为平板
ua.device.desktop // 是否为桌面设备
ua.device.mobile // 是否为移动设备（手机或平板）
ua.device.touch // 是否支持触摸
ua.device.ipad // 是否为 iPad
ua.device.iphone // 是否为 iPhone
ua.device.androidPhone // 是否为安卓手机
ua.device.androidTablet // 是否为安卓平板
```

#### 操作系统检测

```js
ua.os.name // 'Windows', 'macOS', 'iOS', 'Android', 'HarmonyOS' 等
ua.os.version // 操作系统版本字符串
ua.isiOS() // 是否为 iOS
ua.isiPadOS() // 是否为 iPadOS（新！）
ua.isAndroid() // 是否为 Android
ua.isHarmonyOS() // 是否为鸿蒙系统（新！）
```

#### 浏览器检测

```js
ua.browser.name // 'Chrome', 'Firefox', 'Safari', 'Edge' 等
ua.browser.version // 浏览器版本
ua.browser.engine // 'Blink', 'WebKit', 'Gecko' 等
```

#### 环境检测（国产应用）

```js
ua.environment.wechat // 微信
ua.environment.qq // QQ
ua.environment.wxwork // 企业微信（新！）
ua.environment.dingtalk // 钉钉（新！）
ua.environment.douyin // 抖音（新！）
ua.environment.kuaishou // 快手（新！）
ua.environment.baidu // 百度 App（新！）
ua.environment.xiaomi // 小米浏览器（新！）
ua.environment.huawei // 华为浏览器（新！）
ua.environment.miniProgram // 小程序
ua.environment.miniGame // 小游戏（新！）
```

#### 快捷检测方法

```js
ua.isMobile() // 是否为移动设备
ua.isTablet() // 是否为平板
ua.isDesktop() // 是否为桌面设备
ua.isTouch() // 是否支持触摸
ua.isiOS() // 是否为 iOS/iPadOS
ua.isAndroid() // 是否为 Android
ua.isHarmonyOS() // 是否为鸿蒙系统
ua.isWeChat() // 是否为微信
ua.isQQ() // 是否为 QQ
ua.isMiniProgram() // 是否为小程序
ua.isDarkMode() // 是否开启深色模式（新！）
```

#### 工具方法

```js
ua.getNetwork() // 网络信息: { online, type, effectiveType, downlink, rtt, saveData }
ua.getScreen() // 屏幕信息: { width, height, pixelRatio, orientation, colorDepth }
ua.getLanguage() // 浏览器语言: 'zh-CN'
ua.getTimezone() // 时区: 'Asia/Shanghai'
ua.getOrientationStatus() // 屏幕方向: 'portrait' 或 'landscape'
ua.isDarkMode() // 是否偏好深色模式
ua.has('Chrome') // 检查 UA 字符串中是否包含指定内容
```

#### 自定义 UA 检测

```js
import { UAParser } from 'js-cool'

// 使用自定义 UA 字符串创建解析器
const parser = new UAParser('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)')

detector.isMobile() // true
detector.isiOS() // true
detector.browser.name // 'Safari'
```

### 独立函数（支持 Tree-shaking）

```js
// 从子路径导入，支持 tree-shaking
import {
  isMobile,
  isTablet,
  isWeChat,
  isQQ,
  isiOS,
  isAndroid,
  isHarmonyOS,
  isDarkMode,
  getDeviceInfo,
  getOSInfo,
  getBrowserInfo,
  getNetworkInfo,
  getScreenInfo,
} from 'js-cool/ua'

// 直接使用
if (isMobile()) {
  // 移动端逻辑
}

if (isWeChat()) {
  // 微信环境逻辑
}

const device = getDeviceInfo()
// { type, mobile, tablet, desktop, touch, phone, ipad, iphone, ... }
```

---

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

---

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
const detector = new ClientDetector()

// v6.x
import { ua, UAParser } from 'js-cool'

const info = ua()
const isMobile = ua.isMobile()
const parser = new UAParser()

// 或使用 tree-shaking
import { isMobile, getDeviceInfo } from 'js-cool/ua'
```

### 第七步：更新 TypeScript 类型

```ts
// v5.x
import type { ClientInfo } from 'js-cool'

// v6.x
import type { UAInfo } from 'js-cool'
// 或
import type { UAInfo, DeviceInfo } from 'js-cool/ua'
```

---

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

---

## 迁移：`getDirParam` → `getDirParams`

### 为什么要改？

`getDirParam` 函数已被完全重写为 `getDirParams`，具有以下优势：

- **更好的结构** - 返回结构化的 URL 组成部分，而非索引对象
- **更多信息** - 包含 origin、host、hostname、pathname、query、hash
- **正确处理 query/hash** - 正确分离查询字符串和 hash
- **IE11 兼容** - 使用原生 URL API，不支持时自动降级到正则

### API 对比

```js
// v5.x（已废弃）
import { getDirParam } from 'js-cool'

const result = getDirParam('https://example.com/user/123/profile')
// { host: 'https://example.com', path: ['user', '123', 'profile'] }

// v6.x
import { getDirParams } from 'js-cool'

const result = getDirParams('https://example.com/user/123/profile')
// {
//   origin: 'https://example.com',
//   host: 'example.com',
//   hostname: 'example.com',
//   pathname: '/user/123/profile',
//   segments: ['user', '123', 'profile'],
//   query: '',
//   hash: ''
// }
```

### 返回值映射

| 旧 (`getDirParam`) | 新 (`getDirParams`) | 说明                 |
| ------------------ | ------------------- | -------------------- |
| `host`             | `origin`            | 现在包含协议         |
| -                  | `host`              | 新增：主机名 + 端口  |
| -                  | `hostname`          | 新增：仅主机名       |
| -                  | `pathname`          | 新增：完整路径字符串 |
| `path`             | `segments`          | 重命名               |
| -                  | `query`             | 新增：查询字符串     |
| -                  | `hash`              | 新增：hash 值        |

### 迁移示例

```js
// v5.x - 获取路径段
const { path } = getDirParam(url)
const firstSegment = path[0]

// v6.x - 获取路径段
const { segments } = getDirParams(url)
const firstSegment = segments[0]

// v5.x - 获取主机
const { host } = getDirParam(url)

// v6.x - 获取 origin（包含协议）
const { origin } = getDirParams(url)

// v6.x - 新功能
const { query, hash, hostname, pathname } = getDirParams(url)
```

### 修复的问题

旧的 `getDirParam` 会错误地将 query string 混入最后一个路径段：

```js
// v5.x - Bug：query string 混入路径
getDirParam('https://example.com/api/users?id=123')
// { host: 'https://example.com', path: ['api', 'users?id=123'] }

// v6.x - 已修复：query string 正确分离
getDirParams('https://example.com/api/users?id=123')
// { origin: 'https://example.com', segments: ['api', 'users'], query: 'id=123', ... }
```

---

## 迁移：`pattern` → `patterns`

### 为什么要改？

`pattern` 对象已被移除，替换为新的统一 `patterns` 模块：

- **更好的组织** - 分离为 `validation` 和 `ua` 两个类别
- **更多模式** - 新增 `idCard`、`hexColor`，改进 `mobile`、`qq`
- **UA 模式** - 直接访问设备、浏览器、操作系统检测模式
- **工具函数** - `getUserAgent`、`matchPattern`、`extractVersion`
- **TypeScript 支持** - 完整的模式名称类型定义

### API 对比

```js
// v5.x（已移除）
import { pattern } from 'js-cool'

pattern.email.test('user@example.com')
pattern.mobile.test('13800138000')
pattern.url.test('https://example.com')

// v6.x
import { patterns, validation } from 'js-cool'

// 使用 patterns 对象
patterns.validation.email.test('user@example.com')
patterns.validation.mobile.test('13800138000')
patterns.validation.url.test('https://example.com')

// 或直接导入
validation.email.test('user@example.com')
validation.mobile.test('13800138000')
```

### 模式名称映射

| 旧 (`pattern`) | 新 (`validation`) | 说明                    |
| -------------- | ----------------- | ----------------------- |
| `any`          | `any`             | 不变                    |
| `email`        | `email`           | 不变                    |
| `mobile`       | `mobile`          | 更新：支持 1[3-9]xxx... |
| `url`          | `url`             | 不变                    |
| `number`       | `number`          | 不变                    |
| `chinese`      | `chinese`         | 不变                    |
| `ip4`          | `ipv4`            | 重命名                  |
| `ip4_pri`      | `ipv4Private`     | 重命名                  |
| `mac`          | `mac`             | 不变                    |
| `qq`           | `qq`              | 更新：支持 5-14 位      |
| `pass`         | `password`        | 重命名                  |
| `postcode`     | `postcode`        | 不变                    |
| `username`     | `username`        | 不变                    |
| `tel`          | `tel`             | 不变                    |
| `json`         | `json`            | 不变                    |
| `array`        | `array`           | 不变                    |
| `arrjson`      | `arrjson`         | 不变                    |
| `isjson`       | `jsonLike`        | 重命名                  |
| `float`        | `float`           | 不变                    |
| `string`       | `string`          | 不变                    |
| `textarea`     | `textarea`        | 不变                    |
| -              | `idCard`          | **新增**：中国身份证    |
| -              | `hexColor`        | **新增**：十六进制颜色  |

### 新功能

#### UA 检测模式

```js
import { DEVICE_PATTERNS, BROWSER_PATTERNS, OS_PATTERNS, ENV_PATTERNS } from 'js-cool'

// 设备检测
DEVICE_PATTERNS.mobile.test(navigator.userAgent)
DEVICE_PATTERNS.tablet.test(navigator.userAgent)
DEVICE_PATTERNS.iphone.test(navigator.userAgent)

// 浏览器检测
BROWSER_PATTERNS.chrome.test(navigator.userAgent)
BROWSER_PATTERNS.firefox.test(navigator.userAgent)
BROWSER_PATTERNS.safari.test(navigator.userAgent)

// 操作系统检测
OS_PATTERNS.windows.test(navigator.userAgent)
OS_PATTERNS.macOS.test(navigator.userAgent)
OS_PATTERNS.harmonyOS.test(navigator.userAgent)

// 环境检测（国产应用）
ENV_PATTERNS.wechat.test(navigator.userAgent)
ENV_PATTERNS.dingtalk.test(navigator.userAgent)
ENV_PATTERNS.miniProgram.test(navigator.userAgent)
```

#### 工具函数

```js
import { getUA, matchPattern, extractVersion } from 'js-cool'

// 安全获取 UA 字符串
const ua = getUA()

// 检查模式是否存在
matchPattern(ua, /Chrome/i) // true/false

// 提取版本号
extractVersion(ua, /Chrome\/(\d+\.?\d*)/i) // '91.0'
```

### 迁移示例

```js
// v5.x - 邮箱验证
if (pattern.email.test(email)) {
  /* ... */
}

// v6.x - 邮箱验证
if (validation.email.test(email)) {
  /* ... */
}

// v5.x - 中国手机号
if (pattern.mobile.test(phone)) {
  /* ... */
}

// v6.x - 中国手机号（改进的正则）
if (validation.mobile.test(phone)) {
  /* ... */
}

// v5.x - IPv4
if (pattern.ip4.test(ip)) {
  /* ... */
}

// v6.x - IPv4（重命名）
if (validation.ipv4.test(ip)) {
  /* ... */
}

// v5.x - 密码
if (pattern.pass.test(password)) {
  /* ... */
}

// v6.x - 密码（重命名）
if (validation.password.test(password)) {
  /* ... */
}
```

### TypeScript 类型

```ts
// v6.x - 新增类型导出
import type {
  ValidationPatternName,
  DevicePatternName,
  OSPatternName,
  BrowserPatternName,
  EnginePatternName,
  EnvPatternName,
  URLPatternName,
} from 'js-cool'
```

---

## 新增：URL 工具

URL 工具提供类 URLSearchParams API 和新的链式 `Url` 类：

### Url 类

增强版 URL 构建器，同时解析 search 和 hash 参数：

```js
import { Url } from 'js-cool'

// 基础用法 - 自动从 search + hash 查找（hash 优先）
const u = new Url('https://a.cn/?ss=1#/path?bb=343')

u.get('ss') // '1' (来自 search)
u.get('bb') // '343' (来自 hash)
u.has('ss') // true
u.keys() // ['ss', 'bb']

// 指定范围
u.get('ss', 'search') // '1'
u.get('ss', 'hash') // null
u.get('ss', 'all') // '1' (默认，hash 优先)

// 获取所有参数
u.toObject() // { ss: '1', bb: '343' }
u.toObject('search') // { ss: '1' }
u.toObject('hash') // { bb: '343' }

// 详细信息（区分来源）
u.toDetailObject()
// {
//   search: { ss: '1' },
//   hash: { bb: '343' },
//   all: { ss: '1', bb: '343' },
//   source: { ss: 'search', bb: 'hash' }
// }

// 链式修改
u.set('token', 'abc').set('page', 1).delete('ss')
u.toString() // 'https://a.cn/?token=abc&page=1#/path?bb=343'

// 操作 hash 参数
u.set('bb', '999', 'hash')
u.toURL() // 'https://a.cn/?token=abc&page=1#/path?bb=999'

// URL 构建
new Url('https://api.example.com')
  .path('users', '123')
  .set('fields', 'name,email')
  .setHash('section')
  .toString()
// 'https://api.example.com/users/123?fields=name,email#section'

// 属性 getter
u.origin // 'https://example.com'
u.host // 'example.com:8080'（含端口）
u.hostname // 'example.com'
u.pathname // '/api/users'
u.search // '?id=123'
u.hash // '#section'

// 静态方法
Url.parse('?a=1&b=true', { convert: true }) // { a: 1, b: true }
Url.stringify({ a: 1, b: 2 }) // '?a=1&b=2'
Url.getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
Url.getHost('https://example.com:8080/path') // 'example.com:8080'
Url.getPathname('https://example.com/api/users?id=1') // '/api/users'
Url.current() // 从当前页面 URL 创建
Url.fromQueryString('a=1&b=2') // 从查询字符串创建
```

### url 命名空间（静态方法）

```js
import { url } from 'js-cool'

// 静态方法
url.parse('?a=1&b=true', { convert: true }) // { a: 1, b: true }
url.stringify({ a: 1, b: 2 }) // '?a=1&b=2'

// 类 URLSearchParams 方法（静态）
url.get('id', 'https://example.com?id=123') // '123'
url.getAll('id', 'https://example.com?id=1&id=2') // ['1', '2']
url.has('token', 'https://example.com?token=abc') // true
url.set('page', 2, 'https://example.com') // 'https://example.com/?page=2'
url.append('id', 3, 'https://example.com?id=1') // 'https://example.com/?id=1&id=3'
url.delete('token', 'https://example.com?token=abc&id=1') // 'https://example.com/?id=1'

// 迭代方法
url.keys('https://example.com?a=1&b=2') // ['a', 'b']
url.values('https://example.com?a=1&b=2') // ['1', '2']
url.entries('https://example.com?a=1&b=2') // [['a', '1'], ['b', '2']]

// URL 属性提取
url.getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
url.getHost('https://example.com:8080/path') // 'example.com:8080'
url.getHostname('https://example.com:8080/path') // 'example.com'
url.getPathname('https://example.com/api/users?id=1') // '/api/users'
url.getSearch('https://example.com?key=value') // '?key=value'
url.getHash('https://example.com/path#section') // '#section'
```

### 直接导入函数

```js
import {
  get,
  getAll,
  has,
  set,
  append,
  deleteParam,
  keys,
  values,
  entries,
  getOrigin,
  getHost,
  getHostname,
  getPathname,
  getSearch,
  getHash,
  parse,
  stringify,
} from 'js-cool'

// 与 url.* 静态方法相同
get('id', 'https://example.com?id=123') // '123'
set('page', 2, 'https://example.com') // 'https://example.com/?page=2'
parse('?a=1&b=true', { convert: true }) // { a: 1, b: true }
stringify({ a: 1, b: 2 }) // '?a=1&b=2'
```

---

## 迁移：二进制转换函数 → `binary` 模块

### 为什么要改？

二进制转换函数已统一到新的 `binary` 模块：

- **链式 API** - 单一入口点，在任意格式间转换
- **统一的接口** - 所有转换类型方法名一致
- **更多功能** - 哈希函数（MD5、SHA-1、SHA-256、CRC32）、文件元数据、十六进制编码
- **类型检测** - `isBlob()`、`isFile()`、`isArrayBuffer()`、`isDataURL()`、`isBase64()`
- **更好的 TypeScript 支持** - 完整的类型定义
- **IE11 兼容** - 内置兼容层

### 函数对照表

| 旧函数 (v5.x)                   | 新模块 API (v6.x)                                            |
| ------------------------------- | ------------------------------------------------------------ |
| `encodeBase64(str)`             | `binary.base64.encode(str)` 或 `binary.text.toBase64(str)`   |
| `decodeBase64(str)`             | `binary.base64.decode(str)` 或 `binary.text.fromBase64(str)` |
| `arrayBufferToBase64(buf)`      | `binary.arrayBuffer.toBase64(buf)`                           |
| `base64ToArrayBuffer(b64)`      | `binary.base64.toArrayBuffer(b64)`                           |
| `base64ToBlob(b64, mime)`       | `binary.base64.toBlob(b64, mime)`                            |
| `base64ToFile(b64, name, mime)` | `binary.base64.toFile(b64, name, mime)`                      |
| `blobToArrayBuffer(blob)`       | `await binary.blob.toArrayBuffer(blob)`                      |
| `blobToBase64(blob)`            | `await binary.blob.toBase64(blob)`                           |
| `blobToUrl(blob)`               | `binary.blob.toURL(blob).url`                                |
| `fileToBase64(file)`            | `await binary.file.toBase64(file)`                           |
| `svgToBlob(svg)`                | `binary.svg.toBlob(svg)`                                     |
| `urlToBlob(url)`                | `await binary.url.toBlob(url)`                               |
| `arrayBufferToBlob(buf, mime)`  | `binary.arrayBuffer.toBlob(buf, mime)`                       |

### 基础迁移

```js
// v5.x - 独立函数
import { encodeBase64, decodeBase64, blobToBase64, base64ToBlob, fileToBase64 } from 'js-cool'

const b64 = encodeBase64('Hello World')
const str = decodeBase64(b64)
const base64FromBlob = await blobToBase64(blob)
const blobFromBase64 = base64ToBlob(b64, 'image/png')
const base64FromFile = await fileToBase64(file)

// v6.x - 统一的 binary 模块
import { binary } from 'js-cool'

const b64 = binary.base64.encode('Hello World')
const str = binary.base64.decode(b64)
const base64FromBlob = await binary.blob.toBase64(blob)
const blobFromBase64 = binary.base64.toBlob(b64, 'image/png')
const base64FromFile = await binary.file.toBase64(file)
```

### 链式转换（新功能）

新的 `binary.from()` 方法提供链式转换 API：

```js
import { binary } from 'js-cool'

// 从任意输入类型转换到任意输出类型
const base64 = await binary.from(blob).toBase64()
const arrayBuffer = await binary.from(file).toArrayBuffer()
const dataURL = await binary.from(base64String).toDataURL('image/png')
const { url, revoke } = await binary.from(arrayBuffer).toURL()

// 获取元数据
const mime = binary.from(blob).getMime()
const size = binary.from(file).getSize()
```

### 新功能

#### 哈希函数

```js
import { binary } from 'js-cool'

// 计算哈希值
const md5 = await binary.hash.md5('Hello World')
// 'b10a8db164e0754105b7a99be72e3fe5'

const sha1 = await binary.hash.sha1('Hello World')
// '0a4d55a8d778e5022fab701977c5d840bbc486d0'

const sha256 = await binary.hash.sha256('Hello World')
// 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'

const crc32 = binary.hash.crc32('Hello World')
// 2346237359
```

#### 十六进制编码

```js
import { binary } from 'js-cool'

// 十六进制编解码
const buffer = binary.text.encode('Hello')
const hex = binary.hex.encode(buffer) // '48656c6c6f'

const decoded = binary.hex.decode('48656c6c6f')
const text = binary.text.decode(decoded) // 'Hello'
```

#### 文件元数据

```js
import { binary } from 'js-cool'

const meta = binary.meta.get(file)
// {
//   size: 1024,
//   mime: 'image/png',
//   name: 'image.png',
//   extension: 'png',
//   isImage: true,
//   isVideo: false,
//   isAudio: false,
//   isText: false,
//   lastModified: 1640000000000
// }
```

#### 类型检测

```js
import { binary } from 'js-cool'

binary.isBlob(new Blob(['hello'])) // true
binary.isFile(new File(['hello'], 'test.txt')) // true
binary.isArrayBuffer(new ArrayBuffer(8)) // true
binary.isDataURL('data:text/plain;base64,SGVsbG8=') // true
binary.isBase64('SGVsbG8gV29ybGQ=') // true
```

#### 二进制比较与克隆

```js
import { binary } from 'js-cool'

// 比较二进制数据
const same = await binary.compare(blob1, blob2) // true/false

// 克隆二进制数据
const cloned = binary.clone(blob) // 相同内容的新 Blob

// 下载二进制数据
binary.download(blob, 'file.txt')
```

### 子模块 API

`binary` 模块导出多个子模块：

```js
import { binary } from 'js-cool'

// base64 模块
binary.base64.encode(str)
binary.base64.decode(b64)
binary.base64.toBlob(b64, mime?)
binary.base64.toArrayBuffer(b64)
binary.base64.toDataURL(b64, mime)
binary.base64.toFile(b64, filename, mime?)

// blob 模块
await binary.blob.toBase64(blob)
await binary.blob.toArrayBuffer(blob)
await binary.blob.toDataURL(blob)
binary.blob.toFile(blob, filename)
binary.blob.toURL(blob) // { url, revoke }
binary.blob.concat([blob1, blob2], mime?)
binary.blob.slice(blob, start, end, mime?)

// arrayBuffer 模块
binary.arrayBuffer.toBase64(buffer, mime?)
binary.arrayBuffer.toDataURL(buffer, mime)
binary.arrayBuffer.toBlob(buffer, mime?)
binary.arrayBuffer.toString(buffer, encoding?)
binary.arrayBuffer.toHex(buffer)

// file 模块
await binary.file.toBase64(file)
await binary.file.toArrayBuffer(file)
binary.file.toBlob(file)

// text 模块
binary.text.encode(str, encoding?)
binary.text.decode(buffer, encoding?)
binary.text.toBase64(str)
binary.text.fromBase64(b64)

// hex 模块
binary.hex.encode(buffer)
binary.hex.decode(hex)

// dataURL 模块
binary.dataURL.parse(dataURL) // { mime, base64, data }
binary.dataURL.build(b64, mime)
binary.dataURL.isValid(str)

// svg 模块
binary.svg.toBlob(svg)
binary.svg.toDataURL(svg)
binary.svg.toURL(svg) // { url, revoke }

// url 模块
await binary.url.toBlob(url)
await binary.url.toDataURL(url)

// hash 模块
await binary.hash.md5(data)
await binary.hash.sha1(data)
await binary.hash.sha256(data)
binary.hash.crc32(data)

// meta 模块
binary.meta.get(file)
```

### 迁移示例

```js
// v5.x - Base64 编码
import { encodeBase64, decodeBase64 } from 'js-cool'
const encoded = encodeBase64('Hello 世界')
const decoded = decodeBase64(encoded)

// v6.x - 使用 binary 模块
import { binary } from 'js-cool'
const encoded = binary.base64.encode('Hello 世界')
const decoded = binary.base64.decode(encoded)

// v5.x - Blob 转换
import { blobToBase64, blobToUrl } from 'js-cool'
const b64 = await blobToBase64(blob)
const url = blobToUrl(blob)

// v6.x - 使用 binary 模块
import { binary } from 'js-cool'
const b64 = await binary.blob.toBase64(blob)
const { url } = binary.blob.toURL(blob)

// v5.x - 文件处理
import { fileToBase64 } from 'js-cool'
const b64 = await fileToBase64(file)

// v6.x - 使用链式 API
import { binary } from 'js-cool'
const b64 = await binary.from(file).toBase64()
const meta = binary.meta.get(file)

// v5.x - 多次转换
import { blobToArrayBuffer, arrayBufferToBase64 } from 'js-cool'
const buffer = await blobToArrayBuffer(blob)
const b64 = arrayBufferToBase64(buffer)

// v6.x - 单次链式调用
import { binary } from 'js-cool'
const b64 = await binary.from(blob).toBase64()
```

---

## 迁移：存储函数 → `storage` 命名空间

### 为什么要改？

存储函数已完全重构为统一的命名空间 API：

- **统一的 API** - `localStorage`、`sessionStorage` 和 `Cookie` 接口一致
- **泛型类型支持** - 类型安全的存储 `storage.local.get<T>()`
- **错误处理** - `StorageQuotaError` 和 `StorageUnavailableError` 类
- **更多方法** - 所有存储类型都有 `has()`、`keys()`、`clear()`、`length`
- **更完善的 Cookie 选项** - 完全控制 `path`、`domain`、`secure`、`sameSite`
- **Tree-shaking** - 通过 `js-cool/storage` 子路径导入

### 基础迁移

```js
// v5.x（已废弃）
import { setCache, getCache, delCache } from 'js-cool'

setCache('user', { id: 1 })
setCache('token', 'abc', 3600)
const user = getCache('user')
delCache('token')

// v6.x
import { storage } from 'js-cool'

storage.local.set('user', { id: 1 })
storage.local.set('token', 'abc', { expires: 3600 })
const user = storage.local.get('user')
storage.local.delete('token')
```

### API 对照表

| 旧 API                     | 新 API                                           | 说明                   |
| -------------------------- | ------------------------------------------------ | ---------------------- |
| `setCache(k, v)`           | `storage.local.set(k, v)`                        | 统一命名空间           |
| `setCache(k, v, seconds)`  | `storage.local.set(k, v, { expires: seconds })`  | 选项对象               |
| `getCache(k)`              | `storage.local.get(k)`                           | 返回 `T \| null`       |
| `delCache(k)`              | `storage.local.delete(k)`                        | 方法重命名             |
| -                          | `storage.local.has(k)`                           | **新增**：检查是否存在 |
| -                          | `storage.local.keys()`                           | **新增**：获取所有键   |
| -                          | `storage.local.clear()`                          | **新增**：清空所有     |
| -                          | `storage.local.length`                           | **新增**：条目数量     |
| `setSession(k, v)`         | `storage.session.set(k, v)`                      | 与 local 相同          |
| `getSession(k)`            | `storage.session.get(k)`                         | 与 local 相同          |
| `delSession(k)`            | `storage.session.delete(k)`                      | 与 local 相同          |
| `setCookie(k, v, seconds)` | `storage.cookie.set(k, v, { expires: seconds })` | 选项对象               |
| `setCookie(k, v, s, path)` | `storage.cookie.set(k, v, { expires: s, path })` | 选项对象               |
| `getCookie(k)`             | `storage.cookie.get(k)`                          | 返回 `string \| null`  |
| `getCookies()`             | `storage.cookie.getAll()`                        | 方法重命名             |
| `delCookie(k)`             | `storage.cookie.delete(k)`                       | 方法重命名             |
| -                          | `storage.cookie.has(k)`                          | **新增**：检查是否存在 |
| -                          | `storage.cookie.clear()`                         | **新增**：清空所有     |

### Cookie 选项

v6.x 提供完整的 Cookie 选项支持：

```js
// v5.x - 选项有限
setCookie('session', 'xyz', 86400, '/app')

// v6.x - 完整选项
storage.cookie.set('session', 'xyz', {
  expires: 86400, // 过期时间（秒）
  path: '/app', // Cookie 路径
  domain: '.example.com', // Cookie 域名
  secure: true, // 仅 HTTPS
  sameSite: 'Strict', // 'Strict' | 'Lax' | 'None'
})
```

### 泛型类型支持

```ts
// v6.x - 类型安全的存储
interface User {
  id: number
  name: string
}

storage.local.set<User>('user', { id: 1, name: 'John' })
const user = storage.local.get<User>('user') // User | null
```

### 错误处理

```ts
// v6.x - 正确的错误处理
import { storage, StorageQuotaError, StorageUnavailableError } from 'js-cool'

try {
  storage.local.set('key', largeData)
} catch (e) {
  if (e instanceof StorageQuotaError) {
    console.error('存储空间已满')
  } else if (e instanceof StorageUnavailableError) {
    console.error('存储不可用（SSR 或隐私模式）')
  }
}
```

### 子路径导入

```js
// v6.x - 支持 tree-shaking
import { storage, local, session, cookie } from 'js-cool/storage'
import type { StorageOptions, CookieOptions } from 'js-cool/storage'
```

---

## 需要帮助？

- **GitHub Issues:** [https://github.com/saqqdy/js-cool/issues](https://github.com/saqqdy/js-cool/issues)
- **更新日志:** [CHANGELOG.md](./CHANGELOG.md)
- **文档:** [README.md](./README.md)
