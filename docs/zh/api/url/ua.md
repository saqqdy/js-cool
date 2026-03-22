# ua <Badge type="tip" text="v6.0.0" />

User-Agent 检测工具，用于浏览器、操作系统、设备和环境检测。

## 用法

```js
// 完整导入
import { ua } from 'js-cool'

// 按需导入（推荐，减小打包体积）
import { isMobile, isTablet } from 'js-cool/ua/device'
import { isWeChat, isQQ } from 'js-cool/ua/env'
import { isiOS, isAndroid } from 'js-cool/ua/os'
import { isChrome, isFirefox } from 'js-cool/ua/browser'
import { isOnline, getNetworkInfo } from 'js-cool/ua/network'
import { isDarkMode, getScreenInfo } from 'js-cool/ua/screen'
```

## 子路径导出

| 子路径 | 描述 | 大小 |
|--------|------|------|
| `js-cool/ua` | 完整 UA 模块 | ~28KB |
| `js-cool/ua/device` | 设备检测 | ~3.4KB |
| `js-cool/ua/os` | 操作系统检测 | ~3.5KB |
| `js-cool/ua/browser` | 浏览器检测 | ~5.8KB |
| `js-cool/ua/env` | 环境检测（微信、QQ 等） | ~5KB |
| `js-cool/ua/network` | 网络信息 | ~2KB |
| `js-cool/ua/screen` | 屏幕信息 | ~3.3KB |
| `js-cool/ua/types` | 类型定义 | - |

## 基本用法

```js
// 获取所有信息
const info = ua.info
// { device: {...}, os: {...}, browser: {...}, environment: {...} }

// 快速检查
ua.isMobile()    // true/false
ua.isTablet()    // true/false
ua.isDesktop()   // true/false
ua.isiOS()       // true/false
ua.isAndroid()   // true/false
ua.isWeChat()    // true/false
ua.isQQ()        // true/false
ua.isMiniProgram() // true/false
ua.isDarkMode()  // true/false

// 获取特定信息
ua.get('browser')  // { name: 'Chrome', version: '120.0', engine: 'Blink' }
ua.get('os')       // { name: 'Windows', version: '10' }
ua.get('device')   // { type: 'desktop', mobile: false, ... }

// 网络信息
ua.getNetwork()    // { online: true, type: 'wifi', effectiveType: '4g', ... }

// 屏幕信息
ua.getScreen()     // { width: 1920, height: 1080, pixelRatio: 1, ... }
```

## 设备检测

```js
import { isMobile, isTablet, isDesktop, isTouch, getDeviceInfo } from 'js-cool/ua/device'

isMobile()      // 是否移动设备
isTablet()      // 是否平板设备
isDesktop()     // 是否桌面设备
isTouch()       // 是否触摸设备
isIPhone()      // 是否 iPhone
isIPad()        // 是否 iPad

getDeviceInfo() // { type, mobile, tablet, desktop, touch, phone, ipad, iphone, ... }
```

## 操作系统检测

```js
import { isiOS, isAndroid, isHarmonyOS, getOSInfo } from 'js-cool/ua/os'

isiOS()         // 是否 iOS
isAndroid()     // 是否 Android
isHarmonyOS()   // 是否鸿蒙系统
isiPadOS()      // 是否 iPadOS
isWindows()     // 是否 Windows
isMacOS()       // 是否 macOS

getOSInfo()     // { name: 'Windows', version: '10' }
```

## 浏览器检测

```js
import { isChrome, isFirefox, isSafari, getBrowserInfo } from 'js-cool/ua/browser'

isChrome()      // 是否 Chrome
isFirefox()     // 是否 Firefox
isSafari()      // 是否 Safari
isEdge()        // 是否 Edge
isIE()          // 是否 IE

getBrowserInfo() // { name: 'Chrome', version: '120.0', engine: 'Blink' }
```

## 环境检测（中文应用）

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

## 网络信息

```js
import { isOnline, getNetworkInfo } from 'js-cool/ua/network'

isOnline()         // 是否在线
isOffline()        // 是否离线
isSlowConnection() // 是否慢速连接（2g 或 slow-2g）
isFastConnection() // 是否快速连接（4g）

getNetworkInfo()   // { online, type, effectiveType, downlink, rtt, saveData }
```

## 屏幕信息

```js
import { isDarkMode, isLandscape, getScreenInfo } from 'js-cool/ua/screen'

isDarkMode()       // 是否深色模式
isLightMode()      // 是否浅色模式
isLandscape()      // 是否横屏
isPortrait()       // 是否竖屏
isReducedMotion()  // 是否减少动画
isHDR()            // 是否 HDR 显示

getScreenInfo()    // { width, height, pixelRatio, orientation, colorDepth, ... }
```

## 自定义 UA 字符串

```js
import { UADetector } from 'js-cool'

const detector = new UADetector('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)')

detector.isMobile()  // true
detector.isiOS()     // true
detector.browser.name // 'Safari'
```

## 从 `client` 迁移

| 旧 API (`client`) | 新 API (`ua`) |
|-------------------|---------------|
| `client()` | `ua.info` |
| `client.isMobile` | `ua.isMobile()` |
| `client.ios` | `ua.isiOS()` |
| `client.android` | `ua.isAndroid()` |
| `client.weixin` | `ua.isWeChat()` |
| `ClientDetector` | `UADetector` |
