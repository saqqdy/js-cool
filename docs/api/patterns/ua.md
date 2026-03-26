# User Agent Patterns <Badge type="info" text="since v6.0.0" />

User Agent detection patterns and utilities.

## Usage

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

## Device Patterns

```js
import { DEVICE_PATTERNS } from 'js-cool'

const ua = navigator.userAgent

DEVICE_PATTERNS.mobile.test(ua)     // Any mobile device
DEVICE_PATTERNS.tablet.test(ua)     // Tablet devices
DEVICE_PATTERNS.phone.test(ua)      // Smartphones
DEVICE_PATTERNS.touch.test(ua)      // Touch devices
DEVICE_PATTERNS.iphone.test(ua)     // iPhone
DEVICE_PATTERNS.ipad.test(ua)       // iPad
DEVICE_PATTERNS.androidPhone.test(ua)   // Android phone
DEVICE_PATTERNS.androidTablet.test(ua)  // Android tablet
```

## OS Patterns

```js
import { OS_PATTERNS, extractVersion, getUserAgent } from 'js-cool'

const ua = getUserAgent()

OS_PATTERNS.harmonyOS.test(ua)  // HarmonyOS
OS_PATTERNS.windows.test(ua)    // Windows
OS_PATTERNS.macOS.test(ua)      // macOS
OS_PATTERNS.iOS.test(ua)        // iOS
OS_PATTERNS.iPadOS.test(ua)     // iPadOS
OS_PATTERNS.android.test(ua)    // Android
OS_PATTERNS.linux.test(ua)      // Linux
OS_PATTERNS.chromeOS.test(ua)   // Chrome OS

// Extract OS version
const windowsVersion = extractVersion(ua, OS_PATTERNS.windows)
const androidVersion = extractVersion(ua, OS_PATTERNS.android)
```

## Browser Patterns

```js
import { BROWSER_PATTERNS, extractVersion, getUserAgent } from 'js-cool'

const ua = getUserAgent()

BROWSER_PATTERNS.chrome.test(ua)   // Chrome
BROWSER_PATTERNS.safari.test(ua)   // Safari
BROWSER_PATTERNS.firefox.test(ua)  // Firefox
BROWSER_PATTERNS.edge.test(ua)     // Edge
BROWSER_PATTERNS.opera.test(ua)    // Opera
BROWSER_PATTERNS.ie.test(ua)       // Internet Explorer
BROWSER_PATTERNS.samsung.test(ua)  // Samsung Browser
BROWSER_PATTERNS.uc.test(ua)       // UC Browser
BROWSER_PATTERNS.quark.test(ua)    // Quark Browser
BROWSER_PATTERNS.arc.test(ua)      // Arc Browser
BROWSER_PATTERNS.brave.test(ua)    // Brave Browser
BROWSER_PATTERNS.yandex.test(ua)   // Yandex Browser
BROWSER_PATTERNS.vivaldi.test(ua)  // Vivaldi Browser

// Extract browser version
const chromeVersion = extractVersion(ua, BROWSER_PATTERNS.chrome)
```

## Engine Patterns

```js
import { ENGINE_PATTERNS } from 'js-cool'

const ua = navigator.userAgent

ENGINE_PATTERNS.blink.test(ua)     // Blink (Chrome, Edge, Opera)
ENGINE_PATTERNS.gecko.test(ua)     // Gecko (Firefox)
ENGINE_PATTERNS.webkit.test(ua)    // WebKit (Safari)
ENGINE_PATTERNS.trident.test(ua)   // Trident (IE)
ENGINE_PATTERNS.edgeHTML.test(ua)  // EdgeHTML (Legacy Edge)
```

## Environment Patterns

```js
import { ENV_PATTERNS } from 'js-cool'

const ua = navigator.userAgent

// Chinese apps
ENV_PATTERNS.wechat.test(ua)      // WeChat
ENV_PATTERNS.wxwork.test(ua)      // WeChat Work
ENV_PATTERNS.dingtalk.test(ua)    // DingTalk
ENV_PATTERNS.qq.test(ua)          // QQ App
ENV_PATTERNS.qqBrowser.test(ua)   // QQ Browser
ENV_PATTERNS.weibo.test(ua)       // Weibo
ENV_PATTERNS.alipay.test(ua)      // Alipay
ENV_PATTERNS.douyin.test(ua)      // Douyin/TikTok
ENV_PATTERNS.kuaishou.test(ua)    // Kuaishou
ENV_PATTERNS.baidu.test(ua)       // Baidu App
ENV_PATTERNS.xiaohongshu.test(ua) // Xiaohongshu
ENV_PATTERNS.meituan.test(ua)     // Meituan
ENV_PATTERNS.dianping.test(ua)    // Dianping

// E-commerce apps
ENV_PATTERNS.taobao.test(ua)      // Taobao App
ENV_PATTERNS.tmall.test(ua)       // Tmall App
ENV_PATTERNS.jd.test(ua)          // JD App
ENV_PATTERNS.pinduoduo.test(ua)   // Pinduoduo

// Mobile browsers
ENV_PATTERNS.xiaomi.test(ua)      // Xiaomi Browser
ENV_PATTERNS.huawei.test(ua)      // Huawei Browser
ENV_PATTERNS.vivo.test(ua)        // Vivo Browser
ENV_PATTERNS.oppo.test(ua)        // OPPO Browser
ENV_PATTERNS.uc.test(ua)          // UC Browser
ENV_PATTERNS.quark.test(ua)       // Quark Browser

// Mini programs
ENV_PATTERNS.miniProgram.test(ua) // Mini Program
ENV_PATTERNS.miniGame.test(ua)    // Mini Game
```

## Utility Functions

### getUserAgent

Get user agent string safely (works in SSR).

```js
import { getUserAgent } from 'js-cool'

const ua = getUserAgent()
// Returns navigator.userAgent in browser, '' in SSR
```

### matchPattern

Check if a pattern exists in user agent.

```js
import { matchPattern } from 'js-cool'

const isMobile = matchPattern(navigator.userAgent, /Mobi/i)
// true or false
```

### extractVersion

Extract version from user agent using pattern.

```js
import { extractVersion } from 'js-cool'

const ua = navigator.userAgent

const chromeVersion = extractVersion(ua, /Chrome\/(\d+)/i)
// '120'

const safariVersion = extractVersion(ua, /Version\/(\d+\.?\d*)/i)
// '17.2'
```

## Examples

### Device Type Detection

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

### Browser Detection with Version

```js
import { BROWSER_PATTERNS, extractVersion, getUserAgent } from 'js-cool'

const ua = getUserAgent()

function getBrowserInfo() {
  // Order matters! Check specific browsers first
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

### WeChat Environment Detection

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

### Chinese App Detection

```js
import { ENV_PATTERNS, getUserAgent } from 'js-cool'

const ua = getUserAgent()

function detectChineseApp() {
  const apps = [
    { name: 'WeChat', pattern: ENV_PATTERNS.wechat },
    { name: 'DingTalk', pattern: ENV_PATTERNS.dingtalk },
    { name: 'Alipay', pattern: ENV_PATTERNS.alipay },
    { name: 'QQ', pattern: ENV_PATTERNS.qq },
    { name: 'Weibo', pattern: ENV_PATTERNS.weibo },
    { name: 'Douyin', pattern: ENV_PATTERNS.douyin },
    { name: 'Xiaohongshu', pattern: ENV_PATTERNS.xiaohongshu },
    { name: 'Baidu', pattern: ENV_PATTERNS.baidu },
  ]

  for (const { name, pattern } of apps) {
    if (pattern.test(ua)) {
      return name
    }
  }

  return null
}
```

## Related

- [patterns](./index.md) - Unified patterns module
- [validation](./validation.md) - Validation patterns
