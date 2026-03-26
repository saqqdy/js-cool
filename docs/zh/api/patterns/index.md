# patterns <Badge type="tip" text="since v6.0.0" />

统一的正则模式模块，提供验证和 User Agent 检测功能。

## 安装

```bash
pnpm add js-cool
```

## 使用方式

```js
import { patterns, validation, DEVICE_PATTERNS } from 'js-cool'

// 使用统一 patterns 对象
patterns.validation.email.test('user@example.com') // true
patterns.ua.device.mobile.test(navigator.userAgent) // true/false

// 使用独立导出
validation.email.test('user@example.com') // true
DEVICE_PATTERNS.mobile.test(navigator.userAgent) // true/false
```

## 结构

`patterns` 模块包含两个主要部分：

### 1. 验证模式

用于验证常见字符串格式的正则模式。

```js
import { validation } from 'js-cool'

validation.email.test('user@example.com') // true
validation.mobile.test('13800138000') // true
validation.url.test('https://example.com') // true
```

### 2. UA（User Agent）模式

用于 User Agent 检测的模式和工具函数。

```js
import { patterns } from 'js-cool'

// 设备检测
patterns.ua.device.mobile.test(ua) // true/false
patterns.ua.device.tablet.test(ua) // true/false

// 浏览器检测
patterns.ua.browser.chrome.test(ua) // true/false

// 操作系统检测
patterns.ua.os.windows.test(ua) // true/false

// 工具函数
patterns.ua.getUserAgent() // 获取 UA 字符串
patterns.ua.extractVersion(ua, /Chrome\/(\d+)/i) // '120'
```

## 可用模式

### 验证模式

| 模式          | 描述                  | 示例                  |
| ------------- | --------------------- | --------------------- |
| `email`       | 电子邮箱              | `user@example.com`    |
| `mobile`      | 中国大陆手机号        | `13800138000`         |
| `url`         | URL（可带或不带协议） | `https://example.com` |
| `ipv4`        | IPv4 地址             | `192.168.1.1`         |
| `ipv6`        | IPv6 地址             | `2001:db8::1`         |
| `ipv4Private` | 私有 IPv4 地址        | `192.168.1.1`         |
| `mac`         | MAC 地址              | `00:1A:2B:3C:4D:5E`   |
| `uuid`        | UUID v1-v5            | `550e8400-e29b-...`   |
| `semver`      | 语义化版本号          | `1.2.3-beta.1`        |
| `base64`      | Base64 编码           | `SGVsbG8=`            |
| `hexColor`    | 十六进制颜色          | `#fff` 或 `#ffffff`   |
| `date`        | 日期 YYYY-MM-DD       | `2024-01-15`          |
| `time`        | 时间 HH:mm:ss         | `23:59:59`            |
| `datetime`    | 日期时间              | `2024-01-15 12:30:00` |
| `idCard`      | 中国身份证号          | `11010519491231002X`  |
| `bankCard`    | 银行卡号              | `6222021234567890123` |
| `creditCard`  | 信用卡号              | `4111111111111111`    |
| `username`    | 用户名（3-15字符）    | `user_name`           |
| `password`    | 密码（6-16字符）      | `abc123`              |
| `qq`          | QQ号                  | `12345678`            |
| `postcode`    | 中国邮政编码          | `100000`              |
| `tel`         | 中国电话号码          | `010-12345678`        |
| `slug`        | URL别名               | `hello-world-123`     |
| `json`        | JSON对象字符串        | `{"key":"value"}`     |
| `array`       | JSON数组字符串        | `[1, 2, 3]`           |

### 设备模式

| 模式            | 描述     |
| --------------- | -------- |
| `mobile`        | 移动设备 |
| `tablet`        | 平板设备 |
| `phone`         | 智能手机 |
| `touch`         | 触摸设备 |
| `iphone`        | iPhone   |
| `ipad`          | iPad     |
| `androidPhone`  | 安卓手机 |
| `androidTablet` | 安卓平板 |

### 操作系统模式

| 模式        | 描述         |
| ----------- | ------------ |
| `harmonyOS` | 华为鸿蒙系统 |
| `windows`   | Windows      |
| `macOS`     | macOS        |
| `iOS`       | iOS          |
| `iPadOS`    | iPadOS       |
| `android`   | Android      |
| `linux`     | Linux        |
| `chromeOS`  | Chrome OS    |

### 浏览器模式

| 模式      | 描述              |
| --------- | ----------------- |
| `chrome`  | Google Chrome     |
| `safari`  | Apple Safari      |
| `firefox` | Mozilla Firefox   |
| `edge`    | Microsoft Edge    |
| `opera`   | Opera             |
| `ie`      | Internet Explorer |
| `samsung` | 三星浏览器        |
| `uc`      | UC浏览器          |
| `quark`   | 夸克浏览器        |
| `arc`     | Arc浏览器         |
| `brave`   | Brave浏览器       |
| `yandex`  | Yandex浏览器      |
| `vivaldi` | Vivaldi浏览器     |

### 环境模式

| 模式          | 描述        |
| ------------- | ----------- |
| `wechat`      | 微信        |
| `wxwork`      | 企业微信    |
| `dingtalk`    | 钉钉        |
| `qq`          | QQ App      |
| `qqBrowser`   | QQ浏览器    |
| `weibo`       | 微博        |
| `alipay`      | 支付宝      |
| `douyin`      | 抖音/TikTok |
| `kuaishou`    | 快手        |
| `baidu`       | 百度App     |
| `xiaomi`      | 小米浏览器  |
| `huawei`      | 华为浏览器  |
| `vivo`        | vivo浏览器  |
| `oppo`        | OPPO浏览器  |
| `xiaohongshu` | 小红书      |
| `meituan`     | 美团        |
| `dianping`    | 大众点评    |
| `taobao`      | 淘宝App     |
| `tmall`       | 天猫App     |
| `jd`          | 京东App     |
| `pinduoduo`   | 拼多多      |
| `miniProgram` | 小程序      |
| `miniGame`    | 小游戏      |

## 工具函数

### getUserAgent

安全获取 User Agent 字符串。

```js
import { getUserAgent } from 'js-cool'

const ua = getUserAgent() // 浏览器返回 UA，SSR 返回空字符串
```

### matchPattern

检查 User Agent 中是否存在指定模式。

```js
import { matchPattern } from 'js-cool'

const isMobile = matchPattern(navigator.userAgent, /Mobi/i)
```

### extractVersion

从 User Agent 中提取版本号。

```js
import { extractVersion } from 'js-cool'

const chromeVersion = extractVersion(navigator.userAgent, /Chrome\/(\d+)/i)
// '120'
```

## 类型定义

```ts
import type {
  ValidationPatternName,
  DevicePatternName,
  OSPatternName,
  BrowserPatternName,
  EnginePatternName,
  EnvPatternName,
} from 'js-cool'

// 验证模式名称
type ValidationPatternName =
  | 'email' | 'mobile' | 'url' | 'ipv4' | 'ipv6' | ...

// 设备模式名称
type DevicePatternName =
  | 'mobile' | 'tablet' | 'phone' | 'touch' | 'iphone' | 'ipad' | ...

// 操作系统模式名称
type OSPatternName =
  | 'harmonyOS' | 'windows' | 'macOS' | 'iOS' | 'android' | ...

// 浏览器模式名称
type BrowserPatternName =
  | 'chrome' | 'safari' | 'firefox' | 'edge' | 'opera' | ...

// 环境模式名称
type EnvPatternName =
  | 'wechat' | 'dingtalk' | 'qq' | 'weibo' | 'alipay' | ...
```

## 示例

### 表单验证

```js
import { validation } from 'js-cool'

function validateForm(data) {
  const errors = []

  if (!validation.email.test(data.email)) {
    errors.push('邮箱格式不正确')
  }

  if (!validation.mobile.test(data.phone)) {
    errors.push('手机号格式不正确')
  }

  if (!validation.url.test(data.website)) {
    errors.push('网址格式不正确')
  }

  return errors
}
```

### 浏览器检测

```js
import { BROWSER_PATTERNS, OS_PATTERNS, getUserAgent } from 'js-cool'

const ua = getUserAgent()

function getBrowserInfo() {
  const browsers = [
    { name: 'Edge', pattern: BROWSER_PATTERNS.edge },
    { name: 'Chrome', pattern: BROWSER_PATTERNS.chrome },
    { name: 'Safari', pattern: BROWSER_PATTERNS.safari },
    { name: 'Firefox', pattern: BROWSER_PATTERNS.firefox },
  ]

  for (const { name, pattern } of browsers) {
    if (pattern.test(ua)) {
      return name
    }
  }

  return 'Unknown'
}
```

### 环境检测

```js
import { ENV_PATTERNS, getUserAgent } from 'js-cool'

const ua = getUserAgent()

function getAppEnvironment() {
  if (ENV_PATTERNS.wechat.test(ua)) return 'wechat'
  if (ENV_PATTERNS.dingtalk.test(ua)) return 'dingtalk'
  if (ENV_PATTERNS.alipay.test(ua)) return 'alipay'
  if (ENV_PATTERNS.miniProgram.test(ua)) return 'miniprogram'
  return 'browser'
}
```

## 相关

- [validation](./validation.md) - 验证模式详情
- [ua](./ua.md) - User Agent 模式详情
