# ua <Badge type="tip" text="since v6.0.0" />

User-Agent detection utility for browser, OS, device, and environment detection.

## Usage

```js
// Full import
import { ua } from 'js-cool'

// Tree-shaking import (recommended for smaller bundles)
import { isMobile, isTablet } from 'js-cool/ua/device'
import { isWeChat, isQQ } from 'js-cool/ua/env'
import { isiOS, isAndroid } from 'js-cool/ua/os'
import { isChrome, isFirefox } from 'js-cool/ua/browser'
import { isOnline, getNetworkInfo } from 'js-cool/ua/network'
import { isDarkMode, getScreenInfo } from 'js-cool/ua/screen'
```

## Subpath Exports

| Subpath | Description | Size |
|---------|-------------|------|
| `js-cool/ua` | Full UA module | ~28KB |
| `js-cool/ua/device` | Device detection | ~3.4KB |
| `js-cool/ua/os` | OS detection | ~3.5KB |
| `js-cool/ua/browser` | Browser detection | ~5.8KB |
| `js-cool/ua/env` | Environment detection (WeChat, QQ, etc.) | ~5KB |
| `js-cool/ua/network` | Network info | ~2KB |
| `js-cool/ua/screen` | Screen info | ~3.3KB |
| `js-cool/ua/types` | Type definitions | - |

## Basic Usage

```js
// Get all info
const info = ua.info
// { device: {...}, os: {...}, browser: {...}, environment: {...} }

// Quick checks
ua.isMobile()    // true/false
ua.isTablet()    // true/false
ua.isDesktop()   // true/false
ua.isiOS()       // true/false
ua.isAndroid()   // true/false
ua.isWeChat()    // true/false
ua.isQQ()        // true/false
ua.isMiniProgram() // true/false
ua.isDarkMode()  // true/false

// Get specific info
ua.get('browser')  // { name: 'Chrome', version: '120.0', engine: 'Blink' }
ua.get('os')       // { name: 'Windows', version: '10' }
ua.get('device')   // { type: 'desktop', mobile: false, ... }

// Network info
ua.getNetwork()    // { online: true, type: 'wifi', effectiveType: '4g', ... }

// Screen info
ua.getScreen()     // { width: 1920, height: 1080, pixelRatio: 1, ... }
```

## Device Detection

```js
import { isMobile, isTablet, isDesktop, isTouch, getDeviceInfo } from 'js-cool/ua/device'

isMobile()      // true/false
isTablet()      // true/false
isDesktop()     // true/false
isTouch()       // true/false
isIPhone()      // true/false
isIPad()        // true/false

getDeviceInfo() // { type, mobile, tablet, desktop, touch, phone, ipad, iphone, ... }
```

## OS Detection

```js
import { isiOS, isAndroid, isHarmonyOS, getOSInfo } from 'js-cool/ua/os'

isiOS()         // true/false
isAndroid()     // true/false
isHarmonyOS()   // true/false (鸿蒙)
isiPadOS()      // true/false
isWindows()     // true/false
isMacOS()       // true/false

getOSInfo()     // { name: 'Windows', version: '10' }
```

## Browser Detection

```js
import { isChrome, isFirefox, isSafari, getBrowserInfo } from 'js-cool/ua/browser'

isChrome()      // true/false
isFirefox()     // true/false
isSafari()      // true/false
isEdge()        // true/false
isIE()          // true/false

getBrowserInfo() // { name: 'Chrome', version: '120.0', engine: 'Blink' }
```

## Environment Detection (Chinese Apps)

```js
import { isWeChat, isQQ, isDingtalk, getEnvInfo } from 'js-cool/ua/env'

isWeChat()      // 微信
isWxwork()      // 企业微信
isDingtalk()    // 钉钉
isQQ()          // QQ内置浏览器
isQQBrowser()   // QQ浏览器
isWeibo()       // 微博
isAlipay()      // 支付宝
isDouyin()      // 抖音
isKuaishou()    // 快手
isBaidu()       // 百度App
isMiniProgram() // 小程序
isMiniGame()    // 小游戏

getEnvInfo()    // { wechat: false, qq: true, ... }
```

## Network Info

```js
import { isOnline, getNetworkInfo } from 'js-cool/ua/network'

isOnline()         // true/false
isOffline()        // true/false
isSlowConnection() // true if 2g or slow-2g
isFastConnection() // true if 4g

getNetworkInfo()   // { online, type, effectiveType, downlink, rtt, saveData }
```

## Screen Info

```js
import { isDarkMode, isLandscape, getScreenInfo } from 'js-cool/ua/screen'

isDarkMode()       // true/false
isLightMode()      // true/false
isLandscape()      // true/false
isPortrait()       // true/false
isReducedMotion()  // true/false
isHDR()            // true/false

getScreenInfo()    // { width, height, pixelRatio, orientation, colorDepth, ... }
```

## Custom UA String

```js
import { UADetector } from 'js-cool'

const detector = new UADetector('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)')

detector.isMobile()  // true
detector.isiOS()     // true
detector.browser.name // 'Safari'
```

## Migration from `client`

| Old (`client`) | New (`ua`) |
|----------------|------------|
| `client()` | `ua.info` |
| `client.isMobile` | `ua.isMobile()` |
| `client.ios` | `ua.isiOS()` |
| `client.android` | `ua.isAndroid()` |
| `client.weixin` | `ua.isWeChat()` |
| `ClientDetector` | `UADetector` |
