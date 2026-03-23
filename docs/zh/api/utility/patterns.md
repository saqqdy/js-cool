# patterns <Badge type="info" text="v6.0.0" />

统一的模式模块，整合验证和 UA 检测模式。

## 从 v5.x `pattern` 迁移

::: warning 破坏性变更
v5.x 中的 `pattern` 对象在 v6.0.0 中已被**移除**。你必须迁移到新的 `patterns` 模块。
:::

完整迁移说明请参考 [迁移指南](../../guide/migration.md#pattern--patterns--validation)。

## 用法

```js
import { patterns, validation, DEVICE_PATTERNS, BROWSER_PATTERNS } from 'js-cool'
```

## 概述

`patterns` 模块提供 js-cool 中所有正则模式的统一 API：

- **validation** - 常用格式验证模式（邮箱、手机、URL 等）
- **ua** - User Agent 检测模式和工具函数

## 验证模式

### 基本用法

```js
import { validation } from 'js-cool'

// 或通过 patterns 对象
import { patterns } from 'js-cool'
patterns.validation.email.test('user@example.com')
```

### 可用模式

| 模式          | 描述                                     | 示例                      |
| ------------- | ---------------------------------------- | ------------------------- |
| `any`         | 匹配任意非空字符串                       | `'hello'` ✓               |
| `email`       | 邮箱地址                                 | `'user@example.com'` ✓    |
| `mobile`      | 中国手机号 (1[3-9]xxxxxxxxx)             | `'13800138000'` ✓         |
| `url`         | URL 地址                                 | `'https://example.com'` ✓ |
| `number`      | 数字（整数、浮点、带符号）               | `'-123.45'` ✓             |
| `chinese`     | 单个中文字符                             | `'中'` ✓                  |
| `idCard`      | 中国身份证（15 或 18 位）                | `'11010519491231002X'` ✓  |
| `qq`          | QQ 号（5-14 位）                         | `'12345678'` ✓            |
| `ipv4`        | IPv4 地址                                | `'192.168.1.1'` ✓         |
| `ipv4Private` | 私有 IPv4 (10.x, 172.16-31.x, 192.168.x) | `'192.168.1.1'` ✓         |
| `mac`         | MAC 地址                                 | `'00:1A:2B:3C:4D:5E'` ✓   |
| `hexColor`    | 十六进制颜色                             | `'#ffffff'` ✓             |
| `password`    | 密码（6-16 位，字母+数字）               | `'abc123'` ✓              |
| `postcode`    | 中国邮编（6 位）                         | `'100000'` ✓              |
| `username`    | 用户名（3-15 位，字母数字）              | `'user_name'` ✓           |
| `tel`         | 中国固定电话                             | `'010-12345678'` ✓        |
| `json`        | JSON 对象字符串                          | `'{"key":"value"}'` ✓     |
| `array`       | JSON 数组字符串                          | `'[1, 2, 3]'` ✓           |
| `float`       | 浮点数（最多 2 位小数）                  | `'123.45'` ✓              |

## UA 模式

### 设备检测

```js
import { DEVICE_PATTERNS } from 'js-cool'

const ua = navigator.userAgent

DEVICE_PATTERNS.mobile.test(ua) // 移动设备
DEVICE_PATTERNS.tablet.test(ua) // 平板设备
DEVICE_PATTERNS.phone.test(ua) // 手机（iPhone、Android 手机）
DEVICE_PATTERNS.iphone.test(ua) // iPhone
DEVICE_PATTERNS.ipad.test(ua) // iPad
DEVICE_PATTERNS.androidPhone.test(ua) // Android 手机
DEVICE_PATTERNS.androidTablet.test(ua) // Android 平板
```

### 操作系统检测

```js
import { OS_PATTERNS } from 'js-cool'

OS_PATTERNS.windows.test(ua) // Windows
OS_PATTERNS.macOS.test(ua) // macOS
OS_PATTERNS.iOS.test(ua) // iOS
OS_PATTERNS.iPadOS.test(ua) // iPadOS
OS_PATTERNS.android.test(ua) // Android
OS_PATTERNS.linux.test(ua) // Linux
OS_PATTERNS.chromeOS.test(ua) // Chrome OS
OS_PATTERNS.harmonyOS.test(ua) // 鸿蒙系统
```

### 浏览器检测

```js
import { BROWSER_PATTERNS } from 'js-cool'

BROWSER_PATTERNS.chrome.test(ua) // Chrome
BROWSER_PATTERNS.firefox.test(ua) // Firefox
BROWSER_PATTERNS.safari.test(ua) // Safari
BROWSER_PATTERNS.edge.test(ua) // Edge
BROWSER_PATTERNS.opera.test(ua) // Opera
BROWSER_PATTERNS.ie.test(ua) // IE
BROWSER_PATTERNS.samsung.test(ua) // 三星浏览器
BROWSER_PATTERNS.uc.test(ua) // UC 浏览器
BROWSER_PATTERNS.quark.test(ua) // 夸克浏览器
BROWSER_PATTERNS.vivaldi.test(ua) // Vivaldi
```

### 内核检测

```js
import { ENGINE_PATTERNS } from 'js-cool'

ENGINE_PATTERNS.blink.test(ua) // Blink（Chrome、Edge、Opera）
ENGINE_PATTERNS.gecko.test(ua) // Gecko（Firefox）
ENGINE_PATTERNS.webkit.test(ua) // WebKit（Safari）
ENGINE_PATTERNS.trident.test(ua) // Trident（IE）
ENGINE_PATTERNS.edgeHTML.test(ua) // EdgeHTML（旧版 Edge）
```

### 环境检测

```js
import { ENV_PATTERNS } from 'js-cool'

ENV_PATTERNS.wechat.test(ua) // 微信
ENV_PATTERNS.wxwork.test(ua) // 企业微信
ENV_PATTERNS.dingtalk.test(ua) // 钉钉
ENV_PATTERNS.qq.test(ua) // QQ 应用
ENV_PATTERNS.qqBrowser.test(ua) // QQ 浏览器
ENV_PATTERNS.weibo.test(ua) // 微博
ENV_PATTERNS.alipay.test(ua) // 支付宝
ENV_PATTERNS.douyin.test(ua) // 抖音
ENV_PATTERNS.kuaishou.test(ua) // 快手
ENV_PATTERNS.baidu.test(ua) // 百度 App
ENV_PATTERNS.miniProgram.test(ua) // 小程序
ENV_PATTERNS.miniGame.test(ua) // 小游戏
```

## 工具函数

### getUserAgent

安全获取 User Agent 字符串。

```js
import { getUA } from 'js-cool'

const ua = getUA() // 返回 UA 字符串或空字符串
```

### matchPattern

检查模式是否存在于 User Agent 中。

```js
import { matchPattern } from 'js-cool'

matchPattern(navigator.userAgent, /Chrome/i) // true/false
```

### extractVersion

从 User Agent 中提取版本号。

```js
import { extractVersion } from 'js-cool'

extractVersion(navigator.userAgent, /Chrome\/(\d+\.?\d*)/i) // '91.0'
extractVersion('iPhone OS 14_0', /iPhone OS (\d+[._]\d+)/i) // '14.0'
```

## 类型导出

```typescript
import type {
  ValidationPatternName,
  DevicePatternName,
  OSPatternName,
  BrowserPatternName,
  EnginePatternName,
  EnvPatternName,
} from 'js-cool'
```
