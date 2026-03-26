# User Agent 模式 <Badge type="info" text="since v6.0.0" />

User Agent 检测模式和工具函数。

## 用法

```js
import {
  DEVICE_PATTERNS,
  OS_PATTERNS,
  BROWSER_PATTERNS,
  ENGINE_PATTERNS,
  ENV_PATTERNS,
  getUserAgent,
  matchPattern,
  extractVersion,
} from 'js-cool'
```

## 设备模式

```js
import { DEVICE_PATTERNS } from 'js-cool'

const ua = navigator.userAgent

DEVICE_PATTERNS.mobile.test(ua)     // 任意移动设备
DEVICE_PATTERNS.tablet.test(ua)     // 平板设备
DEVICE_PATTERNS.phone.test(ua)      // 智能手机
DEVICE_PATTERNS.touch.test(ua)      // 触摸设备
DEVICE_PATTERNS.iphone.test(ua)     // iPhone
DEVICE_PATTERNS.ipad.test(ua)       // iPad
DEVICE_PATTERNS.androidPhone.test(ua)   // 安卓手机
DEVICE_PATTERNS.androidTablet.test(ua)  // 安卓平板
```

## 操作系统模式

```js
import { OS_PATTERNS, extractVersion, getUserAgent } from 'js-cool'

const ua = getUserAgent()

OS_PATTERNS.harmonyOS.test(ua)  // 鸿蒙系统
OS_PATTERNS.windows.test(ua)    // Windows
OS_PATTERNS.macOS.test(ua)      // macOS
OS_PATTERNS.iOS.test(ua)        // iOS
OS_PATTERNS.iPadOS.test(ua)     // iPadOS
OS_PATTERNS.android.test(ua)    // Android
OS_PATTERNS.linux.test(ua)      // Linux
OS_PATTERNS.chromeOS.test(ua)   // Chrome OS

// 提取操作系统版本
const windowsVersion = extractVersion(ua, OS_PATTERNS.windows)
const androidVersion = extractVersion(ua, OS_PATTERNS.android)
```

## 浏览器模式

```js
import { BROWSER_PATTERNS, extractVersion, getUserAgent } from 'js-cool'

const ua = getUserAgent()

BROWSER_PATTERNS.chrome.test(ua)   // Chrome
BROWSER_PATTERNS.safari.test(ua)   // Safari
BROWSER_PATTERNS.firefox.test(ua)  // Firefox
BROWSER_PATTERNS.edge.test(ua)     // Edge
BROWSER_PATTERNS.opera.test(ua)    // Opera
BROWSER_PATTERNS.ie.test(ua)       // Internet Explorer
BROWSER_PATTERNS.samsung.test(ua)  // 三星浏览器
BROWSER_PATTERNS.uc.test(ua)       // UC浏览器
BROWSER_PATTERNS.quark.test(ua)    // 夸克浏览器
BROWSER_PATTERNS.arc.test(ua)      // Arc浏览器
BROWSER_PATTERNS.brave.test(ua)    // Brave浏览器
BROWSER_PATTERNS.yandex.test(ua)   // Yandex浏览器
BROWSER_PATTERNS.vivaldi.test(ua)  // Vivaldi浏览器

// 提取浏览器版本
const chromeVersion = extractVersion(ua, BROWSER_PATTERNS.chrome)
```

## 引擎模式

```js
import { ENGINE_PATTERNS } from 'js-cool'

const ua = navigator.userAgent

ENGINE_PATTERNS.blink.test(ua)     // Blink（Chrome、Edge、Opera）
ENGINE_PATTERNS.gecko.test(ua)     // Gecko（Firefox）
ENGINE_PATTERNS.webkit.test(ua)    // WebKit（Safari）
ENGINE_PATTERNS.trident.test(ua)   // Trident（IE）
ENGINE_PATTERNS.edgeHTML.test(ua)  // EdgeHTML（旧版Edge）
```

## 环境模式

```js
import { ENV_PATTERNS } from 'js-cool'

const ua = navigator.userAgent

// 国产应用
ENV_PATTERNS.wechat.test(ua)      // 微信
ENV_PATTERNS.wxwork.test(ua)      // 企业微信
ENV_PATTERNS.dingtalk.test(ua)    // 钉钉
ENV_PATTERNS.qq.test(ua)          // QQ App
ENV_PATTERNS.qqBrowser.test(ua)   // QQ浏览器
ENV_PATTERNS.weibo.test(ua)       // 微博
ENV_PATTERNS.alipay.test(ua)      // 支付宝
ENV_PATTERNS.douyin.test(ua)      // 抖音/TikTok
ENV_PATTERNS.kuaishou.test(ua)    // 快手
ENV_PATTERNS.baidu.test(ua)       // 百度App
ENV_PATTERNS.xiaohongshu.test(ua) // 小红书
ENV_PATTERNS.meituan.test(ua)     // 美团
ENV_PATTERNS.dianping.test(ua)    // 大众点评

// 电商应用
ENV_PATTERNS.taobao.test(ua)      // 淘宝App
ENV_PATTERNS.tmall.test(ua)       // 天猫App
ENV_PATTERNS.jd.test(ua)          // 京东App
ENV_PATTERNS.pinduoduo.test(ua)   // 拼多多

// 手机厂商浏览器
ENV_PATTERNS.xiaomi.test(ua)      // 小米浏览器
ENV_PATTERNS.huawei.test(ua)      // 华为浏览器
ENV_PATTERNS.vivo.test(ua)        // vivo浏览器
ENV_PATTERNS.oppo.test(ua)        // OPPO浏览器
ENV_PATTERNS.uc.test(ua)          // UC浏览器
ENV_PATTERNS.quark.test(ua)       // 夸克浏览器

// 小程序
ENV_PATTERNS.miniProgram.test(ua) // 小程序
ENV_PATTERNS.miniGame.test(ua)    // 小游戏
```

## 工具函数

### getUserAgent

安全获取 User Agent 字符串（SSR 安全）。

```js
import { getUserAgent } from 'js-cool'

const ua = getUserAgent()
// 浏览器返回 navigator.userAgent，SSR 返回空字符串
```

### matchPattern

检查 User Agent 中是否存在指定模式。

```js
import { matchPattern } from 'js-cool'

const isMobile = matchPattern(navigator.userAgent, /Mobi/i)
// true 或 false
```

### extractVersion

从 User Agent 中提取版本号。

```js
import { extractVersion } from 'js-cool'

const ua = navigator.userAgent

const chromeVersion = extractVersion(ua, /Chrome\/(\d+)/i)
// '120'

const safariVersion = extractVersion(ua, /Version\/(\d+\.?\d*)/i)
// '17.2'
```

## 示例

### 设备类型检测

```js
import { DEVICE_PATTERNS, getUserAgent } from 'js-cool'

const ua = getUserAgent()

function getDeviceType() {
  if (DEVICE_PATTERNS.mobile.test(ua)) {
    if (DEVICE_PATTERNS.tablet.test(ua)) {
      return 'tablet'
    }
    return 'mobile'
  }
  return 'desktop'
}
```

### 浏览器检测（带版本号）

```js
import { BROWSER_PATTERNS, extractVersion, getUserAgent } from 'js-cool'

const ua = getUserAgent()

function getBrowserInfo() {
  // 顺序很重要！先检测特定浏览器
  const browsers = [
    { name: 'Edge', pattern: BROWSER_PATTERNS.edge },
    { name: 'Opera', pattern: BROWSER_PATTERNS.opera },
    { name: 'Samsung', pattern: BROWSER_PATTERNS.samsung },
    { name: 'Chrome', pattern: BROWSER_PATTERNS.chrome },
    { name: 'Safari', pattern: BROWSER_PATTERNS.safari },
    { name: 'Firefox', pattern: BROWSER_PATTERNS.firefox },
    { name: 'IE', pattern: BROWSER_PATTERNS.ie },
  ]

  for (const { name, pattern } of browsers) {
    if (pattern.test(ua)) {
      const version = extractVersion(ua, pattern)
      return { name, version }
    }
  }

  return { name: 'Unknown', version: '' }
}

// { name: 'Chrome', version: '120' }
```

### 微信环境检测

```js
import { ENV_PATTERNS, getUserAgent } from 'js-cool'

const ua = getUserAgent()

function getWeChatEnv() {
  if (ENV_PATTERNS.miniProgram.test(ua)) {
    return 'miniprogram'
  }
  if (ENV_PATTERNS.wechat.test(ua)) {
    return 'wechat'
  }
  return 'browser'
}
```

### 国产应用检测

```js
import { ENV_PATTERNS, getUserAgent } from 'js-cool'

const ua = getUserAgent()

function detectChineseApp() {
  const apps = [
    { name: '微信', pattern: ENV_PATTERNS.wechat },
    { name: '钉钉', pattern: ENV_PATTERNS.dingtalk },
    { name: '支付宝', pattern: ENV_PATTERNS.alipay },
    { name: 'QQ', pattern: ENV_PATTERNS.qq },
    { name: '微博', pattern: ENV_PATTERNS.weibo },
    { name: '抖音', pattern: ENV_PATTERNS.douyin },
    { name: '小红书', pattern: ENV_PATTERNS.xiaohongshu },
    { name: '百度', pattern: ENV_PATTERNS.baidu },
  ]

  for (const { name, pattern } of apps) {
    if (pattern.test(ua)) {
      return name
    }
  }

  return null
}
```

## 相关

- [patterns](./index.md) - 统一模式模块
- [validation](./validation.md) - 验证模式
