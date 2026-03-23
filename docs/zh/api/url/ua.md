# ua <Badge type="tip" text="v6.0.0" />

User-Agent 检测工具，用于浏览器、操作系统、设备和环境检测。

## 安装

```bash
pnpm add js-cool
```

## 用法

```js
// 完整导入
import { ua } from 'js-cool'

// 按需导入（推荐，支持 tree-shaking）
import { isMobile, isTablet, isWeChat, isiOS } from 'js-cool/ua'
import { getBrowserInfo, getNetworkInfo, getScreenInfo } from 'js-cool/ua'
import type { UAInfo, DeviceInfo } from 'js-cool/ua'
```

## API 参考

### ua 对象

`ua` 对象提供统一的检测方法 API：

```js
import { ua } from 'js-cool'

// 获取所有信息
const info = ua.info
// { device: {...}, os: {...}, browser: {...}, environment: {...} }

// 快速检查
ua.isMobile() // 是否移动设备
ua.isTablet() // 是否平板设备
ua.isDesktop() // 是否桌面设备
ua.isiOS() // 是否 iOS
ua.isAndroid() // 是否 Android
ua.isHarmonyOS() // 是否鸿蒙系统
ua.isWeChat() // 是否微信
ua.isQQ() // 是否 QQ
ua.isMiniProgram() // 是否小程序

// 获取特定信息
ua.get('browser') // { name: 'Chrome', version: '120.0', engine: 'Blink' }
ua.get('os') // { name: 'Windows', version: '10' }
ua.get('device') // { type: 'desktop', mobile: false, ... }
ua.get('environment') // { wechat: false, qq: false, ... }
ua.get('engine') // { name: 'Blink' }

// 获取多种信息
ua.getMultiple(['device', 'os', 'browser'])
// { device: {...}, os: {...}, browser: {...} }

// 检查 UA 字符串中是否包含指定名称
ua.has('Chrome') // true/false

// 网络信息
ua.getNetwork() // { online: true, type: 'wifi', effectiveType: '4g', ... }

// 屏幕信息
ua.getScreen() // { width: 1920, height: 1080, pixelRatio: 1, ... }

// 工具方法
ua.getLanguage() // 'zh-CN'
ua.getTimezone() // 'Asia/Shanghai'
ua.getOrientationStatus() // 'portrait' | 'landscape'
ua.isDarkMode() // 是否深色模式
```

## 设备检测

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

// 快速检查
isMobile() // 是否移动设备
isTablet() // 是否平板设备
isDesktop() // 是否桌面设备
isTouch() // 是否触摸设备
isIPhone() // 是否 iPhone
isIPad() // 是否 iPad
isAndroidPhone() // 是否 Android 手机
isAndroidTablet() // 是否 Android 平板

// 获取完整设备信息
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

// 仅获取设备类型
getDeviceType() // 'mobile' | 'tablet' | 'desktop'
```

### 使用自定义 UA 字符串

所有设备检测函数都支持传入可选的 UA 字符串：

```js
const customUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'
isMobile(customUA) // true
isIPhone(customUA) // true
```

## 操作系统检测

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

// 快速检查
isiOS() // 是否 iOS（iPhone）
isiPadOS() // 是否 iPadOS（iOS 13+ 的 iPad）
isAndroid() // 是否 Android
isHarmonyOS() // 是否鸿蒙系统
isWindows() // 是否 Windows
isMacOS() // 是否 macOS
isLinux() // 是否 Linux

// 获取完整操作系统信息
const os = getOSInfo()
// { name: 'Windows', version: '10' }
// { name: 'iOS', version: '17.2' }
// { name: 'Android', version: '14' }
// { name: 'HarmonyOS', version: '4.0.0' }

// 仅获取操作系统名称
getOSName() // 'Windows' | 'macOS' | 'iOS' | ...

// 仅获取操作系统版本
getOSVersion() // '10', '17.2', '14' 等
```

### 支持的操作系统

| 操作系统 | 检测方法                |
| -------- | ----------------------- |
| Windows  | `isWindows()`           |
| macOS    | `isMacOS()`             |
| iOS      | `isiOS()`               |
| iPadOS   | `isiPadOS()`            |
| Android  | `isAndroid()`           |
| 鸿蒙系统 | `isHarmonyOS()`         |
| Linux    | `isLinux()`             |
| ChromeOS | 通过 `getOSName()` 获取 |

## 浏览器检测

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

// 快速检查
isChrome() // 是否 Chrome
isFirefox() // 是否 Firefox
isSafari() // 是否 Safari
isEdge() // 是否 Edge
isIE() // 是否 IE
isOpera() // 是否 Opera
isSamsung() // 是否三星浏览器
isUC() // 是否 UC 浏览器

// 内核检查
isBlink() // 是否 Chromium 内核
isWebKit() // 是否 WebKit 内核
isGecko() // 是否 Gecko 内核

// 获取完整浏览器信息
const browser = getBrowserInfo()
// { name: 'Chrome', version: '120.0.0.0', engine: 'Blink' }

// 获取特定信息
getBrowserName() // 'Chrome' | 'Firefox' | 'Safari' | ...
getBrowserVersion() // '120.0.0.0'
getBrowserEngine() // 'Blink' | 'WebKit' | 'Gecko' | 'Trident'
```

### 支持的浏览器

| 浏览器     | 检测方法      |
| ---------- | ------------- |
| Chrome     | `isChrome()`  |
| Firefox    | `isFirefox()` |
| Safari     | `isSafari()`  |
| Edge       | `isEdge()`    |
| IE         | `isIE()`      |
| Opera      | `isOpera()`   |
| 三星浏览器 | `isSamsung()` |
| UC 浏览器  | `isUC()`      |

## 环境检测

检测特殊环境，如国产应用、小程序等。

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

// 社交 & 即时通讯
isWeChat() // 微信
isWxwork() // 企业微信
isQQ() // QQ 内置浏览器
isWeibo() // 微博

// 电商 & 支付
isAlipay() // 支付宝
isDouyin() // 抖音
isKuaishou() // 快手
isBaidu() // 百度 App

// 办公
isDingtalk() // 钉钉

// 浏览器应用
isQQBrowser() // QQ 浏览器
isXiaomi() // 小米浏览器
isHuawei() // 华为浏览器
isVivo() // Vivo 浏览器
isOppo() // Oppo 浏览器

// 小程序 & 小游戏
isMiniProgram() // 小程序
isMiniGame() // 小游戏

// 获取完整环境信息
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

## 网络信息

使用 Navigator Connection API（在支持的浏览器中）。

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

// 快速检查
isOnline() // 是否在线
isOffline() // 是否离线
isSlowConnection() // 是否慢速连接（2g 或 slow-2g）
isFastConnection() // 是否快速连接（4g）

// 获取完整网络信息
const network = getNetworkInfo()
// {
//   online: boolean,
//   type: 'wifi' | 'cellular' | 'ethernet' | 'none' | 'unknown',
//   effectiveType: '4g' | '3g' | '2g' | 'slow-2g' | 'unknown',
//   downlink: number,  // Mbps
//   rtt: number,       // ms
//   saveData: boolean
// }

// 获取特定信息
getConnectionType() // 'wifi' | 'cellular' | ...
getEffectiveType() // '4g' | '3g' | ...
getDownlink() // 下载速度（Mbps）
getRTT() // 往返时间（ms）
isSaveData() // 是否启用省流模式
```

## 屏幕信息

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

// 用户偏好检查
isDarkMode() // 是否深色模式
isLightMode() // 是否浅色模式
isReducedMotion() // 是否偏好减少动画
isHighContrast() // 是否高对比度模式
isHDR() // 是否 HDR 显示

// 方向检查
isLandscape() // 是否横屏
isPortrait() // 是否竖屏
getOrientation() // 'portrait' | 'landscape'

// 获取完整屏幕信息
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

// 获取特定信息
getScreenWidth() // 屏幕宽度（像素）
getScreenHeight() // 屏幕高度（像素）
getPixelRatio() // 设备像素比
getColorDepth() // 色深（通常为 24）
getAvailWidth() // 可用屏幕宽度
getAvailHeight() // 可用屏幕高度
```

## UAParser 类

用于自定义 UA 字符串解析：

```js
import { UAParser } from 'js-cool'

// 使用自定义 UA 创建检测器
const detector = new UAParser('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)')

// 实例属性
detector.info // 完整信息对象
detector.device // 设备信息
detector.os // 操作系统信息
detector.browser // 浏览器信息
detector.environment // 环境信息
detector.userAgent // 原始 UA 字符串

// 快速检查
detector.isMobile() // true
detector.isTablet() // false
detector.isDesktop() // false
detector.isiOS() // true
detector.isAndroid() // false
detector.isHarmonyOS() // false
detector.isWeChat() // false
detector.isQQ() // false
detector.isMiniProgram() // false

// 其他方法
detector.get('browser') // 获取特定信息
detector.getMultiple(['device', 'os'])
detector.has('Safari') // 检查字符串是否在 UA 中

// 工具方法
detector.getNetwork() // 网络信息
detector.getScreen() // 屏幕信息
detector.getLanguage() // 浏览器语言
detector.getTimezone() // 时区
detector.getOrientationStatus() // 方向
detector.isDarkMode() // 深色模式检查
```

## 类型定义

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
  IUAParser,
  OSName,
  BrowserName,
  EngineName,
  DeviceType,
} from 'js-cool/ua'

// 设备类型
type DeviceType = 'mobile' | 'tablet' | 'desktop'

// 操作系统名称
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

// 浏览器名称
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

// 内核名称
type EngineName = 'Blink' | 'Gecko' | 'WebKit' | 'Trident' | 'EdgeHTML' | 'Unknown'

// 获取器类型
type UAGetType = 'device' | 'os' | 'browser' | 'engine' | 'environment'
```

## 示例

### 条件加载

```js
import { isMobile, isWeChat } from 'js-cool/ua'

// 根据设备加载不同资源
if (isMobile()) {
  loadMobileStyles()
} else {
  loadDesktopStyles()
}

// 显示微信专用 UI
if (isWeChat()) {
  showWeChatShareButton()
}
```

### 数据统计

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

### 特性检测

```js
import { isReducedMotion, isSlowConnection } from 'js-cool/ua'

// 尊重用户偏好
if (isReducedMotion()) {
  disableAnimations()
}

// 针对慢速连接优化
if (isSlowConnection()) {
  loadLowQualityImages()
}
```

## 从 `client` 迁移

::: warning
`client` 模块已在 v6.0.0 中**移除**，请迁移到 `ua`。
:::

完整迁移说明请参考 [迁移指南](../../guide/migration.md#client--ua)。
