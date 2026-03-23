# ua <Badge type="tip" text="since v6.0.0" />

User-Agent detection utility for browser, OS, device, and environment detection.

## Installation

```bash
pnpm add js-cool
```

## Usage

```js
// Full import from main entry
import { ua } from 'js-cool'

// Tree-shaking import from subpath (recommended for smaller bundles)
import { isMobile, isTablet, isWeChat, isiOS } from 'js-cool/ua'
import { getBrowserInfo, getNetworkInfo, getScreenInfo } from 'js-cool/ua'
import type { UAInfo, DeviceInfo } from 'js-cool/ua'
```

## API Reference

### ua Object

The `ua` object provides a unified API for all detection methods:

```js
import { ua } from 'js-cool'

// Get all info
const info = ua.info
// { device: {...}, os: {...}, browser: {...}, environment: {...} }

// Quick checks
ua.isMobile() // true/false
ua.isTablet() // true/false
ua.isDesktop() // true/false
ua.isiOS() // true/false
ua.isAndroid() // true/false
ua.isHarmonyOS() // true/false
ua.isWeChat() // true/false
ua.isQQ() // true/false
ua.isMiniProgram() // true/false

// Get specific info
ua.get('browser') // { name: 'Chrome', version: '120.0', engine: 'Blink' }
ua.get('os') // { name: 'Windows', version: '10' }
ua.get('device') // { type: 'desktop', mobile: false, ... }
ua.get('environment') // { wechat: false, qq: false, ... }
ua.get('engine') // { name: 'Blink' }

// Get multiple info types
ua.getMultiple(['device', 'os', 'browser'])
// { device: {...}, os: {...}, browser: {...} }

// Check if name exists in UA string
ua.has('Chrome') // true/false

// Network info
ua.getNetwork() // { online: true, type: 'wifi', effectiveType: '4g', ... }

// Screen info
ua.getScreen() // { width: 1920, height: 1080, pixelRatio: 1, ... }

// Utility methods
ua.getLanguage() // 'en-US'
ua.getTimezone() // 'America/New_York'
ua.getOrientationStatus() // 'portrait' | 'landscape'
ua.isDarkMode() // true/false
```

## Device Detection

```js
import {
  isMobile,
  isTablet,
  isDesktop,
  isTouch,
  isIPhone,
  isIPad,
  isAndroidPhone,
  isAndroidTablet,
  getDeviceInfo,
  getDeviceType,
} from 'js-cool/ua'

// Quick checks
isMobile() // true/false - is mobile device
isTablet() // true/false - is tablet device
isDesktop() // true/false - is desktop device
isTouch() // true/false - is touch device
isIPhone() // true/false - is iPhone
isIPad() // true/false - is iPad
isAndroidPhone() // true/false - is Android phone
isAndroidTablet() // true/false - is Android tablet

// Get full device info
const device = getDeviceInfo()
// {
//   type: 'mobile' | 'tablet' | 'desktop',
//   mobile: boolean,
//   tablet: boolean,
//   desktop: boolean,
//   touch: boolean,
//   phone: boolean,
//   ipad: boolean,
//   iphone: boolean,
//   androidPhone: boolean,
//   androidTablet: boolean
// }

// Get device type only
getDeviceType() // 'mobile' | 'tablet' | 'desktop'
```

### With Custom UA String

All device detection functions accept an optional UA string:

```js
const customUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'
isMobile(customUA) // true
isIPhone(customUA) // true
```

## OS Detection

```js
import {
  isiOS,
  isAndroid,
  isHarmonyOS,
  isiPadOS,
  isWindows,
  isMacOS,
  isLinux,
  getOSInfo,
  getOSName,
  getOSVersion,
} from 'js-cool/ua'

// Quick checks
isiOS() // true/false - iOS (iPhone)
isiPadOS() // true/false - iPadOS (iPad on iOS 13+)
isAndroid() // true/false - Android
isHarmonyOS() // true/false - HarmonyOS (鸿蒙)
isWindows() // true/false - Windows
isMacOS() // true/false - macOS
isLinux() // true/false - Linux

// Get full OS info
const os = getOSInfo()
// { name: 'Windows', version: '10' }
// { name: 'iOS', version: '17.2' }
// { name: 'Android', version: '14' }
// { name: 'HarmonyOS', version: '4.0.0' }

// Get OS name only
getOSName() // 'Windows' | 'macOS' | 'iOS' | ...

// Get OS version only
getOSVersion() // '10', '17.2', '14', etc.
```

### Supported Operating Systems

| OS        | Detection         |
| --------- | ----------------- |
| Windows   | `isWindows()`     |
| macOS     | `isMacOS()`       |
| iOS       | `isiOS()`         |
| iPadOS    | `isiPadOS()`      |
| Android   | `isAndroid()`     |
| HarmonyOS | `isHarmonyOS()`   |
| Linux     | `isLinux()`       |
| ChromeOS  | via `getOSName()` |

## Browser Detection

```js
import {
  isChrome,
  isFirefox,
  isSafari,
  isEdge,
  isIE,
  isOpera,
  isSamsung,
  isUC,
  isBlink,
  isWebKit,
  isGecko,
  getBrowserInfo,
  getBrowserName,
  getBrowserVersion,
  getBrowserEngine,
} from 'js-cool/ua'

// Quick checks
isChrome() // true/false
isFirefox() // true/false
isSafari() // true/false
isEdge() // true/false
isIE() // true/false
isOpera() // true/false
isSamsung() // true/false
isUC() // true/false

// Engine checks
isBlink() // true/false - Chromium engine
isWebKit() // true/false - Safari engine
isGecko() // true/false - Firefox engine

// Get full browser info
const browser = getBrowserInfo()
// { name: 'Chrome', version: '120.0.0.0', engine: 'Blink' }

// Get specific info
getBrowserName() // 'Chrome' | 'Firefox' | 'Safari' | ...
getBrowserVersion() // '120.0.0.0'
getBrowserEngine() // 'Blink' | 'WebKit' | 'Gecko' | 'Trident'
```

### Supported Browsers

| Browser         | Detection     |
| --------------- | ------------- |
| Chrome          | `isChrome()`  |
| Firefox         | `isFirefox()` |
| Safari          | `isSafari()`  |
| Edge            | `isEdge()`    |
| IE              | `isIE()`      |
| Opera           | `isOpera()`   |
| Samsung Browser | `isSamsung()` |
| UC Browser      | `isUC()`      |

## Environment Detection

Detect special environments like Chinese apps, mini programs, etc.

```js
import {
  isWeChat,
  isWxwork,
  isDingtalk,
  isQQ,
  isQQBrowser,
  isWeibo,
  isAlipay,
  isDouyin,
  isKuaishou,
  isBaidu,
  isXiaomi,
  isHuawei,
  isVivo,
  isOppo,
  isMiniProgram,
  isMiniGame,
  getEnvInfo,
} from 'js-cool/ua'

// Social & IM
isWeChat() // WeChat (微信)
isWxwork() // WeChat Work (企业微信)
isQQ() // QQ built-in browser
isWeibo() // Weibo (微博)

// E-commerce & Payment
isAlipay() // Alipay (支付宝)
isDouyin() // Douyin/TikTok (抖音)
isKuaishou() // Kuaishou (快手)
isBaidu() // Baidu App (百度App)

// Office
isDingtalk() // DingTalk (钉钉)

// Browser apps
isQQBrowser() // QQ Browser
isXiaomi() // Xiaomi Browser (小米浏览器)
isHuawei() // Huawei Browser (华为浏览器)
isVivo() // Vivo Browser
isOppo() // Oppo Browser

// Mini programs & games
isMiniProgram() // Mini Program (小程序)
isMiniGame() // Mini Game (小游戏)

// Get full environment info
const env = getEnvInfo()
// {
//   wechat: boolean,
//   wxwork: boolean,
//   dingtalk: boolean,
//   qq: boolean,
//   qqBrowser: boolean,
//   weibo: boolean,
//   alipay: boolean,
//   douyin: boolean,
//   kuaishou: boolean,
//   baidu: boolean,
//   xiaomi: boolean,
//   huawei: boolean,
//   vivo: boolean,
//   oppo: boolean,
//   uc: boolean,
//   quark: boolean,
//   miniProgram: boolean,
//   miniGame: boolean
// }
```

## Network Information

Uses Navigator Connection API (where available).

```js
import {
  isOnline,
  isOffline,
  isSlowConnection,
  isFastConnection,
  getNetworkInfo,
  getConnectionType,
  getEffectiveType,
  getDownlink,
  getRTT,
  isSaveData,
} from 'js-cool/ua'

// Quick checks
isOnline() // true/false
isOffline() // true/false
isSlowConnection() // true if 2g or slow-2g
isFastConnection() // true if 4g

// Get full network info
const network = getNetworkInfo()
// {
//   online: boolean,
//   type: 'wifi' | 'cellular' | 'ethernet' | 'none' | 'unknown',
//   effectiveType: '4g' | '3g' | '2g' | 'slow-2g' | 'unknown',
//   downlink: number,  // Mbps
//   rtt: number,       // ms
//   saveData: boolean
// }

// Get specific info
getConnectionType() // 'wifi' | 'cellular' | ...
getEffectiveType() // '4g' | '3g' | ...
getDownlink() // Download speed in Mbps
getRTT() // Round-trip time in ms
isSaveData() // Data saver mode enabled
```

## Screen Information

```js
import {
  isDarkMode,
  isLightMode,
  isLandscape,
  isPortrait,
  isReducedMotion,
  isHighContrast,
  isHDR,
  getScreenInfo,
  getScreenWidth,
  getScreenHeight,
  getPixelRatio,
  getOrientation,
  getColorDepth,
  getAvailWidth,
  getAvailHeight,
} from 'js-cool/ua'

// User preference checks
isDarkMode() // true/false - dark color scheme
isLightMode() // true/false - light color scheme
isReducedMotion() // true/false - prefers reduced motion
isHighContrast() // true/false - high contrast mode
isHDR() // true/false - HDR display

// Orientation checks
isLandscape() // true/false
isPortrait() // true/false
getOrientation() // 'portrait' | 'landscape'

// Get full screen info
const screen = getScreenInfo()
// {
//   width: number,
//   height: number,
//   pixelRatio: number,
//   orientation: 'portrait' | 'landscape',
//   colorDepth: number,
//   availWidth: number,
//   availHeight: number
// }

// Get specific info
getScreenWidth() // Screen width in pixels
getScreenHeight() // Screen height in pixels
getPixelRatio() // Device pixel ratio
getColorDepth() // Color depth (usually 24)
getAvailWidth() // Available screen width
getAvailHeight() // Available screen height
```

## UADetector Class

For custom UA string parsing:

```js
import { UADetector } from 'js-cool'

// Create detector with custom UA
const detector = new UADetector('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)')

// Instance properties
detector.info // Full info object
detector.device // Device info
detector.os // OS info
detector.browser // Browser info
detector.environment // Environment info
detector.userAgent // Original UA string

// Quick checks
detector.isMobile() // true
detector.isTablet() // false
detector.isDesktop() // false
detector.isiOS() // true
detector.isAndroid() // false
detector.isHarmonyOS() // false
detector.isWeChat() // false
detector.isQQ() // false
detector.isMiniProgram() // false

// Other methods
detector.get('browser') // Get specific info
detector.getMultiple(['device', 'os'])
detector.has('Safari') // Check if string in UA

// Utility methods
detector.getNetwork() // Network info
detector.getScreen() // Screen info
detector.getLanguage() // Browser language
detector.getTimezone() // Timezone
detector.getOrientationStatus() // Orientation
detector.isDarkMode() // Dark mode check
```

## Types

```ts
import type {
  UAInfo,
  DeviceInfo,
  OSInfo,
  BrowserInfo,
  EnvironmentInfo,
  NetworkInfo,
  ScreenInfo,
  UAGetType,
  IUADetector,
  OSName,
  BrowserName,
  EngineName,
  DeviceType,
} from 'js-cool/ua'

// Device type
type DeviceType = 'mobile' | 'tablet' | 'desktop'

// OS names
type OSName =
  | 'Windows'
  | 'macOS'
  | 'iOS'
  | 'iPadOS'
  | 'Android'
  | 'Linux'
  | 'HarmonyOS'
  | 'ChromeOS'
  | 'Unknown'

// Browser names
type BrowserName =
  | 'Chrome'
  | 'Firefox'
  | 'Safari'
  | 'Edge'
  | 'IE'
  | 'Opera'
  | 'Samsung'
  | 'UC'
  | 'Quark'
  | 'Brave'
  | 'Vivaldi'
  | 'Unknown'

// Engine names
type EngineName = 'Blink' | 'Gecko' | 'WebKit' | 'Trident' | 'EdgeHTML' | 'Unknown'

// Getter types
type UAGetType = 'device' | 'os' | 'browser' | 'engine' | 'environment'
```

## Examples

### Conditional Loading

```js
import { isMobile, isWeChat } from 'js-cool/ua'

// Load different resources based on device
if (isMobile()) {
  loadMobileStyles()
} else {
  loadDesktopStyles()
}

// Show WeChat-specific UI
if (isWeChat()) {
  showWeChatShareButton()
}
```

### Analytics

```js
import { ua } from 'js-cool'

const analytics = {
  device: ua.device.type,
  os: `${ua.os.name} ${ua.os.version}`,
  browser: `${ua.browser.name} ${ua.browser.version}`,
  language: ua.getLanguage(),
  timezone: ua.getTimezone(),
  screen: `${ua.getScreen().width}x${ua.getScreen().height}`,
  network: ua.getNetwork().effectiveType,
}

sendAnalytics(analytics)
```

### Feature Detection

```js
import { isReducedMotion, isSlowConnection } from 'js-cool/ua'

// Respect user preferences
if (isReducedMotion()) {
  disableAnimations()
}

// Optimize for slow connections
if (isSlowConnection()) {
  loadLowQualityImages()
}
```

## Migration from `client`

::: warning
The `client` module has been removed in v6.0.0. Please migrate to `ua`.
:::

### Import Changes

```js
// Before (v5.x)
import { client, ClientDetector } from 'js-cool'

// After (v6.x)
import { ua, UADetector } from 'js-cool'

// Or tree-shakeable imports (recommended)
import { isMobile, isWeChat, isiOS } from 'js-cool/ua'
```

### API Migration Table

| Before (`client`)           | After (`ua`)            | Notes                |
| --------------------------- | ----------------------- | -------------------- |
| `client()`                  | `ua()` or `ua.info`     | Get all info         |
| `client.info`               | `ua.info`               | Same property access |
| `client.get('browser')`     | `ua.get('browser')`     | Same method          |
| `client.getMultiple([...])` | `ua.getMultiple([...])` | Same method          |
| `client.isMobile()`         | `ua.isMobile()`         | Same method          |
| `client.isWeChat()`         | `ua.isWeChat()`         | Same method          |
| `client.has('Chrome')`      | `ua.has('Chrome')`      | Same method          |
| `client.getNetwork()`       | `ua.getNetwork()`       | Same method          |
| `client.getScreen()`        | `ua.getScreen()`        | Same method          |
| `new ClientDetector(ua)`    | `new UADetector(ua)`    | Class renamed        |

### Legacy Properties Migration

The old `client` module had shortcut properties. Use the new method calls or property access:

| Before (`client`) | After (`ua`)                                   | Notes                   |
| ----------------- | ---------------------------------------------- | ----------------------- |
| `client.mobile`   | `ua.isMobile()` or `ua.device.mobile`          | Method call or property |
| `client.ios`      | `ua.isiOS()` or `ua.os.name === 'iOS'`         | Method call recommended |
| `client.android`  | `ua.isAndroid()` or `ua.os.name === 'Android'` | Method call recommended |
| `client.weixin`   | `ua.isWeChat()` or `ua.environment.wechat`     | Method call recommended |
| `client.qq`       | `ua.isQQ()` or `ua.environment.qq`             | Method call recommended |
| `client.iPad`     | `ua.device.ipad`                               | Property access         |
| `client.iPhone`   | `ua.device.iphone`                             | Property access         |

### Code Examples

#### Before (v5.x)

```js
import { client, ClientDetector } from 'js-cool'

// Get all info
const info = client()

// Quick checks
if (client.mobile) {
  // ...
}

if (client.weixin) {
  // ...
}

// Custom UA
const detector = new ClientDetector(customUA)
if (detector.ios) {
  // ...
}
```

#### After (v6.x)

```js
import { ua, UADetector } from 'js-cool'
// Or tree-shake: import { isMobile, isWeChat, isiOS } from 'js-cool/ua'

// Get all info
const info = ua()
// or
const info = ua.info

// Quick checks
if (ua.isMobile()) {
  // ...
}

if (ua.isWeChat()) {
  // ...
}

// Custom UA
const detector = new UADetector(customUA)
if (detector.isiOS()) {
  // ...
}
```

### New Features in `ua`

The `ua` module includes several new features not available in the old `client` module:

```js
// New device detection
ua.device.phone // Is phone device
ua.device.ipad // Is iPad
ua.device.iphone // Is iPhone
ua.device.androidPhone // Is Android phone
ua.device.androidTablet // Is Android tablet

// New OS detection
ua.isHarmonyOS() // Detect HarmonyOS (鸿蒙)
ua.isiPadOS() // Detect iPadOS

// New environment detection (Chinese apps)
ua.environment.wxwork // WeChat Work (企业微信)
ua.environment.dingtalk // DingTalk (钉钉)
ua.environment.douyin // Douyin (抖音)
ua.environment.kuaishou // Kuaishou (快手)
ua.environment.baidu // Baidu App (百度App)
ua.environment.xiaomi // Xiaomi Browser (小米浏览器)
ua.environment.huawei // Huawei Browser (华为浏览器)
ua.environment.miniProgram // Mini Program (小程序)
ua.environment.miniGame // Mini Game (小游戏)

// New utility methods
ua.getNetwork() // Network info
ua.getScreen() // Screen info
ua.getTimezone() // Timezone
ua.isDarkMode() // Dark mode check
```

### Type Migration

```ts
// Before (v5.x)
import type { ClientInfo, IClientDetector } from 'js-cool'

// After (v6.x)
import type { UAInfo, IUADetector } from 'js-cool'
```

| Old Type          | New Type      |
| ----------------- | ------------- |
| `ClientInfo`      | `UAInfo`      |
| `IClientDetector` | `IUADetector` |
| `ClientGetType`   | `UAGetType`   |
| `ClientDetector`  | `UADetector`  |
