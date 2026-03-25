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

### 已移除函数

以下函数由于存在 bug 或缺乏实用性已被移除：

| 函数                | 原因                        | 替代方案                       |
| ------------------- | --------------------------- | ------------------------------ |
| `isExitsVariable()` | 实现有 bug，始终返回 `true` | 使用 `getGlobal(name) != null` |

```js
// v5.x（已移除 - 存在 bug）
isExitsVariable('someVar') // 始终返回 true

// v6.x - 使用 getGlobal 替代
import { getGlobal } from 'js-cool'
getGlobal('someVar') !== undefined // 检查全局变量是否存在
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

### IE11 兼容性

v6.x 内置 IE11 兼容性支持，无需引入外部 polyfill。通过内置 `_compat.ts` 模块提供 ES6+ 特性的 IE11 兼容替代方案。

#### IE11 相关变更

| 函数             | 变更                                  |
| ---------------- | ------------------------------------- |
| `base64ToFile()` | 返回类型从 `File` 改为 `File \| Blob` |
| 所有方法         | 现在使用内部兼容层                    |

#### 内置优雅降级的函数

| 函数             | IE11 行为               |
| ---------------- | ----------------------- |
| `isURL()`        | 降级为正则验证          |
| `getDirParams()` | 使用正则解析            |
| `urlToBlob()`    | 使用 XHR 替代 fetch     |
| `isDarkMode()`   | 返回 `false`            |
| `base64ToFile()` | 返回带 name 属性的 Blob |

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
| -                 | `UA` (新增) |

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

### 日期工具

`date` 命名空间和 `DateParser` 类是 v6.0.0 新增功能，提供链式 API 和丰富的日期操作。

#### 原有函数（仍然有效）

```js
// v5.x（仍然有效）
import { formatDate, dateDiff, relativeTime, isToday, getDaysInMonth } from 'js-cool'

formatDate(new Date(), 'YYYY-MM-DD')
dateDiff('2024-01-01', '2024-01-03')
relativeTime(new Date(Date.now() - 3600000))
isToday(new Date())
getDaysInMonth(2024, 1) // 29
```

#### 新增功能

**三种使用方式：**

```js
import { date, DateParser } from 'js-cool'

// 1. DateParser 类 - 链式 API
const d = new DateParser('2024-01-15')
d.add(1, 'day').format('YYYY-MM-DD') // '2024-01-16'
d.startOf('month').format() // '2024-01-01 00:00:00'

// 2. date 命名空间 - 工厂 + 静态方法
date('2024-01-15').add(1, 'day').format()
date.format(new Date(), 'YYYY-MM-DD')
date.diff('2024-01-01', '2024-01-03')
date.isToday(new Date())
date.getDaysInMonth(2024, 1)

// 3. 直接导入函数（支持 tree-shaking）
import { formatDate, isToday, isLeapYear, add, startOf } from 'js-cool'
```

#### 新增函数

| 函数                          | 说明                             |
| ----------------------------- | -------------------------------- |
| `isYesterday(date)`           | 检查日期是否为昨天               |
| `isTomorrow(date)`            | 检查日期是否为明天               |
| `isWeekend(date)`             | 检查日期是否为周末               |
| `isLeapYear(year)`            | 检查年份是否为闰年               |
| `isBefore(date1, date2)`      | 检查日期是否在另一个日期之前     |
| `isAfter(date1, date2)`       | 检查日期是否在另一个日期之后     |
| `isSame(date1, date2, unit)`  | 检查两个日期是否相同（可按单位） |
| `isBetween(date, start, end)` | 检查日期是否在范围内             |
| `compare(date1, date2)`       | 比较两个日期（返回 -1/0/1）      |
| `min(...dates)`               | 获取最小日期                     |
| `max(...dates)`               | 获取最大日期                     |
| `getQuarter(date)`            | 获取季度（1-4）                  |
| `getDayOfYear(date)`          | 获取年中第几天（1-366）          |
| `getWeekOfYear(date)`         | 获取年中第几周                   |
| `add(date, value, unit)`      | 添加时间                         |
| `subtract(date, value, unit)` | 减去时间                         |
| `startOf(date, unit)`         | 获取时间段开始                   |
| `endOf(date, unit)`           | 获取时间段结束                   |

#### 子路径导入

```js
// 从子路径导入以获得更好的 tree-shaking
import { date, DateParser, formatDate, isToday } from 'js-cool/date'
```

#### DateParser 类属性和方法

```js
const d = new DateParser('2024-03-15T14:30:45')

// 属性
d.year // 2024
d.month // 3 (1-12)
d.day // 15
d.hours // 14
d.minutes // 30
d.seconds // 45
d.dayOfWeek // 5 (周五)
d.timestamp // 毫秒时间戳
d.isValid // 是否有效日期

// 格式化
d.format('YYYY-MM-DD HH:mm:ss')
d.toISOString()
d.toDateString() // '2024-03-15'
d.toTimeString() // '14:30:45'

// 比较
d.isBefore('2024-04-01')
d.isAfter('2024-03-01')
d.isSame('2024-03-15', 'day')
d.isToday()
d.isYesterday()
d.isTomorrow()
d.isWeekend()
d.isLeapYear()

// 操作（返回新实例）
d.add(1, 'day') // 加一天
d.subtract(1, 'week') // 减一周
d.startOf('month') // 本月开始
d.endOf('day') // 今天结束

// 其他
d.diff('2024-03-20') // 计算差值
d.relativeTime() // 相对时间字符串
d.getQuarter() // 季度
d.getWeekOfYear() // 年中周数
d.getDayOfYear() // 年中天数
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

#### 新增功能

**三种使用方式：**

```js
import { url, Url } from 'js-cool'

// 1. Url 类 - 链式构建器
const apiUrl = new Url('https://api.example.com')
  .path('users', '123')
  .set('fields', 'name')
  .setHash('section')
  .toString()
// 'https://api.example.com/users/123?fields=name#section'

// 2. url 命名空间 - 工厂 + 静态方法
url.from('https://example.com?id=123').get('id') // '123'
url.parse('?a=1&b=true', { covert: true }) // { a: 1, b: true }
url.stringify({ a: 1, b: 2 }) // '?a=1&b=2'

// 3. 直接导入函数（支持 tree-shaking）
import { getQueryParamValue, setQueryParam, parseQueryString } from 'js-cool'
getQueryParamValue('id', 'https://example.com?id=123') // '123'
```

#### 描述性函数名称

v6.0.0 提供了描述性别名，提高代码可读性：

| 别名                     | 原名称        | 描述                 |
| ------------------------ | ------------- | -------------------- |
| `parseQueryString`       | `parse`       | 解析查询字符串为对象 |
| `stringifyQueryString`   | `stringify`   | 构建查询字符串       |
| `getQueryParamValue`     | `get`         | 获取单个参数值       |
| `getAllQueryParamValues` | `getAll`      | 获取同名参数所有值   |
| `hasQueryParam`          | `has`         | 检查参数是否存在     |
| `setQueryParam`          | `set`         | 设置参数值           |
| `appendQueryParam`       | `append`      | 追加参数值           |
| `deleteParam`            | `deleteParam` | 删除参数             |
| `getQueryParamKeys`      | `keys`        | 获取所有参数名       |
| `getQueryParamValues`    | `values`      | 获取所有参数值       |
| `getQueryParamEntries`   | `entries`     | 获取所有键值对       |

```js
// 使用描述性名称
import { parseQueryString, getQueryParamValue, setQueryParam } from 'js-cool'

const params = parseQueryString('?page=1&size=20&active=true', { covert: true })
// { page: 1, size: 20, active: true }

const page = getQueryParamValue('page', 'https://example.com?page=2')
// '2'

const newUrl = setQueryParam('page', 3, 'https://example.com?page=1')
// 'https://example.com/?page=3'
```

#### URL 属性提取

新增提取 URL 组成部分的函数：

```js
import { getOrigin, getHost, getHostname, getPathname, getSearch, getHash } from 'js-cool'

getOrigin('https://example.com:8080/path') // 'https://example.com:8080'
getHost('https://example.com:8080/path') // 'example.com:8080'
getHostname('https://example.com:8080/path') // 'example.com'
getPathname('https://example.com/api/users?id=1') // '/api/users'
getSearch('https://example.com?key=value') // '?key=value'
getHash('https://example.com/path#section') // '#section'
```

#### 子路径导入

```js
// 从子路径导入以获得更好的 tree-shaking
import { url, Url, parseQueryString, stringifyQueryString } from 'js-cool/url'
```

### URL 参数方法迁移指南

v6.0.0 引入了新的 `url` 命名空间和 `URLParams` 类，可以替代现有的多个 URL 参数处理方法。以下是完整的迁移指南。

::: warning v6.0.0 重大变更
以下函数已在 v6.0.0 中**移除**：

- `getUrlParams` - 使用 `url.parse()` 或 `URLParams.toObject('search')`
- `getUrlParam` - 使用 `url.get()` 或 `URLParams.get(name, 'search')`
- `parseUrlParam` - 使用带 `{ covert: true }` 选项的 `url.parse()`
- `spliceUrlParam` - 使用 `url.stringify()`
- `getQueryParam` - 使用 `URLParams.get(name, 'hash')`
- `getQueryParams` - 使用 `URLParams.toObject('hash')`
  :::

#### 替代关系对照表

| 原方法           | 可被 `url` 替代 | 可被 `URLParams` 替代 | 状态   | 说明                       |
| ---------------- | --------------- | --------------------- | ------ | -------------------------- |
| `getUrlParams`   | ✅              | ✅                    | 已移除 | 都只处理 search 参数       |
| `getUrlParam`    | ✅              | ✅                    | 已移除 | 都只处理 search 参数       |
| `parseUrlParam`  | ✅              | ✅                    | 已移除 | 都只处理 search 参数       |
| `spliceUrlParam` | ✅              | ✅                    | 已移除 | 参数拼接                   |
| `getQueryParam`  | ❌              | ✅                    | 已移除 | `url` 模块不支持 hash 参数 |
| `getQueryParams` | ❌              | ✅                    | 已移除 | `url` 模块不支持 hash 参数 |
| `getDirParams`   | ❌              | ❌                    | 可用   | 功能不同（路径解析）       |

#### `getUrlParams` 迁移

```js
// 原方法
import { getUrlParams } from 'js-cool'
getUrlParams('https://example.com?a=1&b=2')
// { a: '1', b: '2' }

// 替代方式 1: url.parse
import { url } from 'js-cool'
url.parse('?a=1&b=2')
// { a: '1', b: '2' }

// 替代方式 2: url.from().toParams()
url.from('https://example.com?a=1&b=2').toParams()
// { a: '1', b: '2' }

// 替代方式 3: URLParams
import { URLParams } from 'js-cool'
new URLParams('https://example.com?a=1&b=2').toObject('search')
// { a: '1', b: '2' }
```

#### `getUrlParam` 迁移

```js
// 原方法
import { getUrlParam } from 'js-cool'
getUrlParam('id', 'https://example.com?id=123')
// '123'

// 替代方式 1: url.get
import { url } from 'js-cool'
url.get('id', 'https://example.com?id=123')
// '123'

// 替代方式 2: url.from().get()
url.from('https://example.com?id=123').get('id')
// '123'

// 替代方式 3: URLParams
import { URLParams } from 'js-cool'
new URLParams('https://example.com?id=123').get('id', 'search')
// '123'
```

#### `parseUrlParam` 迁移

```js
// 原方法
import { parseUrlParam } from 'js-cool'
parseUrlParam('?count=100&active=true', true)
// { count: 100, active: true }

// 替代方式: url.parse (带 covert 选项)
import { url } from 'js-cool'
url.parse('?count=100&active=true', { covert: true })
// { count: 100, active: true }
```

#### `spliceUrlParam` 迁移

```js
// 原方法
import { spliceUrlParam } from 'js-cool'
spliceUrlParam({ a: 1, b: true })
// '?a=1&b=true'
spliceUrlParam({ a: 1, name: '测试' }, { encode: true })
// '?a=1&name=%E6%B5%8B%E8%AF%95'

// 替代方式: url.stringify
import { url } from 'js-cool'
url.stringify({ a: 1, b: true })
// '?a=1&b=true'
url.stringify({ a: 1, name: '测试' }, { encode: true })
// '?a=1&name=%E6%B5%8B%E8%AF%95'
```

#### `getQueryParam` / `getQueryParams` 迁移

::: warning 重要
`url` 模块**不支持** hash 参数，必须使用 `URLParams` 类替代。
:::

```js
// 原方法（处理 hash 参数）
import { getQueryParam, getQueryParams } from 'js-cool'
getQueryParam('id', 'https://example.com?id=100#/home?id=200')
// '200' (从 hash 获取)

getQueryParams('https://example.com?id=100#/home?id=200')
// { id: '200' }

// 替代方式: URLParams（指定 scope='hash'）
import { URLParams } from 'js-cool'
new URLParams('https://example.com?id=100#/home?id=200').get('id', 'hash')
// '200'

new URLParams('https://example.com?id=100#/home?id=200').toObject('hash')
// { id: '200' }

// 注意: url 模块只获取 search 参数
url.get('id', 'https://example.com?id=100#/home?id=200')
// '100' (只获取 search 参数，不符合预期)
```

#### `URLParams` 高级用法

`URLParams` 是最完整的解决方案，支持同时处理 search 和 hash 参数：

```js
import { URLParams } from 'js-cool'

const params = new URLParams('https://example.com?token=old#/page?token=new')

// 区分参数来源
params.get('token', 'search') // 'old' - search 参数
params.get('token', 'hash') // 'new' - hash 参数
params.get('token') // 'new' - 默认 hash 优先

// 获取详细来源信息
params.toDetailObject()
// {
//   search: { token: 'old' },
//   hash: { token: 'new' },
//   all: { token: 'new' },
//   source: { token: 'both' }
// }

// 链式操作
params.set('page', 1).set('id', 123, 'hash').delete('token', 'search')
params.toURL()
// 'https://example.com/?page=1#/page?token=new&id=123'
```

#### 选择建议

| 场景                           | 推荐使用                    |
| ------------------------------ | --------------------------- |
| 只处理 search 参数（简单场景） | `url` 模块（API 更简洁）    |
| 需要处理 hash 参数             | `URLParams` 类（唯一选择）  |
| 需要同时处理 search 和 hash    | `URLParams` 类              |
| 需要 URL 属性解析              | `url` 模块或 `getDirParams` |
| 需要链式构建 URL               | `Url` 类或 `URLParams` 类   |

## TypeScript 迁移

### 类型重命名

```ts
// v5.x
import type { ClientInfo, ClientGetType, IClientDetector } from 'js-cool'

// v6.x
import type { UA, UAInfo, UAGetType, IUAParser } from 'js-cool'
// 或从子路径导入
import type { UA, UAInfo, DeviceInfo, OSInfo, BrowserInfo } from 'js-cool/ua'
```

### 新增类型

```ts
// UA 工具类型（带属性的可调用函数）
interface UA {
  (): UAInfo
  get: (type: UAGetType) => any
  getMultiple: (types: UAGetType[]) => Record<string, any>
  has: (name: string) => boolean
  getNetwork: () => NetworkInfo
  getScreen: () => ScreenInfo
  getLanguage: () => string
  getTimezone: () => string
  getOrientationStatus: () => 'portrait' | 'landscape'
  isDarkMode: () => boolean
  isMobile: () => boolean
  isTablet: () => boolean
  isDesktop: () => boolean
  isTouch: () => boolean
  isiOS: () => boolean
  isiPadOS: () => boolean
  isAndroid: () => boolean
  isHarmonyOS: () => boolean
  isWeChat: () => boolean
  isQQ: () => boolean
  isMiniProgram: () => boolean
  readonly info: UAInfo
  readonly device: DeviceInfo
  readonly os: OSInfo
  readonly browser: BrowserInfo
  readonly environment: EnvironmentInfo
  readonly userAgent: string
  UAParser: typeof UAParser
}

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

## v6.x 新增功能

### 日期工具

v6.x 引入了全面的日期处理函数，提供三种使用方式：

```js
// 1. DateParser 类 - 链式 API
import { DateParser } from 'js-cool'
const d = new DateParser('2024-01-15')
d.add(1, 'day').format('YYYY-MM-DD') // '2024-01-16'
d.startOf('month').format() // '2024-01-01 00:00:00'

// 2. date 命名空间 - 工厂 + 静态方法
import { date } from 'js-cool'
date('2024-01-15').add(1, 'day').format()
date.format(new Date(), 'YYYY-MM-DD')
date.diff('2024-01-01', '2024-12-31')
date.isToday(new Date())

// 3. 直接导入函数
import {
  formatDate,
  dateDiff,
  relativeTime,
  isToday,
  isYesterday,
  isTomorrow,
  isWeekend,
  isLeapYear,
  isBefore,
  isAfter,
  isSame,
  isBetween,
  getDaysInMonth,
  getQuarter,
  getDayOfYear,
  getWeekOfYear,
  add,
  subtract,
  startOf,
  endOf,
} from 'js-cool'

// 格式化日期
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
formatDate(new Date(), 'YYYY年MM月DD日')

// 日期比较
isBefore('2024-01-01', '2024-12-31') // true
isAfter('2024-12-31', '2024-01-01') // true
isBetween('2024-06-15', '2024-01-01', '2024-12-31') // true

// 日期信息
getQuarter(new Date()) // 1-4
getDayOfYear(new Date()) // 1-366
getWeekOfYear(new Date()) // 1-53

// 日期操作
add(new Date(), 1, 'day') // 明天
subtract(new Date(), 1, 'week') // 上周
startOf(new Date(), 'month') // 本月第一天
endOf(new Date(), 'day') // 今天结束
```

### 异步工具

新的异步工具提供更好的控制流：

```js
import { delay, waiting, promiseFactory, punctualTimer } from 'js-cool'

// 延迟执行
await delay(1000) // 等待 1 秒

// 等待条件成立
await waiting(() => document.querySelector('#element'), { interval: 100, timeout: 5000 })

// 外部 Promise 控制
const promise = promiseFactory((resolve, reject) => {
  // 外部决定何时 resolve
  setTimeout(() => resolve('done'), 1000)
})

// 精确定时器
const timer = punctualTimer('second', () => {
  console.log('在秒边界执行')
})
timer.stop() // 停止定时器
```

### 对象工具

新的对象处理函数：

```js
import { cleanData, searchObject } from 'js-cool'

// 清理对象
const obj = { a: 1, b: null, c: '', d: undefined, password: 'secret' }
cleanData(obj, ['password'])
// { a: 1 }

// 搜索对象
const data = {
  user: { name: 'John', email: 'john@example.com' },
  orders: [{ id: 1, product: 'Laptop' }],
}
searchObject(data, 'john')
// [{ key: 'user.name', value: 'John' }, { key: 'user.email', value: 'john@example.com' }]
```

### 类型检查工具

新的类型检查函数：

```js
import { isWindow, isExitsFunction } from 'js-cool'

// 检查是否为 Window 对象
isWindow(window) // 浏览器中返回 true

// 检查函数是否存在
isExitsFunction('JSON.parse') // true
isExitsFunction('nonExistent.function') // false
```
